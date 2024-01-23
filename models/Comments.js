import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize.js';
import Blogs from './Blogs.js';
import Users from './Users.js';

class Comments extends Model {

}

Comments.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
}, {
  modelName: 'comments',
  tableName: 'comments',
  sequelize,
});

Comments.belongsTo(Users, {
  foreignKey: 'authorId',
  as: 'author',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Users.hasMany(Comments, {
  foreignKey: 'authorId',
  as: 'comments',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Comments.belongsTo(Blogs, {
  foreignKey: 'commentId',
  as: 'blog',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Blogs.hasMany(Comments, {
  foreignKey: 'commentId',
  as: 'comments',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default Comments;
