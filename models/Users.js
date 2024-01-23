import { DataTypes, Model } from 'sequelize';
import md5 from 'md5';
import sequelize from '../services/sequelize.js';

const { PASSWORD_SECRET } = process.env;

class Users extends Model {
  static passwordHash(string) {
    return md5(md5(string) + PASSWORD_SECRET);
  }
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'email',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      if (val) {
        this.setDataValue('password', this.passwordHash(val));
      }
    },

    get() {
      return undefined;
    },
  },
}, {
  modelName: 'users',
  tableName: 'users',
  sequelize,
});

export default Users;
