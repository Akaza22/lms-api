import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import Assignment from "./Assignment";
import Student from "./Student";

interface AssignmentSubmissionAttributes {
  id: number;
  assignment_id: number;
  student_id: number;
  submission_text?: string;
  file_path?: string;
  submission_date: Date;
  status: "submitted" | "late" | "graded" | "unsubmitted";
  score?: number;
  feedback?: string;
  created_at: Date;
  updated_at: Date;
}

interface AssignmentSubmissionCreationAttributes extends Optional<AssignmentSubmissionAttributes, "id"> {}

class AssignmentSubmission
  extends Model<AssignmentSubmissionAttributes, AssignmentSubmissionCreationAttributes>
  implements AssignmentSubmissionAttributes
{
  public id!: number;
  public assignment_id!: number;
  public student_id!: number;
  public submission_text?: string;
  public file_path?: string;
  public submission_date!: Date;
  public status!: "submitted" | "late" | "graded" | "unsubmitted";
  public score?: number;
  public feedback?: string;
  public created_at!: Date;
  public updated_at!: Date;
}

AssignmentSubmission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Assignment,
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
    submission_text: {
      type: DataTypes.TEXT,
    },
    file_path: {
      type: DataTypes.TEXT,
    },
    submission_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("submitted", "late", "graded", "unsubmitted"),
      allowNull: false,
      defaultValue: "unsubmitted",
    },
    score: {
      type: DataTypes.DECIMAL(5, 2),
    },
    feedback: {
      type: DataTypes.TEXT,
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
    modelName: "AssignmentSubmission",
    tableName: "assignment_submissions",
    timestamps: false,
  }
);

export default AssignmentSubmission;
