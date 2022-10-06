const userSchema = (sequelize, DataTypes) => {
  const userTable = sequelize.define('User', {
    id: DataTypes.STRING,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    tableName: 'users',
    underscored: true //snake_case
  });

  // CourseTable.associate = (models) => {
  //   CourseTable.hasMany(models.B, {
  //     as: "users",
  //     foreignKey: "userId"
  //   })
  // }

  return userTable;
}

module.exports = userSchema;