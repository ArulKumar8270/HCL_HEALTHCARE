//packages
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

//local imports
import connectDB from "./config/database.js";
import authRoute from "./routes/authRoute.js";

//rest object
const app = express();

//configure env
dotenv.config();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//connect DB
connectDB();

//port
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello there!");
});

//routes
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
