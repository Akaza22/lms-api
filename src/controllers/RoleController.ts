import { Request, Response } from "express";
import { Role, User } from "../Models/index";
import { successResponse, errorResponse } from "../Utils/response";

export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    // Validasi input
    if (!name) {
      errorResponse(res, "Nama role wajib diisi", null, 400);
      return;
    }

    // Cek apakah role sudah ada
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      errorResponse(res, `Role dengan nama '${name}' sudah ada`, null, 400);
      return;
    }

    // Buat role baru
    const role = await Role.create({ name, description });
    successResponse(res, `Role '${role.name}' berhasil dibuat`, role, 201);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      errorResponse(res, "Role sudah ada, tidak boleh duplikat", error, 400);
    } else if (error.name === "SequelizeValidationError") {
      errorResponse(res, "Validasi gagal, cek kembali input", error, 400);
    } else {
      errorResponse(res, "Terjadi kesalahan saat membuat role", error, 500);
    }
  }
};

export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          as: "users",
          through: { attributes: [] },
          attributes: ["username", "email"],
        }
      ]
    }); // Ambil semua role dari database

    if (roles.length === 0) {
      successResponse(res, "Belum ada role yang tersedia", [], 200);
      return;
    }

    successResponse(res, "Daftar semua role berhasil diambil", roles, 200);
  } catch (error) {
    errorResponse(res, "Terjadi kesalahan saat mengambil daftar role", error, 500);
  }
};

export const updateRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Cari role berdasarkan ID
    const role = await Role.findByPk(id);
    if (!role) {
      errorResponse(res, `Role dengan ID ${id} tidak ditemukan`, null, 404);
      return;
    }

    // Cek jika nama role ingin diganti dan sudah ada di database
    if (name && name !== role.name) {
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole) {
        errorResponse(res, `Role dengan nama '${name}' sudah ada`, null, 400);
        return;
      }
    }

    // Update role
    await role.update({ name, description });
    successResponse(res, `Role '${role.name}' berhasil diperbarui`, role, 200);
  } catch (error) {
    errorResponse(res, "Terjadi kesalahan saat memperbarui role", error, 500);
  }
};

export const deleteRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Cari role berdasarkan ID
    const role = await Role.findByPk(id);
    if (!role) {
      errorResponse(res, `Role dengan ID ${id} tidak ditemukan`, null, 404);
      return;
    }

    // Hapus role
    await role.destroy();
    successResponse(res, `Role '${role.name}' berhasil dihapus`, null, 200);
  } catch (error) {
    errorResponse(res, "Terjadi kesalahan saat menghapus role", error, 500);
  }
};

