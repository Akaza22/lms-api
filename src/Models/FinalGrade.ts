import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import Student from "./Student";
import TeachingAssignment from "./TeachingAssignment";

interface FinalGradeAttributes {
  id: number;
  student_id: number;
  teaching_assignment_id: number;
  final_score: number;
  grade?: string;
}

interface FinalGradeCreationAttributes extends Optional<FinalGradeAttributes, "id"> {}

class FinalGrade
  extends Model<FinalGradeAttributes, FinalGradeCreationAttributes>
  implements FinalGradeAttributes {
  public id!: number;
  public student_id!: number;
  public teaching_assignment_id!: number;
  public final_score!: number;
  public grade?: string;
}

FinalGrade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    teaching_assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TeachingAssignment,
        key: "id",
      },
    },
    final_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "FinalGrade",
    tableName: "final_grades",
    timestamps: false,
  }
);

export default FinalGrade;
