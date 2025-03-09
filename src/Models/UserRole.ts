import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/database";
import User from "./User";
import Role from "./Role";
import Admin from "./Admin";
import Teacher from "./Teacher";
import Student from "./Student";
import Parent from "./Parent";

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

// Trigger setelah user_roles dibuat
UserRole.afterCreate(async (userRole) => {
  if (userRole.role_id === 1) { // 1 = role admin (sesuaikan)
    await Admin.create({ user_id: userRole.user_id });
  }
});

UserRole.afterCreate(async (userRole) => {
  if (userRole.role_id === 2) { // 1 = role admin (sesuaikan)
    await Teacher.create({ user_id: userRole.user_id });
  }
});

UserRole.afterCreate(async (userRole) => {
  if (userRole.role_id === 3) { // 1 = role admin (sesuaikan)
    await Student.create({ user_id: userRole.user_id });
  }
});

UserRole.afterCreate(async (userRole) => {
  if (userRole.role_id === 4) { // 1 = role admin (sesuaikan)
    await Parent.create({ user_id: userRole.user_id });
  }
});



export default UserRole;
