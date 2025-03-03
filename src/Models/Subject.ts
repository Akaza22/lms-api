import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";

interface SubjectAttributes {
  id: number;
  code: string;
  name: string;
  description?: string;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, "id"> {}

class Subject extends Model<SubjectAttributes, SubjectCreationAttributes> implements SubjectAttributes {
  public id!: number;
  public code!: string;
  public name!: string;
  public description?: string;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Subject",
    tableName: "subjects",
    timestamps: false,
  }
);

export default Subject;
