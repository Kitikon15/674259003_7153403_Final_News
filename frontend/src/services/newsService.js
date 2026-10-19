import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/news`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const newsService = {
  // 1. อ่านรายการข่าวทั้งหมด พร้อมค้นหาและกรองหมวดหมู่
  getAllNews: async (search = "", category = "") => {
    const params = {};
    if (search && search.trim() !== "") {
      params.search = search.trim();
    }
    if (category && category.trim() !== "" && category !== "ทั้งหมด") {
      params.category = category.trim();
    }
    const response = await api.get("/", { params });
    return response.data;
  },

  // 2. อ่านรายละเอียดข่าว 1 รายการ
  getNewsById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // 3. เพิ่มข้อมูลข่าวใหม่
  createNews: async (newsData) => {
    const response = await api.post("/", newsData);
    return response.data;
  },

  // 4. แก้ไขข้อมูลข่าว
  updateNews: async (id, newsData) => {
    const response = await api.put(`/${id}`, newsData);
    return response.data;
  },

  // 5. ลบข้อมูลข่าว
  deleteNews: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};

export default newsService;
