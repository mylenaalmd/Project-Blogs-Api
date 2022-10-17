module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    published: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: false,
    tableName: 'blog_posts',
    underscored: true //snake_case
  });

  BlogPost.associate = (models) =>{
    BlogPost.belongsTo(models.User, {foreingKey: 'userId', as: 'user'});
  }


  return BlogPost;
}

// module.exports = userSchema;