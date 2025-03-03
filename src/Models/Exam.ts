import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import TeachingAssignment from "./TeachingAssignment";
import Teacher from "./Teacher";

interface ExamAttributes {
  id: number;
  title: string;
  description?: string;
  teaching_assignment_id: number;
  exam_type: "daily" | "midterm" | "final" | "practice";
  start_datetime: Date;
  end_datetime: Date;
  duration: number;
  max_score: number;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}

interface ExamCreationAttributes extends Optional<ExamAttributes, "id"> {}

class Exam extends Model<ExamAttributes, ExamCreationAttributes> implements ExamAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public teaching_assignment_id!: number;
  public exam_type!: "daily" | "midterm" | "final" | "practice";
  public start_datetime!: Date;
  public end_datetime!: Date;
  public duration!: number;
  public max_score!: number;
  public created_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Exam.init(
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
    teaching_assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TeachingAssignment,
        key: "id",
      },
    },
    exam_type: {
      type: DataTypes.ENUM("daily", "midterm", "final", "practice"),
      allowNull: false,
    },
    start_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
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
    sequelize,
    modelName: "Exam",
    tableName: "exams",
    timestamps: false,
  }
);

export default Exam;
