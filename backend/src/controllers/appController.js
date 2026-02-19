const Orders = require('../models/order')

exports.userDetails = async (req, res) => {
  try {
    res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const totalOrders = await Orders.countDocuments();

    const pendingApprovals = (await Orders.find({status: "pending_approval"}).populate("user", "name").limit(4).lean()).map(order => ({
      ...order,
      priority:
        order.price > 100000
          ? "high"
          : order.price > 50000
          ? "medium"
          : "low",
    }));


    const rejectedOrders = await Orders.countDocuments({
      status: "rejected",
    });

    const topProducts = await Orders.aggregate([
      { $match: { status: "approved" } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.sku",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "sku",
          as: "product",
        },
      },
      { $unwind: "$product" },

      {
        $project: {
          _id: 0,
          sku: "$_id",
          name: "$product.name",
          price: "$product.price",
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      dashboard: {
        totalOrders,
        pendingApprovals,
        rejectedOrders,
        topProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard",
      error: error.message,
    });
  }
};


