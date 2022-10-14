module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    displayName: { type: 
      DataTypes.STRING,
      allowNull: false,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true //snake_case
  });

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPost, {
  //     as: "postId",
  //     foreignKey: "userId"
  //   })
  // }

  return User;
}

// module.exports = userSchema;