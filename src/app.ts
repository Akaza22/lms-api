import express from "express";
import cors from "cors";
import sequelize from "./Config/database";
import roleRoutes from "./Routes/RoleRoutes";
import AuthRoutes from "./Routes/AuthRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/roles", roleRoutes);
app.use("/api/auth", AuthRoutes);


export default app;
