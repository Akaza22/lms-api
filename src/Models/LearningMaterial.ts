import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import TeachingAssignment from "./TeachingAssignment";
import Teacher from "./Teacher";

interface LearningMaterialAttributes {
  id: number;
  title: string;
  description?: string;
  file_path?: string;
  teaching_assignment_id: number;
  created_by: number;
}

interface LearningMaterialCreationAttributes extends Optional<LearningMaterialAttributes, "id"> {}

class LearningMaterial
  extends Model<LearningMaterialAttributes, LearningMaterialCreationAttributes>
  implements LearningMaterialAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public file_path?: string;
  public teaching_assignment_id!: number;
  public created_by!: number;
}

LearningMaterial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    file_path: {
      type: DataTypes.TEXT,
    },
    teaching_assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TeachingAssignment,
        key: "id",
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "LearningMaterial",
    tableName: "learning_materials",
    timestamps: false,
  }
);

export default LearningMaterial;
