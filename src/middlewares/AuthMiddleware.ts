import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../Utils/response";

interface UserPayload {
  id: number;
  email: string;
  role: string; 
}

interface AuthRequest extends Request {
  user?: UserPayload; 
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return errorResponse(res, "Akses ditolak. Token tidak ditemukan.", null, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key") as UserPayload;
    req.user = decoded; // Simpan data user dari token ke dalam request dengan tipe yang sesuai
    next();
  } catch (error) {
    return errorResponse(res, "Token tidak valid atau sudah kedaluwarsa.", error, 403);
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(res, "Akses ditolak. User tidak terautentikasi.", null, 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, "Akses ditolak. Anda tidak memiliki izin.", null, 403);
    }

    next();
  };
};
