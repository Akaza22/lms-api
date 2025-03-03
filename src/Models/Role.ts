import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";

interface RoleAttributes {
  id: number;
  name: string;
  description?: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  }
);

export default Role;
