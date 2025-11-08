import express from "express";
import { registerController, getAllUsersController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { userCheckController } from "../controllers/auth/userExist.js";
import { forgotPasswordController } from "../controllers/auth/forgotPassword.js";
import { updateDetailsController } from "../controllers/auth/updateDetails.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//USER EXIST || METHOD POST
router.post("/user-exist", userCheckController);

// FORGOT PASSWORD ROUTE
router.post("/forgot-password", forgotPasswordController);

//protected route-user
router.get("/user-auth", requireSignIn, (req, res) => {
    try {
        res.status(200).send({
            ok: true,
        });
    } catch (error) {
        console.log(error);
    }
});

// update details POST route\
router.post("/update-details", updateDetailsController);

router.get('/all-users', getAllUsersController); // Add appropriate middleware


export default router;
