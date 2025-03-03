import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import TeachingAssignment from "./TeachingAssignment";
import Teacher from "./Teacher";

interface AssignmentAttributes {
  id: number;
  title: string;
  description?: string;
  file_path?: string;
  teaching_assignment_id: number;
  publish_date: Date;
  due_date: Date;
  max_score: number;
  created_by: number;
}

interface AssignmentCreationAttributes extends Optional<AssignmentAttributes, "id"> {}

class Assignment
  extends Model<AssignmentAttributes, AssignmentCreationAttributes>
  implements AssignmentAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public file_path?: string;
  public teaching_assignment_id!: number;
  public publish_date!: Date;
  public due_date!: Date;
  public max_score!: number;
  public created_by!: number;
}

Assignment.init(
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
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    max_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
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
    modelName: "Assignment",
    tableName: "assignments",
    timestamps: false,
  }
);

export default Assignment;
