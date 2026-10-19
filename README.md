# [ระบุรหัสนักศึกษา]_7153403_Final_B

รายงานโครงการและคู่มือการติดตั้งระบบบริหารจัดการข่าวสารออนไลน์ (Online News Portal System)  
การสอบปลายภาค รายวิชา **7153403 เทคโนโลยีการบริการเว็บ (Web Service Technology)** ภาคเรียนที่ 1 ปีการศึกษา 2569  
สาขาวิชาวิศวกรรมซอฟต์แวร์ คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏนครปฐม (NPRU)

---

## 1. ข้อมูลเกี่ยวกับโครงการ (Project Overview)

- **ชื่อรายวิชา:** 7153403 เทคโนโลยีการบริการเว็บ (Web Service Technology)
- **ชุดโจทย์ที่ได้รับ:** ชุดโจทย์ที่ 2 - ข่าว (News) [ชุด B]
- **ทรัพยากร / API Base Path:** `news` / `/api/news`
- **ชื่อฟิลด์ผู้รับผิดชอบ:** `reporter` (ผู้รายงาน / ผู้สื่อข่าว)
- **ชื่อฟิลด์วันที่:** `publishedDate` (วันที่เผยแพร่ข่าว รูปแบบ `YYYY-MM-DD`)
- **หมวดหมู่ที่เลือกได้:** `การศึกษา`, `เทคโนโลยี`, `สังคม`
- **ฟีเจอร์เพิ่มเติม (Multimedia Support):** รองรับทั้งรูปภาพประกอบข่าว (`imageUrl`) และ **วิดีโอประกอบข่าว (`videoUrl`)** รองรับ YouTube Iframe Player และไฟล์วิดีโอตรง (MP4)
- **Production URLs (สำหรับการตรวจงานออนไลน์):**
  - **Frontend (Vercel):** `https://[ระบุรหัสนักศึกษา]-final-b.vercel.app`
  - **Backend API Base URL (Render):** `https://api-news-[ระบุรหัสนักศึกษา].onrender.com`
  - **Example Endpoint:** `https://api-news-[ระบุรหัสนักศึกษา].onrender.com/api/news`

---

## 2. เครื่องมือและเทคโนโลยีที่ใช้ (Tech Stack)

### ฝั่งหน้าบ้าน (Frontend)
- **Core Library & Build Tool:** React 19, Vite
- **Routing & Networking:** React Router DOM, Axios
- **UI Styling & Theming:** Tailwind CSS v4, DaisyUI, Lucide React (Icons)
- **Design Philosophy:** **Monochrome Luxury Theme** (เน้นเฉดสี `#000000`, `#18181B`, `#27272A`, `#F4F4F5`, `#FFFFFF` คอนทราสต์คมชัด อ่านง่าย สไตล์พอร์ทัลสำนักข่าวชั้นนำระดับสากล)
- **Notifications & Modals:** SweetAlert2 (`alertService`) สำหรับการแจ้งเตือนผลการดำเนินงานแบบ Toast และ Popup

### ฝั่งหลังบ้าน (Backend)
- **Runtime & Web Framework:** Node.js (ES Module), Express.js v5
- **ORM & Data Modeling:** Sequelize ORM v6
- **Database Engine:** Relational Database (SQLite3 สำหรับพัฒนาในเครื่อง / MySQL หรือ PostgreSQL บน Cloud)
- **Middleware & Utility:** CORS (Cross-Origin Resource Sharing), Dotenv (Environment Configuration)

### แพลตฟอร์มการเผยแพร่ (Deployment Platforms)
- **Frontend Hosting:** Vercel (เชื่อมต่อ Continuous Deployment จาก GitHub Repository)
- **Backend Hosting:** Render (Web Service แบบ Web Service Node.js รองรับ Cold Start Resume)

---

## 3. โครงสร้างโฟลเดอร์ของโครงการ (Directory Structure)

