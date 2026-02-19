const Products = require('../models/product');
const Users = require('../models/user');

const generateSKU = require('../utils/generateSKU');
const sendEmail = require('../utils/sendEmail');

exports.invite = async(req, res) => {
    try{
        const {email, role} = req.body;
        if(!email || !role){
            return res.status(400).json({
                message: "Email and role are required"
            });
        };
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message: 'User already exists'
            });
        }
        const user = await Users.create({
            email: email,
            role: role
        });
        const inviteLink = `${process.env.CLIENT_URL}/auth/signup?email=${email}`;
        await sendEmail(
            email,
            "You're Invited",
            `
                <h2>You are invited to Inventory System</h2>
                <p>Click below to complete signup:</p>
                <a href="${inviteLink}">${inviteLink}</a>
            `
        );
        res.status(201).json({
            message: 'User invited successfully',
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch(error){
        res.status(500).json({
            message: 'Invite failed',
            error: error.message
        });
    };
}

exports.getUsers = async(req, res) => {
    try{
        const users = await Users.find();
        res.status(200).json({
            users
        });
    } catch(error){
        res.status(500).json({
            message: 'Users not found',
            error: error.message
        });
    };
}

exports.createProduct = async(req, res) => {
    try{
        const {name, category, price, availableQuantity} = req.body;
        if(!name || !category || !price || !availableQuantity){
            return res.status(400).json({
                message: "Name, category, price and available quantity are required"
            });   
        };
        const sku = await generateSKU(category);
        await Products.create({
            name: name,
            category: category,
            sku: sku,
            price: price,
            availableQuantity: availableQuantity
        });
        res.status(201).json({
            message: 'Product added successfully',
        });
    } catch(error){
        res.status(500).json({
            message: 'Operation failed',
            error: error.message
        });
    }
};

exports.editProduct = async (req, res) => {
  try {
    const { name, category, price, availableQuantity } = req.body;
    const { sku } = req.params;
     if (req.body.sku) {
      delete req.body.sku;
    }
    const product = await Products.findOne({ sku });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = price;
    if (availableQuantity) product.availableQuantity = availableQuantity;
    await product.save();
    res.status(200).json({
      message: "Product edited successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Operation failed",
      error: error.message,
    });
  }
};


exports.deleteProduct = async(req, res) => {
    try{
        const { sku } = req.params;
        const product = await Products.findOne({sku});
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        product.isActive = false;
        await product.save();
        res.status(201).json({
            message: 'Product soft deleted successfully',
        });
    } catch(error){
        res.status(500).json({
            message: 'Operation failed',
            error: error.message
        });
    }
};

exports.getProduct = async(req, res) => {
    try{
        const { sku } = req.params;
        const product = await Products.findOne({sku});
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        res.status(201).json({
            message: 'Product found',
            product
        });
    } catch(error){
        res.status(500).json({
            message: 'Operation failed',
            error: error.message
        });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Products.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Products fetched successfully",
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Operation failed",
            error: error.message,
        });
    }
};
