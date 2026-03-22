import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/index.js";
import { errorHandler } from "./middleware/error.middleware.js";


const app = express()


// ─── Global Middlewares ──────//

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



// ─── API Routes ──//

app.use("/api/auth", authRoutes)


// ─── 404 Handler ───//
app.use((req,res)=>{
  res.status(404).json({success:false, message:"Route not found"})
})


// ─── Global Error Handler ────//

app.use(errorHandler)


export default app;