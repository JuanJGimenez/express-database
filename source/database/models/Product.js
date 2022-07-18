module.exports = (sequelize, DataTypes) => {
  let cols = {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT
  }
  let config = {
    timestamps: false,
    deletedAt: false
  }
  const Product = sequelize.define('Product', cols, config);
  return Product;
};