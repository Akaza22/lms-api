import { Request, Response } from "express";
import { User, Role, UserRole, Admin } from "../Models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import { Op } from "sequelize"; 
import { successResponse, errorResponse } from "../Utils/response";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return errorResponse(res, "Email tidak ditemukan", null, 404);
        }

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        // Simpan token dan waktu kadaluarsa di database
        await user.update({
            reset_password_token: resetToken,
            reset_password_expires: new Date(Date.now() + 3600000), // 1 jam
        });

        // Kirim email dengan token reset password
        const mailOptions = {
            from: EMAIL_USER,
            to: user.email,
            subject: "Reset Password",
            text: `Anda telah meminta reset password. Klik link berikut untuk mereset password Anda: 
            http://yourfrontend.com/reset-password?token=${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        successResponse(res, "Token reset password telah dikirim ke email", resetToken, 200);
    } catch (error) {
        return errorResponse(res, "Terjadi kesalahan saat mengirim email reset password", error, 500);
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;

    try {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({
            where: { reset_password_token: token },
        });

        if (!user) {
            return errorResponse(res, "Token tidak valid atau telah kadaluarsa", null, 400);
        }

        // Hash password baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({
            password: hashedPassword,
            reset_password_token: undefined,
            reset_password_expires: undefined,
        });

        successResponse(res, "Password berhasil direset", null, 200);
    } catch (error) {
        return errorResponse(res, "Terjadi kesalahan saat mereset password", error, 500);
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }, // Exclude password field
        });
        successResponse(res, "Daftar semua user berhasil diambil", users, 200);
    } catch (error) {
        return errorResponse(res, "Terjadi kesalahan saat mengambil daftar user", error, 500);
    }
};

// Edit User
export const editUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { username, email, phone, profile_image, gender, fullname } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return errorResponse(res, "User tidak ditemukan", null, 404);
        }

        await user.update({ username, email, phone, profile_image, gender, fullname });

        // Ambil data tanpa createdAt & updatedAt
        const updatedUser = await User.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        successResponse(res, "User berhasil diperbarui", updatedUser, 200);
    } catch (error) {
        return errorResponse(res, "Terjadi kesalahan saat mengupdate user", error, 500);
    }
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }, // Jangan tampilkan password
        });

        if (!user) {
            return errorResponse(res, "User tidak ditemukan", null, 404);
        }

        successResponse(res, "User berhasil ditemukan", user, 200);
    } catch (error) {
        return errorResponse(res, "Terjadi kesalahan saat mengambil data user", error, 500);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        });

        if (!user) {
            return errorResponse(res, "User tidak ditemukan", null, 404);
        }

        await user.destroy();
        successResponse(res, "User berhasil dihapus", null, 200);
    } catch (error) {
        return errorResponse(res, "Terjadi kesalahan saat menghapus user", error, 500);
    }
}

export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await Admin.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "username", "email", "phone", "fullname", "profile_image"]
                }
            ]
        });

        res.json({ success: true, data: admins });
    } catch (error) {
        console.error("[ERROR] Failed to fetch admins:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};