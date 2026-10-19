import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteConfirmModal = ({
  isOpen,
  news,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !news) return null;

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-zinc-200 p-6 sm:p-7 text-center transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <AlertTriangle className="w-8 h-8 text-rose-600" />
        </div>

        <h3 className="text-xl font-bold text-zinc-900 mb-2 font-serif">
          ยืนยันการลบข้อมูลข่าวสาร
        </h3>

        <p className="text-sm text-zinc-500 mb-4 leading-relaxed font-light">
          คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้ออกจากระบบอย่างถาวร?
        </p>

        {/* กล่องแสดงชื่อข่าวที่จะลบเสมอตามข้อกำหนด */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-4 text-left">
          <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-mono">
            หัวข้อข่าวที่จะถูกลบ:
          </div>
          <div className="text-sm font-bold text-zinc-900 line-clamp-2 font-serif">
            "{news.title}"
          </div>
          <div className="text-xs text-zinc-500 mt-2 flex items-center justify-between pt-2 border-t border-zinc-200/60 font-mono">
            <span>หมวดหมู่: {news.category}</span>
            <span>รหัสข่าว: #{news.id}</span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 mb-6 font-light">
          * หากคุณกดยกเลิก ข้อมูลข่าวนี้จะไม่ถูกลบออกจากฐานข้อมูล
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-1/2 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 text-sm font-bold transition-all cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-1/2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md shadow-rose-600/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "กำลังลบ..." : "ยืนยันลบข่าว"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
