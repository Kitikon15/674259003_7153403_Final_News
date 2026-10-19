import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "หัวข้อข่าวต้องไม่เป็นค่าว่าง" },
        notEmpty: { msg: "หัวข้อข่าวต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 150],
          msg: "หัวข้อข่าวต้องมีความยาวระหว่าง 1 ถึง 150 ตัวอักษร",
        },
        isNotSpaceOnly(value) {
          if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("หัวข้อข่าวต้องไม่เป็นค่าว่างหรือเฉพาะ space");
          }
        },
      },
    },
    reporter: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "ชื่อผู้รับผิดชอบต้องไม่เป็นค่าว่าง" },
        notEmpty: { msg: "ชื่อผู้รับผิดชอบต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 100],
          msg: "ชื่อผู้รับผิดชอบต้องมีความยาวระหว่าง 1 ถึง 100 ตัวอักษร",
        },
        isNotSpaceOnly(value) {
          if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("ชื่อผู้รับผิดชอบต้องไม่เป็นค่าว่างหรือเฉพาะ space");
          }
        },
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาเลือกหมวดหมู่ข่าว" },
        isIn: {
          args: [["การศึกษา", "เทคโนโลยี", "สังคม"]],
          msg: "หมวดหมู่ต้องเลือกได้เฉพาะ: 'การศึกษา', 'เทคโนโลยี', 'สังคม' เท่านั้น",
        },
      },
    },
    publishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุวันที่เผยแพร่" },
        isDate: { msg: "รูปแบบวันที่เผยแพร่ต้องเป็น YYYY-MM-DD" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "รายละเอียดข่าวต้องไม่เป็นค่าว่าง" },
        notEmpty: { msg: "รายละเอียดข่าวต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 2000],
          msg: "รายละเอียดข่าวต้องมีความยาวระหว่าง 1 ถึง 2,000 ตัวอักษร",
        },
        isNotSpaceOnly(value) {
          if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("รายละเอียดข่าวต้องไม่เป็นค่าว่างหรือเฉพาะ space");
          }
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "news",
    timestamps: true,
  }
);

export { News };
export default News;
