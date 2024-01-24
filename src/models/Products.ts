import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Pictures from './Pictures';

class Products extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
  declare user_id: number;
  declare category_id: number;
}

Products.init(
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'products',
    timestamps: false,
    sequelize,
  },
);

Products.hasMany(Pictures, { foreignKey: 'product_id' });

export default Products;
