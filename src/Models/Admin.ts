import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import User from "./User";

interface AdminAttributes {
  id: number;
  user_id: number;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, "id"> {}

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  public id!: number;
  public user_id!: number;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: false,
  }
);

export default Admin;
