module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('blog_posts', {
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
      field: "user_id",
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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


  return BlogPost;
}

// module.exports = userSchema;