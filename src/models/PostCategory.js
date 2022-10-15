module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "post_id",
      references: {
        model: "blog_posts",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: true
    },categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id",
      references: {
        model: "categories",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: true
    }
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true //snake_case
  });

  postCategory.associate = (models) =>{
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories', 
      foreingKey: 'postId',
       through: postCategory, 
       otherKey: 'categoryId'
      });
      
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts', 
      foreingKey: 'categoryId', 
      through: postCategory, 
      otherKey: 'postId'
    });
  };

  return postCategory;
};
