import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";
import User from "./User";

interface ActivityLogAttributes {
  id: number;
  user_id: number;
  user_type: "admin" | "teacher" | "student" | "parent";
  activity: string;
  timestamp: Date;
}

interface ActivityLogCreationAttributes extends Optional<ActivityLogAttributes, "id"> {}

class ActivityLog
  extends Model<ActivityLogAttributes, ActivityLogCreationAttributes>
  implements ActivityLogAttributes {
  public id!: number;
  public user_id!: number;
  public user_type!: "admin" | "teacher" | "student" | "parent";
  public activity!: string;
  public timestamp!: Date;
}

ActivityLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    user_type: {
      type: DataTypes.ENUM("admin", "teacher", "student", "parent"),
      allowNull: false,
    },
    activity: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "ActivityLog",
    tableName: "activity_logs",
    timestamps: false,
  }
);

export default ActivityLog;
