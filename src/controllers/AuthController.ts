import { Request, Response } from "express";
import { User, Role, UserRole } from "../Models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../Utils/response";
import { Op } from "sequelize";


export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, gender, fullname } = req.body;

    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, "Email sudah digunakan", null, 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
      fullname, // Menambahkan fullname pada pembuatan user
    });

    // Cari role berdasarkan nama
    const selectedRole = await Role.findOne({ where: { name: role } });

    if (!selectedRole) {
      return errorResponse(res, "Role tidak ditemukan", null, 400);
    }

    // Simpan role di tabel user_roles
    await UserRole.create({ user_id: newUser.id, role_id: selectedRole.id });

    return successResponse(res, "Registrasi berhasil", {
      id: newUser.id,
      name: newUser.username,
      email: newUser.email,
      role: selectedRole.name,
      fullname: newUser.fullname, // Menambahkan fullname pada response
    }, 201);
  } catch (error) {
    return errorResponse(res, "Terjadi kesalahan saat registrasi", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // Cek apakah email atau username yang digunakan
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: email || "" },   // Jika email tidak ada, gunakan string kosong
          { username: username || "" },  // Jika username tidak ada, gunakan string kosong
        ],
      },
    });

    if (!user) {
      return errorResponse(res, "Email/Username atau password salah", null, 401);
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, "Email/Username atau password salah", null, 401);
    }

    // Ambil role berdasarkan user_id dari tabel user_roles
    const userRole = await UserRole.findOne({ where: { user_id: user.id } });

    let roleName = "No Role"; // Default jika role tidak ditemukan

    if (userRole) {
      // Ambil nama role dari tabel roles
      const role = await Role.findOne({ where: { id: userRole.role_id } });
      if (role) {
        roleName = role.name;
      }
    }

    // Buat payload untuk token
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: roleName,
    };

    // Generate JWT
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "your_secret_key", { expiresIn: "1h" });

    return successResponse(res, "Login berhasil", { token, user: tokenPayload });
  } catch (error) {
    return errorResponse(res, "Terjadi kesalahan saat login", error, 500);
  }
};
