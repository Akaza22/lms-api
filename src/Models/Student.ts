import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import User from "./User";
import Class from "./Class";
import Parent from "./Parent";

interface StudentAttributes {
  id: number;
  user_id: number;
  nis?: string;
  nisn?: string;
  class_id?: number;
  parent_id?: number;
  birth_date?: Date;
  address?: string;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: number;
  public user_id!: number;
  public nis?: string;
  public nisn?: string;
  public class_id?: number;
  public parent_id?: number;
  public birth_date?: Date;
  public address?: string;
}

Student.init(
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
    nis: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    nisn: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: "id",
      },
    },
    parent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Parent,
        key: "id",
      },
    },
    birth_date: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
    timestamps: false,
  }
);

// Tambahkan relasi ke User untuk mengambil gender
Student.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default Student;
