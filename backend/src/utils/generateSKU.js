const Product = require("../models/product");

const categoryPrefix = {
  electronics: "EL",
  fashion: "FS",
  household: "HS",
};

const generateSKU = async (category) => {
  const prefix = categoryPrefix[category];
  if (!prefix) {
    throw new Error("Invalid category");
  }
  const lastProduct = await Product.findOne({
    sku: new RegExp(`^SKU_${prefix}_`)
  }).sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastProduct) {
    const lastNumber = parseInt(lastProduct.sku.split("_")[2]);
    nextNumber = lastNumber + 1;
  }

  const paddedNumber = String(nextNumber).padStart(3, "0");

  return `SKU_${prefix}_${paddedNumber}`;
};

module.exports = generateSKU;