```text
Management-Product-main/
├── .env.example                     # ตัวอย่าง Environment variables สำหรับ Root
├── docker-compose.yml               # การตั้งค่า Docker Container
├── vercel.json                      # การตั้งค่า Rewrite เส้นทาง Routing สำหรับ Vercel
├── README.md                        # รายงานฉบับสมบูรณ์และการส่งข้อสอบ
│
├── backend/                         # ส่วนของ RESTful API Server (Node.js + Express)
│   ├── .env                         # ไฟล์เก็บค่า Config และความลับ (ไม่แชร์ลง Git)
│   ├── .env.example                 # ตัวอย่างการตั้งค่า Environment variables ของ Backend
│   ├── database.sqlite              # ไฟล์ฐานข้อมูล SQLite (Persistent Storage)
│   ├── index.js                     # ไฟล์หลักเริ่มต้น Express Server (Entry Point)
│   ├── package.json                 # กำหนด Scripts และ Dependencies ของ Backend
│   │
│   ├── config/                      # โฟลเดอร์ตั้งค่าการเชื่อมต่อฐานข้อมูล
│   │   └── database.js              # Sequelize Connection Instance (SQLite / MySQL / Postgres)
│   │
│   ├── controller/                  # โฟลเดอร์ประมวลผล Business Logic
│   │   └── newsController.js        # Controller จัดการ CRUD ข่าวสาร และ Validation
│   │
│   ├── model/                       # โฟลเดอร์นิยาม Data Model & Validation Rules
│   │   └── news.js                  # Sequelize Model 'News' พร้อมฟิลด์ videoUrl
│   │
│   ├── router/                      # โฟลเดอร์นิยามเส้นทาง API
│   │   └── newsRouter.js            # กำหนด HTTP Methods และ Paths ของ /api/news
│   │
│   └── seeders/                     # โฟลเดอร์ไฟล์ข้อมูลเริ่มต้นสำหรับทดสอบระบบ
│       └── seed.js                  # Script สร้างตารางและบันทึกข้อมูลตัวอย่าง 10 รายการ
│
└── frontend/                        # ส่วนของ User Interface (React + Vite)
    ├── .env                         # ไฟล์เก็บค่า Config ของ Frontend (เช่น VITE_API_URL)
    ├── .env.example                 # ตัวอย่างการตั้งค่า Environment variables ของ Frontend
    ├── index.html                   # ไฟล์แม่แบบ Single Page Application (SPA)
    ├── package.json                 # กำหนด Dependencies และ Scripts ของ Frontend
    ├── vercel.json                  # การจัดการ SPA Fallback Routing บน Vercel
    ├── vite.config.js               # การตั้งค่าการ Build ของ Vite
    │
    └── src/
        ├── App.jsx                  # Root Component และการจัดการ React Router
        ├── main.jsx                 # Entry point ของ React DOM
        ├── index.css                # การตั้งค่า Tailwind CSS และ Custom Font
        │
        ├── components/              # คอมโพเนนต์ส่วนย่อยสำหรับประกอบหน้าจอ
        │   ├── Navbar.jsx           # แถบนำทางด้านบนและเลือกหมวดหมู่ด่วน
        │   ├── SearchFilter.jsx     # แถบค้นหาตามชื่อข่าวและตัวกรองหมวดหมู่
        │   ├── NewsHeroCard.jsx     # การ์ดข่าวเด่นขนาดใหญ่ รองรับ Embed Video / Image
        │   ├── NewsCard.jsx         # การ์ดข่าวทั่วไป 3 คอลัมน์ พร้อม Badge วิดีโอ
        │   ├── NewsTable.jsx        # มุมมองตารางสำหรับตรวจสอบข้อมูลฉบับย่อ
        │   ├── NewsDetailModal.jsx  # หน้าต่างดูเนื้อหาข่าวฉบับเต็มและเล่นวิดีโอ
        │   ├── NewsFormModal.jsx    # หน้าต่างฟอร์มเพิ่ม/แก้ไข พร้อม Live Video Preview
        │   ├── DeleteConfirmModal.jsx # หน้าต่างยืนยันการลบข้อมูล (Sweet Confirm)
        │   └── VideoPlayer.jsx      # ตัวเล่นวิดีโออัจฉริยะ (YouTube Iframe & HTML5 Video)
        │
        ├── pages/
        │   └── NewsPage.jsx         # หน้าจอหลักศูนย์ข่าวสาร (State & CRUD Coordinator)
        │
        ├── services/
        │   └── newsService.js       # โมดูล Axios เชื่อมต่อไปยัง RESTful API (/api/news)
        │
        └── utils/
            └── videoHelper.js       # ฟังก์ชันช่วยตรวจสอบและแปลง URL วิดีโอ (YouTube Parser)
```

