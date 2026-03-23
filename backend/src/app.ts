import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/index.js";
import { errorHandler } from "./middleware/error.middleware.js";


const app = express()


// ─── Global Middlewares ──────//

// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "https://auth-full-frontend.vercel.app",
//   ],
//   credentials: true,
// }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://auth-full-frontend.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);
    
    // Check if origin is in the list OR is a vercel.app subdomain
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Explicitly handle preflight OPTIONS requests for all routes
app.options('*', cors());



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// ─── Health Check ────//
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// ─── API Routes ──//

app.use("/api/auth", authRoutes)


// ─── 404 Handler ───//
app.use((req,res)=>{
  res.status(404).json({success:false, message:"Route not found"})
})


// ─── Global Error Handler ────//

app.use(errorHandler)


export default app;