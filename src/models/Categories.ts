import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Products from './Products';

class Categories extends Model {
  declare id: number;
  declare name: string;
}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'categories',
    timestamps: false,
    sequelize,
  },
);

Categories.hasMany(Products, { foreignKey: 'category_id' });

export default Categories;
