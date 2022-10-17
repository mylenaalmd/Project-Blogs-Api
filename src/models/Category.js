module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  },
  {
    timestamps: false,
    tableName: 'categories',
    underscored: true //snake_case
  });

  return Category;
}

// module.exports = userSchema;