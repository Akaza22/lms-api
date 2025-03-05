import express from "express";
import cors from "cors";
import sequelize from "./Config/database";
import roleRoutes from "./Routes/RoleRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/roles", roleRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);


export default app;
