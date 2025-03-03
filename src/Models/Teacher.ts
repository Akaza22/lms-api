import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import User from "./User";

interface TeacherAttributes {
  id: number;
  user_id: number;
  nip?: string;
  specialization?: string;
}

interface TeacherCreationAttributes extends Optional<TeacherAttributes, "id"> {}

class Teacher extends Model<TeacherAttributes, TeacherCreationAttributes> implements TeacherAttributes {
  public id!: number;
  public user_id!: number;
  public nip?: string;
  public specialization?: string;
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
    nip: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    specialization: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Teacher",
    tableName: "teachers",
    timestamps: false,
  }
);

export default Teacher;
