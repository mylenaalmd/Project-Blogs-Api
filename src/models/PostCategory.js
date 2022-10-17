module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true //snake_case
  });

  PostCategory.associate = (models) =>{
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories', 
      foreignKey: 'postId',
      through: PostCategory, 
      otherKey: 'categoryId'
    });
      
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts', 
      foreignKey: 'categoryId', 
      through: PostCategory, 
      otherKey: 'postId'
    });
  };

  return PostCategory;
};
