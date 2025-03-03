import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import Teacher from "./Teacher";
import Subject from "./Subject";
import Class from "./Class";

interface TeachingAssignmentAttributes {
  id: number;
  teacher_id: number;
  subject_id: number;
  class_id: number;
  academic_year: string;
  semester: string;
}

interface TeachingAssignmentCreationAttributes extends Optional<TeachingAssignmentAttributes, "id"> {}

class TeachingAssignment extends Model<TeachingAssignmentAttributes, TeachingAssignmentCreationAttributes>
  implements TeachingAssignmentAttributes {
  public id!: number;
  public teacher_id!: number;
  public subject_id!: number;
  public class_id!: number;
  public academic_year!: string;
  public semester!: string;
}

TeachingAssignment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "id",
      },
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
        key: "id",
      },
    },
    academic_year: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING(1),
      allowNull: false,
      validate: {
        isIn: [["1", "2"]],
      },
    },
  },
  {
    sequelize,
    modelName: "TeachingAssignment",
    tableName: "teaching_assignments",
    timestamps: false,
  }
);

export default TeachingAssignment;
