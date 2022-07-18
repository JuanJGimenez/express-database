module.exports = (sequelize, DataTypes) => {
  let cols = {
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }
  let config = {
    timestamps: false,
    deletedAt: false
  }
  const User = sequelize.define('User', cols, config);
  return User;
};