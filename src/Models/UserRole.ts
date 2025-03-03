import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/database";
import User from "./User";
import Role from "./Role";

// Definisikan atribut untuk UserRole
interface UserRoleAttributes {
  user_id: number;
  role_id: number;
}

class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
  public user_id!: number;
  public role_id!: number;
}

UserRole.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "user_roles",
    timestamps: false,
  }
);

export default UserRole;
