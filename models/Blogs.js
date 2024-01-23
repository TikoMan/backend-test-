import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize.js';
import Users from './Users.js';

class Blogs extends Model {

}

Blogs.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
}, {
  modelName: 'blogs',
  tableName: 'blogs',
  sequelize,
});

Blogs.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
});

Users.hasMany(Blogs, {
  foreignKey: 'userId',
  as: 'blogs',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
export default Blogs;