---

## 4. ข้อกำหนดข้อมูลและ RESTful API Endpoints

### 4.1 Schema ข้อมูลในฐานข้อมูล (Sequelize Model: `news`)

ตาราง `news` ถูกออกแบบและกำกับ Validation ทั้งในระดับ Sequelize Model และ Controller ดังนี้:

| ฟิลด์ (Field) | ชนิดข้อมูล (Data Type) | Nullable | ข้อกำหนดและการตรวจสอบ (Validation & Constraints) |
|---|---|:---:|---|
| `id` | `INTEGER` | NO | Primary Key, Auto-increment, จำนวนเต็มบวก |
| `title` | `STRING(150)` | NO | หัวข้อข่าว ความยาว 1-150 ตัวอักษร, ห้ามเป็นค่าว่างหรือ Space ล้วน |
| `reporter` | `STRING(100)` | NO | ชื่อผู้รับผิดชอบ/ผู้สื่อข่าว ความยาว 1-100 ตัวอักษร, ห้ามเป็นค่าว่างหรือ Space ล้วน |
| `category` | `STRING(50)` | NO | หมวดหมู่ข่าว กำหนดให้เลือกได้เฉพาะ: `'การศึกษา'`, `'เทคโนโลยี'`, `'สังคม'` |
| `publishedDate` | `DATEONLY` | NO | วันที่เผยแพร่ข่าว รูปแบบ `YYYY-MM-DD` |
| `description` | `TEXT` | NO | รายละเอียดเนื้อหาข่าว ความยาว 1-2,000 ตัวอักษร, ห้ามเป็นค่าว่างหรือ Space ล้วน |
| `status` | `BOOLEAN` | NO | สถานะข่าว: `true` = เผยแพร่แล้ว (Publish), `false` = ฉบับร่าง (Draft) (Default: `true`) |
| `imageUrl` | `STRING(500)` | YES | ลิงก์ URL รูปภาพประกอบข่าว (หากไม่ระบุจะใช้ Default Placeholder Image) |
| `videoUrl` | `STRING(500)` | YES | ลิงก์ URL วิดีโอประกอบข่าว รองรับ YouTube Link หรือไฟล์ `.mp4` (Default: `null`) |
| `createdAt` | `DATETIME` | NO | วันเวลาที่สร้างข้อมูล (ระบบ Sequelize จัดการให้อัตโนมัติ) |
| `updatedAt` | `DATETIME` | NO | วันเวลาที่แก้ไขข้อมูลล่าสุด (ระบบ Sequelize จัดการให้อัตโนมัติ) |

---

### 4.2 ตารางสรุป RESTful API Endpoints (`/api/news`)

ระบบรองรับการสื่อสารตามมาตรฐาน REST architecture ครบ 5 เมธอดหลัก:

