import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  profile_image?: string;
  gender: "L" | "P";
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email?: string;
  public phone?: string;
  public profile_image?: string;
  public gender!: "L" | "P";
  public created_at?: Date;
  public updated_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    profile_image: {
      type: DataTypes.TEXT,
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: false,
      validate: {
        isIn: [["L", "P"]],
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default User;