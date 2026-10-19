import React, { useState } from "react";
import { X, Calendar, User, Tag, FileText, Clock, Play } from "lucide-react";
import { parseVideoSource } from "../utils/videoHelper.js";

const NewsDetailModal = ({ isOpen, news, onClose }) => {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !news) return null;

  const defaultPlaceholder =
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80";
  const displayImage = !imageError && news.imageUrl ? news.imageUrl : defaultPlaceholder;

  // Parse video source (YouTube / MP4 / etc.)
  const videoInfo = parseVideoSource(news.videoUrl);

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-zinc-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Banner Section: Video Player or Image */}
        {videoInfo ? (
          // Video Player Container (YouTube iframe or HTML5 <video controls>)
          <div className="relative w-full aspect-video bg-black overflow-hidden shrink-0">
            {videoInfo.type === "youtube" ? (
              <iframe
                src={`${videoInfo.embedUrl}?rel=0&modestbranding=1`}
                title={news.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <video
                controls
                playsInline
                poster={displayImage}
                preload="metadata"
                className="w-full h-full object-contain bg-black"
              >
                <source src={videoInfo.url} type="video/mp4" />
                เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอจาก URL นี้
              </video>
            )}

            {/* Close button on top-right */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white/90 hover:text-white hover:bg-black transition-colors cursor-pointer backdrop-blur-sm border border-white/20"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          // Image Banner
          <div className="relative w-full h-56 sm:h-72 bg-zinc-900 overflow-hidden shrink-0">
            <img
              src={displayImage}
              alt={news.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none"></div>

            {/* Close button on image */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 transition-colors cursor-pointer backdrop-blur-sm border border-white/10"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on image */}
            <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2 pointer-events-none">
              <span className="px-3.5 py-1 rounded-full bg-[#F4F4F5] text-[#18181B] text-xs font-bold shadow-md">
                {news.category}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
                  news.status
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                    : "bg-zinc-900/80 text-zinc-300 border-zinc-700"
                }`}
              >
                {news.status ? "● เผยแพร่แล้ว" : "○ ฉบับร่าง"}
              </span>
              <span className="text-xs text-zinc-400 font-mono">#{news.id}</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Badges row if video was rendered */}
          {videoInfo && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#F4F4F5] text-[#18181B] text-xs font-bold border border-zinc-200">
                {news.category}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  news.status
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200"
                }`}
              >
                {news.status ? "● เผยแพร่แล้ว" : "○ ฉบับร่าง"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                <Play className="w-3 h-3 fill-red-600" /> วิดีโอประกอบข่าว
              </span>
              <span className="text-xs text-zinc-400 font-mono">#{news.id}</span>
            </div>
          )}

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] leading-snug tracking-tight font-serif">
            {news.title}
          </h2>

          {/* Meta Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-zinc-200 text-xs">
            <div className="flex items-center gap-2.5 text-zinc-700">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 text-zinc-800 flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">หมวดหมู่</div>
                <div className="font-bold text-zinc-900">{news.category}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-700">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 text-zinc-800 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">ผู้สื่อข่าว</div>
                <div className="font-bold text-zinc-900">{news.reporter}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-700">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 text-zinc-800 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">วันที่เผยแพร่</div>
                <div className="font-bold text-zinc-900 font-mono">{news.publishedDate}</div>
              </div>
            </div>
          </div>

          {/* Description Content */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              <FileText className="w-4 h-4 text-zinc-700" />
              เนื้อหาข่าวเต็ม
            </div>
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-zinc-200 text-sm sm:text-base leading-relaxed text-zinc-700 whitespace-pre-wrap font-sans font-light">
              {news.description}
            </div>
          </div>

          {/* Timestamps */}
          {(news.createdAt || news.updatedAt) && (
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-zinc-100 font-mono">
              {news.createdAt && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  สร้างเมื่อ: {new Date(news.createdAt).toLocaleString("th-TH")}
                </div>
              )}
              {news.updatedAt && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  แก้ไขล่าสุด: {new Date(news.updatedAt).toLocaleString("th-TH")}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-200 bg-[#F8FAFC] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal;
