import { Router } from "express";
import { createRole, getAllRoles, updateRole, deleteRole } from "../controllers/RoleController";
import { authenticate, authorize } from "../middlewares/AuthMiddleware";


const router = Router();

router.post("/createRole", authenticate, authorize('admins'), createRole);
router.get("/getRole", authenticate, authorize('admins'), getAllRoles);
router.put("/:id", authenticate, authorize('admins'), updateRole); 
router.delete("/:id", authenticate, authorize('admins'), deleteRole);

export default router;