| HTTP Method | Endpoint Path | หน้าที่การทำงาน | Request Body / Query Params | Success Status Code | Error Status Codes |
|:---:|---|---|---|:---:|:---:|
| **GET** | `/api/news` | ดึงรายการข่าวทั้งหมด พร้อมระบบค้นหาและกรอง | Query: `?search=...&category=...` | **200 OK** | 500 Internal Server Error |
| **GET** | `/api/news/:id` | ดึงรายละเอียดข่าวรายชิ้นตาม `id` | Params: `id` (จำนวนเต็มบวก) | **200 OK** | 400 Bad Request, 404 Not Found, 500 |
| **POST** | `/api/news` | สร้างและบันทึกข้อมูลข่าวสารใหม่ | Body (JSON): `title`, `reporter`, `category`, `publishedDate`, `description`, `status`, `imageUrl`, `videoUrl` | **201 Created** | 400 Bad Request (Validation Fail), 500 |
| **PUT** | `/api/news/:id` | แก้ไขและอัปเดตข้อมูลข่าวตาม `id` | Params: `id`, Body (JSON): ข้อมูลที่ต้องการอัปเดต | **200 OK** | 400 Bad Request, 404 Not Found, 500 |
| **DELETE** | `/api/news/:id` | ลบข้อมูลข่าวสารออกจากฐานข้อมูลตาม `id` | Params: `id` (จำนวนเต็มบวก) | **200 OK** | 400 Bad Request, 404 Not Found, 500 |

---

## 5. วิธีการติดตั้ง ตั้งค่า และสร้างฐานข้อมูล (Setup & Installation Guide)

### 5.1 การตั้งค่า Environment Variables (`.env`)

#### ฝั่ง Backend (`backend/.env`)
สร้างไฟล์ `backend/.env` โดยคัดลอกโครงสร้างจาก `backend/.env.example`:

```env
# พอร์ตการทำงานของ Express Server
PORT=5000

# การตั้งค่าฐานข้อมูล SQLite (ค่าเริ่มต้นสำหรับ Local Testing)
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
DATABASE_URL=sqlite:./database.sqlite

# กรณีเชื่อมต่อ PostgreSQL (เช่น บน Neon Tech หรือ Render Database)
# DATABASE_URL=postgres://username:password@ep-host.ap-southeast-1.neon.tech/news_db?sslmode=require
```

#### ฝั่ง Frontend (`frontend/.env`)
สร้างไฟล์ `frontend/.env` โดยคัดลอกโครงสร้างจาก `frontend/.env.example`:

```env
# URL ปลายทางของ Backend API
VITE_API_URL=http://localhost:5000

# เมื่อขึ้น Production ให้เปลี่ยนเป็น URL ของ Render:
# VITE_API_URL=https://api-news-backend.onrender.com
```

---

### 5.2 การติดตั้ง Dependencies และสร้างฐานข้อมูล (Database Setup)

#### 1) ติดตั้งแพ็กเกจของ Backend
```bash
cd backend
npm install
```

#### 2) ติดตั้งแพ็กเกจของ Frontend
```bash
cd ../frontend
npm install
```

#### 3) สั่งสร้างตารางและ Seed ข้อมูลตัวอย่าง 10 รายการ
เปิดโฟลเดอร์ `backend` แล้วรันคำสั่ง Seed:
```bash
cd backend
npm run seed
```
ระบบจะทำการซิงค์โครงสร้างตาราง `news` เข้าสู่ฐานข้อมูล SQLite และเพิ่มข้อมูลตัวอย่างเริ่มต้นทั้ง 10 ข่าวสารอย่างสมบูรณ์

---

## 6. คำสั่งเริ่มระบบ (Running the Project)

### 6.1 คำสั่งสำหรับ Development Environment (Local)

เปิดหน้าต่าง Terminal 2 ตัวเพื่อรัน Backend และ Frontend พร้อมกัน:

**Terminal 1 (Backend Server):**
```bash
cd backend
npm run dev
```
> เซิร์ฟเวอร์จะเปิดทำงานที่: `http://localhost:5000` (ตรวจสอบสถานะผ่าน Browser ได้ทันที)

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
```
> ระบบจะรัน Vite Dev Server ที่: `http://localhost:5173`

---

### 6.2 คำสั่งสำหรับ Production Environment

#### Frontend (Build สำหรับส่งขึ้น Vercel / Static Hosting)
```bash
cd frontend
npm run build
```
- **Output Directory:** `dist`
- **Build Command บน Vercel:** `npm run build`
- **Output Directory บน Vercel:** `dist`

