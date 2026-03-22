import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registrationSchema, updateProfileInput } from "./auth.validation.js";
import * as authController from "./auth.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";



const router = express.Router();

// ─── Public Routes ───────//

router.post("/register",validate(registrationSchema), authController.register);
router.post("/login",validate(loginSchema), authController.login);



// ─── Private Routes ───────//

router.get("/me", authenticate, authController.getMe);




// ─── Admin Only ────────//
router.get("/users", authenticate, authorizeRoles("ADMIN"), authController.getAllUsers);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), authController.deleteProfile);


// ─── Self / Admin ───────//
router.patch("/:id", authenticate, validate(updateProfileInput), authController.updateProfile);






export default router;