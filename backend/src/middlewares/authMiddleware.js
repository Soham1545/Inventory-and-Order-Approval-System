const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized, token missing'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, token invalid'
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Admin access required'
    });
  }
  next();
};

exports.isSalesExecutive = (req, res, next) => {
  if (req.user.role !== 'sales_executive') {
    return res.status(403).json({
      message: 'Access required'
    });
  }
  next();
};

exports.isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({
      message: 'Access required'
    });
  }
  next();
};