#### Backend (Start บน Render / Production Node.js Server)
```bash
cd backend
npm start
```
- **Root Directory บน Render:** `backend`
- **Build Command บน Render:** `npm install`
- **Start Command บน Render:** `npm start` (รัน `node index.js`)

---

## 7. ข้อมูลตัวอย่างสำหรับทดสอบระบบ (Seed Data Summary)

ข้อมูลเริ่มต้นในฐานข้อมูลจำนวน **10 รายการ** ครบถ้วนทั้ง 3 หมวดหมู่ และมีสถานะทั้งเผยแพร่ (`true`) และฉบับร่าง (`false`) รวมถึงตัวอย่างที่มีวิดีโอ (`videoUrl`):

| ID | หัวข้อข่าว (Title) | ผู้รับผิดชอบ (`reporter`) | หมวดหมู่ (`category`) | วันที่ (`publishedDate`) | สถานะ (`status`) | วิดีโอ (`videoUrl`) |
|:---:|---|---|:---:|:---:|:---:|---|
| **1** | กระทรวงศึกษาธิการเปิดตัวแพลตฟอร์ม AI เพื่อการเรียนรู้ของนักเรียนทั่วประเทศ | กิตติศักดิ์ พัฒนาวิทย์ | การศึกษา | 2026-03-10 | เผยแพร่ (`true`) | YouTube (JMLsHI8aV0g) |
| **2** | นักวิจัยเผยความก้าวหน้าเทคโนโลยีควอนตัมคอมพิวติงด้านความปลอดภัยไซเบอร์ | ดร.สมชาย นวัตกร | เทคโนโลยี | 2026-03-15 | เผยแพร่ (`true`) | YouTube (JhHMJCUmq28) |
| **3** | โครงการสร้างพื้นที่สีเขียวในชุมชนเมืองเพื่อสุขภาวะและสิ่งแวดล้อมที่ยั่งยืน | วาสนา รักษ์ถิ่น | สังคม | 2026-03-20 | เผยแพร่ (`true`) | YouTube (gQqom5_wFls) |
| **4** | มหาวิทยาลัยชั้นนำเปิดตัวหลักสูตร Micro-credentials สะสมหน่วยกิตรองรับตลาดงานใหม่ | กิตติศักดิ์ พัฒนาวิทย์ | การศึกษา | 2026-03-25 | ฉบับร่าง (`false`) | - (ใช้รูปภาพ) |
| **5** | ยานยนต์พลังงานไฮโดรเจนสะอาดต้นแบบพร้อมเข้าสู่สายการผลิตเชิงพาณิชย์ | ดร.สมชาย นวัตกร | เทคโนโลยี | 2026-04-01 | เผยแพร่ (`true`) | - (ใช้รูปภาพ) |
| **6** | แนวทางรับมือสังคมสูงวัยด้วยระบบสวัสดิการชุมชนและเครือข่ายจิตอาสา | วาสนา รักษ์ถิ่น | สังคม | 2026-04-05 | เผยแพร่ (`true`) | - (ใช้รูปภาพ) |
| **7** | งานวิจัยพบการอ่านหนังสือแบบรูปเล่มช่วยเพิ่มสมาธิในเด็กได้ดีกว่าการอ่านผ่านหน้าจอ | ปิยะมาศ ธรรมนูญ | การศึกษา | 2026-04-08 | เผยแพร่ (`true`) | - (ใช้รูปภาพ) |
| **8** | ชิปประมวลผลขนาด 1 นาโนเมตรรุ่นแรกผ่านการทดสอบประหยัดพลังงานสำเร็จ | ณัฐพล ดิจิทัล | เทคโนโลยี | 2026-04-12 | ฉบับร่าง (`false`) | - (ใช้รูปภาพ) |
| **9** | รณรงค์ลดขยะพลาสติกแบบใช้ครั้งเดียวทิ้งในตลาดสดและร้านค้าชุมชน | วาสนา รักษ์ถิ่น | สังคม | 2026-04-15 | เผยแพร่ (`true`) | - (ใช้รูปภาพ) |
| **10** | การประชุมวิชาการนานาชาติว่าด้วยการศึกษายุคโลกเสมือนและเมตาเวิร์ส | กิตติศักดิ์ พัฒนาวิทย์ | การศึกษา | 2026-04-18 | ฉบับร่าง (`false`) | - (ใช้รูปภาพ) |

