import express from "express";
import { register, login, logout, VerifyEmail, verify } from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyEmail", VerifyEmail);
router.get("/verify", verify); 

export default router;
