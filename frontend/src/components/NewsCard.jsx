import React, { useState } from "react";
import { Eye, Edit3, Trash2, Calendar, User, Play } from "lucide-react";

const NewsCard = ({ news, onView, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  // Default fallback image by category or generic luxury editorial
  const defaultFallback =
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80";
  const displayImage = !imageError && news.imageUrl ? news.imageUrl : defaultFallback;

  return (
    <article className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* News Image Display */}
        <div
          className="relative w-full aspect-16/9 bg-zinc-100 overflow-hidden cursor-pointer"
          onClick={() => onView(news)}
        >
          <img
            src={displayImage}
            alt={news.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* ป้ายหมวดหมู่ (Category Badge): พื้นหลัง #F4F4F5 ตัวหนังสือ #18181B */}
          <div className="absolute top-3.5 left-3.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4F4F5] text-[#18181B] shadow-sm border border-zinc-200/80 tracking-wide">
              {news.category}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3.5 right-3.5">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md ${
                news.status
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                  : "bg-zinc-900/80 text-zinc-300 border border-zinc-700"
              }`}
            >
              {news.status ? "● เผยแพร่" : "○ ฉบับร่าง"}
            </span>
          </div>

          {/* Video indicator badge */}
          {news.videoUrl && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[11px] font-bold shadow-md backdrop-blur-sm">
                <Play className="w-2.5 h-2.5 fill-white" /> วิดีโอ
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
            <span>#{news.id}</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Calendar className="w-3 h-3 text-zinc-400" />
              {news.publishedDate}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onView(news)}
            className="text-base sm:text-lg font-bold text-[#18181B] group-hover:text-zinc-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2 font-serif"
          >
            {news.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2 leading-relaxed font-light">
            {news.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Meta Info & Actions */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#F8FAFC] border-t border-zinc-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 truncate max-w-[140px]">
          <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate font-medium">{news.reporter}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onView(news)}
            title="ดูรายละเอียดข่าว"
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-400 hover:bg-zinc-50 transition-all cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(news)}
            title="แก้ไขข่าว"
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50/50 transition-all cursor-pointer shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(news)}
            title="ลบข่าว"
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-rose-700 hover:border-rose-300 hover:bg-rose-50/50 transition-all cursor-pointer shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
