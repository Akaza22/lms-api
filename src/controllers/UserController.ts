import { Request, Response } from "express";
import { User, Role, UserRole } from "../Models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize"; 
import { successResponse, errorResponse } from "../Utils/response";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }, // Exclude password field
        });
        successResponse(res, "Daftar semua user berhasil diambil", users, 200);
    } catch (error) {
        return errorResponse(res, "Terjadi kesalahan saat mengambil daftar user", error, 500);
    }
};