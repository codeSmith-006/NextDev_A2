import { Router } from "express";
import { authController } from "./users.controller";

// create router
const router = Router();

// post method for signup users
router.post("/signup", authController.createUser);

// post method for login users
router.post("/login", authController.loginUser)

export const usersRouter = router;
