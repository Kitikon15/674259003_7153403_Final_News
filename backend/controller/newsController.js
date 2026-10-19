import { Op } from "sequelize";
import News from "../model/news.js";

const isPositiveInteger = (val) => {
  const num = Number(val);
  return Number.isInteger(num) && num > 0;
};

const validateNewsInput = (data) => {
  const errors = [];
  const validCategories = ["การศึกษา", "เทคโนโลยี", "สังคม"];

  // Title
  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push("หัวข้อข่าวต้องไม่เป็นค่าว่างหรือเฉพาะ space (1-150 ตัวอักษร)");
  } else if (data.title.trim().length > 150) {
    errors.push("หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร");
  }

  // Reporter
  if (!data.reporter || typeof data.reporter !== "string" || data.reporter.trim().length === 0) {
    errors.push("ชื่อผู้รับผิดชอบต้องไม่เป็นค่าว่างหรือเฉพาะ space (1-100 ตัวอักษร)");
  } else if (data.reporter.trim().length > 100) {
    errors.push("ชื่อผู้รับผิดชอบต้องมีความยาวไม่เกิน 100 ตัวอักษร");
  }

  // Category
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push("หมวดหมู่ต้องเลือกได้เฉพาะ: 'การศึกษา', 'เทคโนโลยี', 'สังคม' เท่านั้น");
  }

  // Published Date
  if (!data.publishedDate || !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedDate)) {
    errors.push("วันที่เผยแพร่ต้องระบุในรูปแบบ YYYY-MM-DD");
  }

  // Description
  if (!data.description || typeof data.description !== "string" || data.description.trim().length === 0) {
    errors.push("รายละเอียดข่าวต้องไม่เป็นค่าว่างหรือเฉพาะ space (1-2,000 ตัวอักษร)");
  } else if (data.description.trim().length > 2000) {
    errors.push("รายละเอียดข่าวต้องมีความยาวไม่เกิน 2,000 ตัวอักษร");
  }

  return errors;
};

// 1. GET /api/news
export const getAllNews = async (req, res) => {
  try {
    const { search, category } = req.query;
    const whereConditions = {};

    if (search && search.trim() !== "") {
      whereConditions.title = {
        [Op.like]: `%${search.trim()}%`,
      };
    }

    if (category && category.trim() !== "" && category !== "ทั้งหมด") {
      whereConditions.category = category.trim();
    }

    const newsList = await News.findAll({
      where: whereConditions,
      order: [["id", "DESC"]],
    });

    return res.status(200).json(newsList);
  } catch (error) {
    console.error("GET /api/news error:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

// 2. GET /api/news/:id
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ message: "id ต้องเป็นจำนวนเต็มบวก" });
    }

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "ไม่พบ id ในฐานข้อมูล" });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error("GET /api/news/:id error:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

// 3. POST /api/news
export const createNews = async (req, res) => {
  try {
    const { title, reporter, category, publishedDate, description, status, imageUrl, videoUrl } = req.body;
    const errors = validateNewsInput({ title, reporter, category, publishedDate, description });

    if (errors.length > 0) {
      return res.status(400).json({ message: "ข้อมูลไม่ถูกต้องตามเงื่อนไข", errors });
    }

    const newNews = await News.create({
      title: title.trim(),
      reporter: reporter.trim(),
      category: category.trim(),
      publishedDate,
      description: description.trim(),
      status: status !== undefined ? Boolean(status) : true,
      imageUrl: imageUrl && typeof imageUrl === "string" && imageUrl.trim() !== "" ? imageUrl.trim() : null,
      videoUrl: videoUrl && typeof videoUrl === "string" && videoUrl.trim() !== "" ? videoUrl.trim() : null,
    });

    return res.status(201).json(newNews);
  } catch (error) {
    console.error("POST /api/news error:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

// 4. PUT /api/news/:id
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ message: "id ต้องเป็นจำนวนเต็มบวก" });
    }

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "ไม่พบ id ในฐานข้อมูล" });
    }

    const { title, reporter, category, publishedDate, description, status, imageUrl, videoUrl } = req.body;
    const errors = validateNewsInput({ title, reporter, category, publishedDate, description });

    if (errors.length > 0) {
      return res.status(400).json({ message: "ข้อมูลไม่ถูกต้องตามเงื่อนไข", errors });
    }

    const updates = {
      title: title.trim(),
      reporter: reporter.trim(),
      category: category.trim(),
      publishedDate,
      description: description.trim(),
      status: status !== undefined ? Boolean(status) : news.status,
    };

    if (imageUrl !== undefined) {
      updates.imageUrl = imageUrl && typeof imageUrl === "string" && imageUrl.trim() !== "" ? imageUrl.trim() : null;
    }

    if (videoUrl !== undefined) {
      updates.videoUrl = videoUrl && typeof videoUrl === "string" && videoUrl.trim() !== "" ? videoUrl.trim() : null;
    }

    await news.update(updates);

    return res.status(200).json(news);
  } catch (error) {
    console.error("PUT /api/news/:id error:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

// 5. DELETE /api/news/:id
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ message: "id ต้องเป็นจำนวนเต็มบวก" });
    }

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "ไม่พบ id ในฐานข้อมูล" });
    }

    await news.destroy();
    return res.status(200).json({ message: "ลบข้อมูลข่าวสำเร็จเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("DELETE /api/news/:id error:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

export default {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