---

## 8. หลักฐานการทดสอบระบบ (Testing & Deployment Evidence)

### 8.1 บันทึกการตั้งค่าบนแพลตฟอร์ม Cloud

#### การตั้งค่าบน Vercel (Frontend Client)
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  - `VITE_API_URL`: `https://api-news-[ระบุรหัสนักศึกษา].onrender.com`

#### การตั้งค่าบน Render (Backend API Service)
- **Environment:** Node
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `PORT`: `5000` (หรือปล่อยให้ Render กำหนดให้อัตโนมัติ)
  - `DATABASE_URL`: `sqlite:./database.sqlite` (หรือ Connection String ของฐานข้อมูลคลาวด์)

> [!NOTE]
> **หมายเหตุเรื่อง Cold Start / Spin-up Time ของ Render Free Tier:**  
> เซิร์ฟเวอร์ Render บน Free Tier จะเข้าสู่โหมดพักตัว (Sleep) หากไม่มีคำขอเข้ามาเป็นเวลา 15 นาที เมื่อมีคำขอแรกเข้ามา เซิร์ฟเวอร์จะใช้เวลาตื่นตัว (Spin-up Time) ประมาณ **30 - 50 วินาที** ซึ่งหน้าเว็บ React ได้เตรียมระบบ Loading State และปุ่ม "ลองใหม่อีกครั้ง" รองรับไว้เรียบร้อยแล้ว

---

### 8.2 ภาพหน้าจอหลักฐานการทำงาน (Screenshot Placeholders)

| ลำดับ | ส่วนการทำงาน | คำอธิบายภาพหน้าจอ | พื้นที่แนบภาพ |
|:---:|---|---|:---:|
| 1 | **หน้ารวมข่าวสาร (Hero Card & Grid)** | แสดงการ์ดข่าวเด่นที่มีตัวเล่นวิดีโอ YouTube และการ์ดข่าว 3 คอลัมน์ | `[แนบภาพ Screenshot 01: Hero & News Grid]` |
| 2 | **ฟอร์มเพิ่มข่าวสารใหม่ (Create Modal)** | แสดงช่องกรอกข้อมูลครบถ้วน พร้อมช่องกรอก URL วิดีโอ และ Live Preview | `[แนบภาพ Screenshot 02: Create News Modal]` |
| 3 | **ฟอร์มแก้ไขข่าวสาร (Edit Modal)** | แสดงการดึงข้อมูลเดิมขึ้นมาแก้ไขอย่างถูกต้อง | `[แนบภาพ Screenshot 03: Edit News Modal]` |
| 4 | **หน้าต่างดูรายละเอียด (Detail Modal)** | แสดงรายละเอียดข่าวฉบับเต็ม พร้อมเครื่องเล่นวิดีโอ YouTube Iframe | `[แนบภาพ Screenshot 04: News Detail & Video Player]` |
| 5 | **หน้าต่างยืนยันการลบ (Delete Confirm)** | แสดง Popup แจ้งเตือนยืนยันชื่อข่าวก่อนสั่งลบจริง | `[แนบภาพ Screenshot 05: Delete Confirmation Modal]` |
| 6 | **การค้นหาและกรอง (Search & Filter)** | แสดงผลลัพธ์การค้นหาคำสำคัญร่วมกับการเลือกหมวดหมู่ | `[แนบภาพ Screenshot 06: Search & Category Filter]` |
| 7 | **มุมมองตาราง (Table View)** | แสดงข้อมูลข่าวทั้งหมดในรูปแบบตารางสไตล์ผู้ดูแลระบบ | `[แนบภาพ Screenshot 07: Editorial Table View]` |
