import sequelize from "../Config/database";
import { Role, User, UserRole } from "../Models";
import bcrypt from "bcryptjs";

const seedDatabase = async () => {
  try {
    console.log("🔄 Syncing database...");
    await sequelize.sync({ force: true }); // ({ alter: true }) untuk update tabel tanpa hapus data
    console.log("✅ Database synchronized!");

    // Seed Roles
    const roles = ["admins", "teachers"];
    const roleInstances = await Promise.all(
      roles.map(async (roleName) => await Role.create({ name: roleName }))
    );
    console.log("✅ Roles seeded!");

    // Seed Admin User
    const hashedPassword = await bcrypt.hash("12345", 10);
    const admin = await User.create({
      username: "akaza22",
      email: "akaza@example.com",
      password: hashedPassword,
      gender: "L", // Tambahin gender di User
    });

    // Cari role "admins"
    const adminRole = await Role.findOne({ where: { name: "admins" } });
    if (adminRole) {
      await UserRole.create({ user_id: admin.id, role_id: adminRole.id }); // Masukin role admin ke UserRole
    }

    console.log("✅ Admin user seeded!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await sequelize.close();
    console.log("🔒 Connection closed.");
  }
};

seedDatabase();
