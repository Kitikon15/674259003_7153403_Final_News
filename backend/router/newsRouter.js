import { Router } from "express";
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controller/newsController.js";

const newsRouter = Router();

newsRouter.get("/", getAllNews);
newsRouter.get("/:id", getNewsById);
newsRouter.post("/", createNews);
newsRouter.put("/:id", updateNews);
newsRouter.delete("/:id", deleteNews);

export { newsRouter };
export default newsRouter;
