const Products = require('../models/product');
const Users = require('../models/user');
const Orders = require('../models/order');

exports.approveOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status !== "pending_approval") {
      return res.status(400).json({
        message: "Order is not pending approval",
      });
    }

    for (const item of order.products) {
      const product = await Products.findOne({
        sku: item.sku,
        isActive: true,
      });

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.sku}`,
        });
      }

      if (product.availableQuantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.sku}`,
        });
      }
    }

    for (const item of order.products) {
      await Products.updateOne(
        { sku: item.sku },
        { $inc: { availableQuantity: -item.quantity } }
      );
    }

    order.status = "approved";
    await order.save();

    res.status(200).json({
      message: "Order approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Operation failed",
      error: error.message,
    });
  }
};

exports.rejectOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {comment} = req.body;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status !== "pending_approval") {
      return res.status(400).json({
        message: "Order is not pending approval",
      });
    }

    order.status = "rejected";
    order.comment = comment;
    await order.save();

    res.status(200).json({
      message: "Order rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Operation failed",
      error: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const id = req.user._id;
    const orders = await Orders.find().sort({ createdAt: -1 }).lean();
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
    res.status(200).json({
      message: "Orders fetched successfully",
      orders: updatedOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Operation failed",
      error: error.message,
    });
  }   
}
