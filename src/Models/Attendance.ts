import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import Student from "./Student";
import TeachingAssignment from "./TeachingAssignment";

interface AttendanceAttributes {
  id: number;
  teaching_assignment_id: number;
  student_id: number;
  date: Date;
  status: "present" | "absent" | "sick" | "permission" | "late";
  notes?: string;
}

interface AttendanceCreationAttributes extends Optional<AttendanceAttributes, "id"> {}

class Attendance
  extends Model<AttendanceAttributes, AttendanceCreationAttributes>
  implements AttendanceAttributes {
  public id!: number;
  public teaching_assignment_id!: number;
  public student_id!: number;
  public date!: Date;
  public status!: "present" | "absent" | "sick" | "permission" | "late";
  public notes?: string;
}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teaching_assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TeachingAssignment,
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("present", "absent", "sick", "permission", "late"),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Attendance",
    tableName: "attendance",
    timestamps: false,
  }
);

export default Attendance;
