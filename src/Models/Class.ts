import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";

interface ClassAttributes {
  id: number;
  name: string;
  level: number;
  description?: string;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, "id"> {}

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: number;
  public name!: string;
  public level!: number;
  public description?: string;
}

Class.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Class",
    tableName: "classes",
    timestamps: false,
  }
);

export default Class;
