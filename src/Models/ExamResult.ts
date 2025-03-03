import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import Exam from "./Exam";
import Student from "./Student";

interface ExamResultAttributes {
  id: number;
  exam_id: number;
  student_id: number;
  score?: number;
  status: "not_started" | "in_progress" | "completed" | "graded";
}

interface ExamResultCreationAttributes extends Optional<ExamResultAttributes, "id"> {}

class ExamResult
  extends Model<ExamResultAttributes, ExamResultCreationAttributes>
  implements ExamResultAttributes {
  public id!: number;
  public exam_id!: number;
  public student_id!: number;
  public score?: number;
  public status!: "not_started" | "in_progress" | "completed" | "graded";
}

ExamResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exam,
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("not_started", "in_progress", "completed", "graded"),
      allowNull: false,
      defaultValue: "not_started",
    },
  },
  {
    sequelize,
    modelName: "ExamResult",
    tableName: "exam_results",
    timestamps: false,
  }
);

export default ExamResult;
