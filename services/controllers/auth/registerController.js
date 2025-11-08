import { hashPassword, comparePassword } from "../../helper/authHelper.js";
import userModel from "../../models/userModel.js";

//POST REGISTER
export const registerController = async (req, res) => {
    try {
        const { name, email, phone, password, address, role } = req.body;

        //setup validations
        if (!name) res.send({ message: "Name is Required" });
        if (!email) res.send({ message: "Email is Required" });
        if (!password) res.send({ message: "Password is Required" });
        if (!phone) res.send({ message: "Phone No. is Required" });

        //check for existing users
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Email already registered!",
                errorType: "emailConflict",
            });
        }

        //Register User
        const hashedPassword = await hashPassword(password);

        const user = new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
            address,
            role: role ? role : 0,
        });
        await user.save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully!",
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

// GET ALL USERS {{ edit_1 }}
export const getAllUsersController = async (req, res) => { 
    try { 
        const users = await userModel.find({}); // Fetch all users {{ edit_1 }}
        res.status(200).send({ 
            success: true, 
            message: "All users fetched successfully", 
            users, 
        }); 
    } catch (error) { 
        console.error("Error fetching users:", error); // Log the error for debugging {{ edit_1 }}
        res.status(500).send({ 
            success: false, 
            message: "Error fetching users", 
            error, 
        }); 
    } 
}; 
