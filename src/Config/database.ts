import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
    logging: false,
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Test koneksi ke database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

testConnection();

export default sequelize;
