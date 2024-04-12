const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Configure sequilize using environment variables
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
// Get all the models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
/// Create relations with models
db.cart.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.cart, {
  allowNull: false,
  onDelete: 'CASCADE',
});

db.rating.belongsTo(db.product);
db.product.hasMany(db.rating, {
  allowNull: false,
  onDelete: 'CASCADE',
});

db.cart.belongsToMany(db.product, { through: db.cartRow });
db.product.belongsToMany(db.cart, { through: db.cartRow });
db.product.hasMany(db.cartRow, {
  allowNull: false,
  onDelete: 'CASCADE',
});
db.cart.hasMany(db.cartRow, {
  allowNull: false,
  onDelete: 'CASCADE',
});
db.cartRow.belongsTo(db.product);
db.cartRow.belongsTo(db.cart);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
