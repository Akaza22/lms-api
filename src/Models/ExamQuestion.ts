import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import Exam from "./Exam";

interface ExamQuestionAttributes {
  id: number;
  exam_id: number;
  question_text: string;
  question_type: "multiple_choice" | "essay" | "true_false";
  options?: object;
  correct_answer: string;
  score: number;
}

interface ExamQuestionCreationAttributes extends Optional<ExamQuestionAttributes, "id"> {}

class ExamQuestion
  extends Model<ExamQuestionAttributes, ExamQuestionCreationAttributes>
  implements ExamQuestionAttributes {
  public id!: number;
  public exam_id!: number;
  public question_text!: string;
  public question_type!: "multiple_choice" | "essay" | "true_false";
  public options?: object;
  public correct_answer!: string;
  public score!: number;
}

ExamQuestion.init(
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
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.ENUM("multiple_choice", "essay", "true_false"),
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
    },
    correct_answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "ExamQuestion",
    tableName: "exam_questions",
    timestamps: false,
  }
);

export default ExamQuestion;
