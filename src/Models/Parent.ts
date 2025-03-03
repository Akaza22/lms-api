import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import User from "./User";

interface ParentAttributes {
  id: number;
  user_id: number;
  profession?: string;
  address?: string;
}

interface ParentCreationAttributes extends Optional<ParentAttributes, "id"> {}

class Parent extends Model<ParentAttributes, ParentCreationAttributes> implements ParentAttributes {
  public id!: number;
  public user_id!: number;
  public profession?: string;
  public address?: string;
}

Parent.init(
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
    profession: {
      type: DataTypes.STRING(100),
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Parent",
    tableName: "parents",
    timestamps: false,
  }
);

export default Parent;
