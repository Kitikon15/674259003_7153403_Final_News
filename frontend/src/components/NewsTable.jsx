import React from "react";
import { Eye, Edit3, Trash2, Calendar, User, Play } from "lucide-react";

const NewsTable = ({ newsList, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xs border border-zinc-200/90 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-600">
              <th className="py-4 px-4 w-16 text-center">ID</th>
              <th className="py-4 px-4 w-20 text-center">สื่อ</th>
              <th className="py-4 px-4 min-w-[260px]">หัวข้อข่าว</th>
              <th className="py-4 px-4 min-w-[140px]">ผู้รับผิดชอบ</th>
              <th className="py-4 px-4 w-32 text-center">หมวดหมู่</th>
              <th className="py-4 px-4 w-36 text-center">วันที่เผยแพร่</th>
              <th className="py-4 px-4 w-28 text-center">สถานะ</th>
              <th className="py-4 px-4 w-36 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-sm">
            {newsList.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-zinc-50/80 transition-colors group"
              >
                {/* ID */}
                <td className="py-4 px-4 text-center font-mono font-semibold text-zinc-400">
                  #{item.id}
                </td>

                {/* Thumbnail Image / Media Indicator */}
                <td className="py-4 px-4 text-center">
                  <div
                    onClick={() => onView(item)}
                    className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 mx-auto border border-zinc-200 cursor-pointer shadow-2xs group-hover:border-zinc-400 transition-colors"
                  >
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
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}
                  </div>
                </td>

                {/* Title */}
                <td className="py-4 px-4">
                  <div
                    onClick={() => onView(item)}
                    className="font-bold text-[#18181B] group-hover:text-zinc-600 transition-colors line-clamp-2 cursor-pointer font-serif flex items-center gap-1.5"
                  >
                    <span>{item.title}</span>
                    {item.videoUrl && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 shrink-0 font-sans">
                        <Play className="w-2.5 h-2.5 fill-red-600" /> วิดีโอ
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-light">
                    {item.description}
                  </div>
                </td>

                {/* Reporter */}
                <td className="py-4 px-4 text-zinc-600">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{item.reporter}</span>
                  </div>
                </td>

                {/* Category Badge: #F4F4F5 ตัวหนังสือ #18181B */}
                <td className="py-4 px-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#F4F4F5] text-[#18181B] border border-zinc-200 shadow-2xs">
                    {item.category}
                  </span>
                </td>

                {/* Published Date */}
                <td className="py-4 px-4 text-center text-zinc-600">
                  <div className="inline-flex items-center gap-1 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    {item.publishedDate}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4 text-center">
                  {item.status ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      เผยแพร่
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                      ฉบับร่าง
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onView(item)}
                      title="ดูรายละเอียด"
                      className="p-2 rounded-xl bg-[#F4F4F5] hover:bg-zinc-200 text-zinc-700 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      title="แก้ไขข่าว"
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      title="ลบข่าว"
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsTable;
