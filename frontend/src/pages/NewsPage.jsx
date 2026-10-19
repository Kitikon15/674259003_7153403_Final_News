import React, { useState, useEffect, useCallback } from "react";
import { newsService } from "../services/newsService.js";
import alertService from "../service/alertService.js";
import Navbar from "../components/Navbar.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import NewsHeroCard from "../components/NewsHeroCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import NewsTable from "../components/NewsTable.jsx";
import NewsDetailModal from "../components/NewsDetailModal.jsx";
import NewsFormModal from "../components/NewsFormModal.jsx";
import DeleteConfirmModal from "../components/DeleteConfirmModal.jsx";
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  Inbox,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Cpu,
  Users,
  ChevronRight,
  Play,
} from "lucide-react";

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // เงื่อนไขการค้นหาและกรอง
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");

  // มุมมองการแสดงผล ('grid' = การ์ดข่าวสไตล์สำนักข่าว | 'table' = ตาราง)
  const [viewMode, setViewMode] = useState("grid");

  // Modal States
  const [selectedNews, setSelectedNews] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [formMode, setFormMode] = useState("create"); // "create" | "edit"
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ดึงข้อมูลข่าวสารจาก API Backend
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const data = await newsService.getAllNews(search, category);
      setNewsList(data);
    } catch (err) {
      console.error("Fetch news error:", err);
      setApiError(
        "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ Backend ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์เปิดอยู่ที่ http://localhost:5000"
      );
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // ล้างเงื่อนไขตัวกรอง
  const handleResetFilter = () => {
    setSearch("");
    setCategory("ทั้งหมด");
  };

  // ดูรายละเอียดข่าว
  const handleOpenDetail = (news) => {
    setSelectedNews(news);
    setIsDetailOpen(true);
  };

  // เปิดฟอร์มเพิ่มข่าว
  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedNews(null);
    setIsFormOpen(true);
  };

  // เปิดฟอร์มแก้ไขข่าว
  const handleOpenEdit = (news) => {
    setFormMode("edit");
    setSelectedNews(news);
    setIsFormOpen(true);
  };

  // ส่งข้อมูลฟอร์ม (รองรับทั้ง imageUrl และ videoUrl)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (formMode === "create") {
        await newsService.createNews(formData);
        alertService.success("เพิ่มข้อมูลข่าวสารเรียบร้อยแล้ว");
      } else {
        await newsService.updateNews(selectedNews.id, formData);
        alertService.success("แก้ไขข้อมูลข่าวสารเรียบร้อยแล้ว");
      }
      setIsFormOpen(false);
      setSelectedNews(null);
      fetchNews();
    } catch (err) {
      console.error("Save news error:", err);
      const msg =
        err.response?.data?.errors?.join(", ") ||
        err.response?.data?.message ||
        "เกิดข้อผิดพลาดในการบันทึกข้อมูลข่าว";
      alertService.error(msg, "บันทึกข้อมูลไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  };

  // เปิด Modal ยืนยันการลบ
  const handleOpenDelete = (news) => {
    setSelectedNews(news);
    setIsDeleteOpen(true);
  };

  // ยืนยันการลบ
  const handleConfirmDelete = async () => {
    if (!selectedNews) return;
    setIsDeleting(true);
    try {
      await newsService.deleteNews(selectedNews.id);
      setIsDeleteOpen(false);
      setSelectedNews(null);
      alertService.success("ลบข้อมูลข่าวเรียบร้อยแล้ว");
      fetchNews();
    } catch (err) {
      console.error("Delete news error:", err);
      const msg =
        err.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูลข่าว";
      alertService.error(msg, "ไม่สามารถลบข่าวได้");
    } finally {
      setIsDeleting(false);
    }
  };

  // การแยกข่าวสำหรับ Hero Section (ข่าวเด่น 1 รายการ) และ Grid Section (ข่าวรอง)
  const heroNews = newsList.length > 0 ? newsList[0] : null;
  const remainingNews = newsList.length > 1 ? newsList.slice(1) : [];

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* 1. Header & Navigation Bar */}
      <Navbar
        selectedCategory={category}
        onSelectCategory={(cat) => setCategory(cat)}
        onOpenCreateModal={handleOpenCreate}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalNewsCount={newsList.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Quick Category Stats Banner - Monochrome Luxury */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div
            onClick={() => setCategory("ทั้งหมด")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              category === "ทั้งหมด"
                ? "bg-white border-zinc-900 shadow-md shadow-zinc-900/10"
                : "bg-white/80 border-zinc-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18181B] text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">หมวดหมู่</div>
                <div className="text-sm font-bold text-zinc-900">ข่าวทั้งหมด</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-[#F4F4F5] text-[#18181B] px-2.5 py-0.5 rounded-full border border-zinc-200">
              {newsList.length}
            </span>
          </div>

          <div
            onClick={() => setCategory("การศึกษา")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              category === "การศึกษา"
                ? "bg-white border-zinc-900 shadow-md shadow-zinc-900/10"
                : "bg-white/80 border-zinc-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">หมวดหมู่</div>
                <div className="text-sm font-bold text-zinc-900">การศึกษา</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </div>

          <div
            onClick={() => setCategory("เทคโนโลยี")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              category === "เทคโนโลยี"
                ? "bg-white border-zinc-900 shadow-md shadow-zinc-900/10"
                : "bg-white/80 border-zinc-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">หมวดหมู่</div>
                <div className="text-sm font-bold text-zinc-900">เทคโนโลยี</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </div>

          <div
            onClick={() => setCategory("สังคม")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              category === "สังคม"
                ? "bg-white border-zinc-900 shadow-md shadow-zinc-900/10"
                : "bg-white/80 border-zinc-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">หมวดหมู่</div>
                <div className="text-sm font-bold text-zinc-900">สังคม</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          onReset={handleResetFilter}
          totalResults={newsList.length}
        />

        {/* Error State Banner */}
        {apiError && (
          <div className="mb-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm font-medium">{apiError}</p>
            </div>
            <button
              type="button"
              onClick={fetchNews}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-900 hover:bg-zinc-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              ลองใหม่อีกครั้ง
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-zinc-600">
            <Loader2 className="w-10 h-10 animate-spin text-[#18181B] mb-3" />
            <p className="text-base font-semibold text-zinc-800">
              กำลังโหลดข้อมูลสำนักข่าว...
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              กำลังประสานข้อมูลกับ RESTful API
            </p>
          </div>
        ) : newsList.length === 0 ? (
          /* Empty State */
          <div className="py-20 px-4 bg-white rounded-3xl border border-zinc-200 text-center shadow-xs max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-600 flex items-center justify-center mx-auto mb-4 border border-zinc-200">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2 font-serif">
              ไม่พบข้อมูลข่าวสาร
            </h3>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed font-light">
              ไม่มีข่าวสารที่ตรงกับคำค้นหาหรือหมวดหมู่ที่เลือกในขณะนี้ ลองค้นหาด้วยคำอื่น หรือกดปุ่มด้านล่างเพื่อล้างเงื่อนไข
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilter}
                className="px-5 py-2.5 rounded-xl bg-[#F4F4F5] hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition-all cursor-pointer"
              >
                ล้างเงื่อนไขทั้งหมด
              </button>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="px-5 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                + เพิ่มข่าวสารแรก
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* ============================================================== */
          /* NEWS PORTAL VIEW: 2. Hero Section + 3. News Grid Section       */
          /* ============================================================== */
          <div className="space-y-10">
            {/* 2. Hero Section (Hero Highlight Card ทางซ้าย + กล่องอัปเดตทางขวา) */}
            {heroNews && !search && (
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* ข่าวเด่นไฮไลต์ (Hero Card) ขนาดใหญ่พร้อมเครื่องเล่นวิดีโอ/รูปภาพ */}
                <div className="lg:col-span-8 flex">
                  <div className="w-full flex">
                    <NewsHeroCard
                      news={heroNews}
                      onView={handleOpenDetail}
                      onEdit={handleOpenEdit}
                      onDelete={handleOpenDelete}
                    />
                  </div>
                </div>

                {/* กล่อง "ข่าวอัปเดตล่าสุด" ทางด้านขวาของ Hero */}
                <div className="lg:col-span-4 bg-white rounded-3xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-zinc-100">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm font-serif">
                        <TrendingUp className="w-4 h-4 text-zinc-800" />
                        <span>ข่าวอัปเดตล่าสุด</span>
                      </div>
                      <span className="text-[11px] font-semibold text-zinc-800 bg-[#F4F4F5] border border-zinc-200 px-2.5 py-0.5 rounded-full font-mono">
                        Live Feed
                      </span>
                    </div>

                    <div className="divide-y divide-zinc-100">
                      {newsList.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenDetail(item)}
                          className="py-3 group cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            {/* Mini Thumbnail */}
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                              <img
                                src={
                                  item.imageUrl ||
                                  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100&auto=format&fit=crop&q=80"
                                }
                                alt={item.title}
                                onError={(e) => {
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100&auto=format&fit=crop&q=80";
                                }}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {item.videoUrl && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <Play className="w-3.5 h-3.5 text-white fill-white" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-1">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4F4F5] text-[#18181B] border border-zinc-200 inline-block">
                                  {item.category}
                                </span>
                                {item.videoUrl && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 inline-flex items-center gap-0.5">
                                    <Play className="w-2.5 h-2.5 fill-red-600" /> วิดีโอ
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-2 leading-snug font-serif">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-400 font-mono">
                                <span className="truncate">{item.reporter}</span>
                                <span>•</span>
                                <span>{item.publishedDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={handleOpenCreate}
                      className="w-full py-2.5 rounded-xl bg-[#F4F4F5] hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-all border border-zinc-200 text-center cursor-pointer"
                    >
                      + เขียนและเผยแพร่ข่าวใหม่
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* 3. News Grid Section (การ์ดข่าวรองใน Layout 3 คอลัมน์) */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-6 bg-[#18181B] rounded-full"></div>
                  <h3 className="text-xl font-extrabold text-[#18181B] tracking-tight font-serif">
                    {search
                      ? `ผลการค้นหา: "${search}"`
                      : category !== "ทั้งหมด"
                      ? `รวมข่าวหมวดหมู่ "${category}"`
                      : "ข่าวสารทั้งหมด (Editorial Feed)"}
                  </h3>
                  <span className="text-xs font-bold text-zinc-700 bg-zinc-200 px-2.5 py-0.5 rounded-full font-mono ml-1">
                    {newsList.length}
                  </span>
                </div>

                <div className="text-xs text-zinc-400 hidden sm:flex items-center gap-1.5 font-light">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                  <span>คลิกที่การ์ดเพื่อดูรายละเอียดฉบับเต็ม</span>
                </div>
              </div>

              {/* Grid 3 คอลัมน์ */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(search ? newsList : remainingNews.length > 0 ? remainingNews : newsList).map(
                  (item) => (
                    <NewsCard
                      key={item.id}
                      news={item}
                      onView={handleOpenDetail}
                      onEdit={handleOpenEdit}
                      onDelete={handleOpenDelete}
                    />
                  )
                )}
              </div>
            </section>
          </div>
        ) : (
          /* ============================================================== */
          /* TABLE VIEW: มุมมองตารางสำหรับตรวจสอบและจัดการข้อมูล        */
          /* ============================================================== */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#18181B] flex items-center gap-2 font-serif">
                <span>ตารางข้อมูลข่าวสารทั้งหมด</span>
                <span className="text-xs font-mono px-2.5 py-0.5 bg-[#18181B] text-white rounded-full font-bold">
                  {newsList.length} รายการ
                </span>
              </h3>
            </div>
            <NewsTable
              newsList={newsList}
              onView={handleOpenDetail}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </div>
        )}
      </main>

      {/* Footer - Monochrome Luxury (#000000 / #18181B) */}
      <footer className="bg-[#000000] text-zinc-400 text-xs py-10 mt-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-900 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="bg-[#18181B] border border-zinc-800 text-white px-3.5 py-1 rounded-xl font-black text-xl tracking-tighter font-serif">
                NEWS
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wide font-serif">
                  ONLINE NEWS PORTAL
                </div>
                <div className="text-zinc-500 text-[11px] font-light">
                  Web Service Technology Final Examination (Course 7153403)
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-zinc-400 font-medium text-xs">
              <button
                type="button"
                onClick={() => setCategory("ทั้งหมด")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                ข่าวทั้งหมด
              </button>
              <button
                type="button"
                onClick={() => setCategory("การศึกษา")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                การศึกษา
              </button>
              <button
                type="button"
                onClick={() => setCategory("เทคโนโลยี")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                เทคโนโลยี
              </button>
              <button
                type="button"
                onClick={() => setCategory("สังคม")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                สังคม
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-500 text-[11px] text-center sm:text-left font-light">
            <p>
              © 2026 สำนักข่าวออนไลน์. รายวิชา 7153403 เทคโนโลยีการบริการเว็บ มหาวิทยาลัยราชภัฏนครปฐม (NPRU).
            </p>
            <p className="font-mono">Fullstack Express.js + Sequelize + React + Vite</p>
          </div>
        </div>
      </footer>

      {/* CRUD Modals */}
      <NewsDetailModal
        isOpen={isDetailOpen}
        news={selectedNews}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedNews(null);
        }}
      />

      <NewsFormModal
        isOpen={isFormOpen}
        mode={formMode}
        initialData={selectedNews}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedNews(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        news={selectedNews}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedNews(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default NewsPage;
