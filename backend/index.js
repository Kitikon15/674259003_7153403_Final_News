import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import newsRouter from "./router/newsRouter.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// ตั้งค่า CORS ให้อนุญาต Frontend Cross-Origin
app.use(cors());

// แปลง JSON และ URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เส้นทาง API ข่าว (/api/news)
app.use("/api/news", newsRouter);

// เชื่อมต่อฐานข้อมูล
connectDB();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ยินดีต้อนรับสู่ RESTful API ระบบจัดการข่าวสาร (News Management API)",
    endpoints: {
      news: "/api/news",
    },
  });
});

// Error handling middleware (Status 500 โดยไม่ส่งข้อมูลลับ)
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  return res.status(500).json({
    message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
  });
});

// ฟังที่ 0.0.0.0 และ process.env.PORT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on: http://0.0.0.0:${PORT} (http://localhost:${PORT})`);
});

export default app;
