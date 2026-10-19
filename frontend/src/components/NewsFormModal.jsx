import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  AlertCircle,
  Newspaper,
  Image as ImageIcon,
  Video,
  Play,
} from "lucide-react";
import VideoPlayer from "./VideoPlayer.jsx";

const NewsFormModal = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    reporter: "",
    category: "การศึกษา",
    publishedDate: new Date().toISOString().split("T")[0],
    description: "",
    status: true,
    imageUrl: "",
    videoUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        title: initialData.title || "",
        reporter: initialData.reporter || "",
        category: initialData.category || "การศึกษา",
        publishedDate:
          initialData.publishedDate || new Date().toISOString().split("T")[0],
        description: initialData.description || "",
        status: initialData.status !== undefined ? initialData.status : true,
        imageUrl: initialData.imageUrl || "",
        videoUrl: initialData.videoUrl || "",
      });
    } else {
      setFormData({
        title: "",
        reporter: "",
        category: "การศึกษา",
        publishedDate: new Date().toISOString().split("T")[0],
        description: "",
        status: true,
        imageUrl: "",
        videoUrl: "",
      });
    }
    setErrors({});
    setPreviewError(false);
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    // Title
    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "กรุณาระบุหัวข้อข่าว (ห้ามเป็นค่าว่างหรือเฉพาะ space)";
    } else if (formData.title.trim().length > 150) {
      newErrors.title = "หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร";
    }

    // Reporter
    if (!formData.reporter || formData.reporter.trim() === "") {
      newErrors.reporter = "กรุณาระบุชื่อผู้รับผิดชอบ (ห้ามเป็นค่าว่างหรือเฉพาะ space)";
    } else if (formData.reporter.trim().length > 100) {
      newErrors.reporter = "ชื่อผู้รับผิดชอบต้องมีความยาวไม่เกิน 100 ตัวอักษร";
    }

    // Category
    if (!["การศึกษา", "เทคโนโลยี", "สังคม"].includes(formData.category)) {
      newErrors.category = "กรุณาเลือกหมวดหมู่ให้ถูกต้อง";
    }

    // Published Date
    if (!formData.publishedDate) {
      newErrors.publishedDate = "กรุณาระบุวันที่เผยแพร่";
    }

    // Description
    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "กรุณาระบุรายละเอียดข่าว (ห้ามเป็นค่าว่างหรือเฉพาะ space)";
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = "รายละเอียดข่าวต้องมีความยาวไม่เกิน 2,000 ตัวอักษร";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        imageUrl: formData.imageUrl?.trim() || null,
        videoUrl: formData.videoUrl?.trim() || null,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Monochrome Luxury #18181B */}
        <div className="bg-[#18181B] px-6 py-4.5 text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif tracking-tight">
                {mode === "edit" ? "แก้ไขข้อมูลข่าวสาร" : "เพิ่มข้อมูลข่าวสารใหม่"}
              </h2>
              <p className="text-[11px] text-zinc-400">
                ระบบจัดการเนื้อหาสำนักข่าวออนไลน์
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Title */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                หัวข้อข่าว (1-150 ตัวอักษร) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-zinc-400 font-mono">
                {formData.title.length}/150
              </span>
            </div>
            <input
              type="text"
              maxLength={150}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="พาดหัวข่าวสำคัญ..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                  : "border-zinc-300 focus:ring-zinc-900/20 focus:border-zinc-900 bg-white"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Reporter & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Reporter */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  ผู้รับผิดชอบ <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {formData.reporter.length}/100
                </span>
              </div>
              <input
                type="text"
                maxLength={100}
                value={formData.reporter}
                onChange={(e) =>
                  setFormData({ ...formData, reporter: e.target.value })
                }
                placeholder="ชื่อ-นามสกุล ผู้สื่อข่าว..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.reporter
                    ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                    : "border-zinc-300 focus:ring-zinc-900/20 focus:border-zinc-900 bg-white"
                }`}
              />
              {errors.reporter && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.reporter}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1">
                หมวดหมู่ <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 bg-white cursor-pointer text-zinc-800 font-medium"
              >
                <option value="การศึกษา">การศึกษา</option>
                <option value="เทคโนโลยี">เทคโนโลยี</option>
                <option value="สังคม">สังคม</option>
              </select>
            </div>
          </div>

          {/* PublishedDate & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Published Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1">
                วันที่เผยแพร่ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.publishedDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishedDate: e.target.value })
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.publishedDate
                    ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                    : "border-zinc-300 focus:ring-zinc-900/20 focus:border-zinc-900 bg-white"
                }`}
              />
              {errors.publishedDate && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.publishedDate}
                </p>
              )}
            </div>

            {/* Status Radio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-2">
                สถานะข่าว:
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-zinc-800 cursor-pointer">
                  <input
                    type="radio"
                    name="newsStatus"
                    checked={formData.status === true}
                    onChange={() => setFormData({ ...formData, status: true })}
                    className="text-zinc-900 focus:ring-zinc-900 cursor-pointer"
                  />
                  <span>เผยแพร่ (Publish)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-zinc-800 cursor-pointer">
                  <input
                    type="radio"
                    name="newsStatus"
                    checked={formData.status === false}
                    onChange={() => setFormData({ ...formData, status: false })}
                    className="text-zinc-900 focus:ring-zinc-900 cursor-pointer"
                  />
                  <span>ฉบับร่าง (Draft)</span>
                </label>
              </div>
            </div>
          </div>

          {/* ฟิลด์ URL รูปภาพประกอบข่าว (Image URL) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-zinc-600" />
                URL รูปภาพประกอบข่าว (Image URL)
              </label>
              <span className="text-[11px] text-zinc-400">
                (ไม่ระบุจะใช้ภาพเริ่มต้น)
              </span>
            </div>
            <input
              type="url"
              maxLength={500}
              value={formData.imageUrl}
              onChange={(e) => {
                setFormData({ ...formData, imageUrl: e.target.value });
                setPreviewError(false);
              }}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 bg-white font-mono text-xs"
            />

            {/* Live Image Preview */}
            {formData.imageUrl && formData.imageUrl.trim() !== "" && (
              <div className="mt-2.5 p-2 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                  ตัวอย่างรูปภาพประกอบ (Live Preview):
                </div>
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-zinc-200">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    onError={() => setPreviewError(true)}
                    className="w-full h-full object-cover"
                  />
                  {previewError && (
                    <div className="absolute inset-0 bg-zinc-900/80 text-white flex items-center justify-center text-xs p-2 text-center">
                      ⚠️ ไม่สามารถโหลดรูปภาพจาก URL นี้ได้ (ระบบจะใช้ภาพ Fallback แทน)
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ฟิลด์ URL วิดีโอประกอบข่าว (Video URL / YouTube) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-zinc-600" />
                URL วิดีโอประกอบข่าว (YouTube / Video URL)
              </label>
              <span className="text-[11px] text-zinc-400">
                (ไม่บังคับ - รองรับ YouTube หรือ MP4)
              </span>
            </div>
            <input
              type="url"
              maxLength={500}
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              placeholder="https://www.youtube.com/watch?v=... หรือ https://youtu.be/..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 bg-white font-mono text-xs"
            />

            {/* Live Video Preview */}
            {formData.videoUrl && formData.videoUrl.trim() !== "" && (
              <div className="mt-2.5 p-2 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Play className="w-3 h-3 text-red-500 fill-red-500" />
                  ตัวอย่างวิดีโอ (Live Video Preview):
                </div>
                <div className="rounded-xl overflow-hidden max-h-48 border border-zinc-300">
                  <VideoPlayer
                    videoUrl={formData.videoUrl}
                    posterUrl={formData.imageUrl}
                    title="Live Video Preview"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                รายละเอียดข่าว (1-2,000 ตัวอักษร) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-zinc-400 font-mono">
                {formData.description.length}/2000
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={2000}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="กรอกเนื้อหาข่าวสารฉบับเต็ม..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-y ${
                errors.description
                  ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                  : "border-zinc-300 focus:ring-zinc-900/20 focus:border-zinc-900 bg-white"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Footer Buttons: #18181B / #27272A */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 text-sm font-semibold transition-all cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-bold shadow-md shadow-zinc-900/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer border border-zinc-700"
            >
              <Save className="w-4 h-4" />
              {isSubmitting
                ? "กำลังบันทึก..."
                : mode === "edit"
                ? "บันทึกการแก้ไข"
                : "บันทึกข่าว"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsFormModal;
