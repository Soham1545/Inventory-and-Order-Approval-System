const Products = require('../models/product');
const Users = require('../models/user');
const Orders = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const {products, status} = req.body;
    const id = req.user._id;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Products array is required",
      });
    }

    let totalPrice = 0;
    for (const item of products) {
      const { sku, quantity } = item;

      if (!sku || !quantity) {
        return res.status(400).json({
          message: "Each product must have sku and quantity",
        });
      }

      const product = await Products.findOne({
        sku,
        isActive: true,
      });

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${sku}`,
        });
      }
      totalPrice += product.price * quantity;
    }
    const order = await Orders.create({
      products,
      price: totalPrice,
      status: status || "pending_approval",
      user: id
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Operation failed",
      error: error.message,
    });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const id = req.user._id;
    const orders = await Orders.find({user: id}).sort({ createdAt: -1 }).lean();
    const allSkus = orders.flatMap((order) =>
      order.products.map((p) => p.sku)
    );
    const products = await Products.find({
      sku: { $in: allSkus },
    }).select("sku name price category");
    const productMap = {};
    products.forEach((product) => {
      productMap[product.sku] = product;
    });
    const updatedOrders = orders.map((order) => ({
      ...order,
      products: order.products.map((product) => ({
        ...product,
        name: productMap[product.sku]?.name,
        price: productMap[product.sku]?.price,
        category: productMap[product.sku]?.category,
      })),
    }));
    res.status(201).json({
      message: "Orders fetched successfully",
      count: orders.length,
      orders: updatedOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Operation failed",
      error: error.message,
    });
  }   
}
