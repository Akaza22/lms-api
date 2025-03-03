import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";

interface SystemSettingAttributes {
  id: number;
  setting_key: string;
  setting_value: string;
  description?: string | null;
}

interface SystemSettingCreationAttributes extends Optional<SystemSettingAttributes, "id" | "description"> {}

class SystemSetting
  extends Model<SystemSettingAttributes, SystemSettingCreationAttributes>
  implements SystemSettingAttributes {
  public id!: number;
  public setting_key!: string;
  public setting_value!: string;
  public description?: string | null;
}

SystemSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    setting_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    setting_value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SystemSetting",
    tableName: "system_settings",
    timestamps: false,
  }
);

export default SystemSetting;
