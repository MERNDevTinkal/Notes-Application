import express from "express";
import {
    register,
    login,
    logout,
    VerifyEmail,
    getUserDetails,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyEmail", VerifyEmail);
router.get("/me", isAuthenticated, getUserDetails); 

export default router;
