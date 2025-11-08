import express from "express";
import { registerController, getAllUsersController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { forgotPasswordController } from "../controllers/auth/forgotPassword.js";
import { updateDetailsController } from "../controllers/auth/updateDetails.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

// FORGOT PASSWORD ROUTE
router.post("/forgot-password", forgotPasswordController);

// update details POST route\
router.post("/update-details", updateDetailsController);

router.get('/all-users', getAllUsersController); // Add appropriate middleware


export default router;
