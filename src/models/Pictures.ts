import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { env } from '../lib/env';

class Pictures extends Model {
  declare id: number;
  declare originalname: string;
  declare filename: string;
  declare product_id: number;
}

Pictures.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${env.APP_URL}/images/${this.getDataValue('filename')}`;
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'pictures',
    timestamps: false,
    sequelize,
  },
);

export default Pictures;
