import React from "react";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";

const SearchFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  onReset,
  totalResults,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-zinc-200/90 p-4 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* ช่อง Search */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4 text-zinc-600" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาหัวข้อข่าวสาร..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all bg-[#F8FAFC] hover:bg-white placeholder:text-zinc-400 text-zinc-800"
          />
        </div>

        {/* Dropdown กรองหมวดหมู่ */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all bg-[#F8FAFC] hover:bg-white cursor-pointer text-zinc-800 font-medium"
            >
              <option value="ทั้งหมด">หมวดหมู่ทั้งหมด</option>
              <option value="การศึกษา">การศึกษา</option>
              <option value="เทคโนโลยี">เทคโนโลยี</option>
              <option value="สังคม">สังคม</option>
            </select>
          </div>

          {/* ปุ่มล้างเงื่อนไข */}
          <button
            type="button"
            onClick={onReset}
            title="ล้างคำค้นหาและหมวดหมู่"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 bg-[#F4F4F5] hover:bg-zinc-200 text-zinc-700 text-sm font-medium transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ล้างเงื่อนไข</span>
          </button>
        </div>
      </div>

      {/* บรรทัดสถานะตัวกรอง */}
      <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span>พบข่าวที่ตรงกับเงื่อนไข:</span>
          {/* ป้ายหมวดหมู่ Category Badge: พื้นหลัง #F4F4F5 ตัวหนังสือ #18181B */}
          <span className="bg-[#F4F4F5] text-[#18181B] border border-zinc-200 font-bold px-2.5 py-0.5 rounded-md text-xs font-mono">
            {totalResults} ข่าว
          </span>
        </div>

        {(search || (category && category !== "ทั้งหมด")) && (
          <span className="text-zinc-700 font-medium flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-zinc-600" />
            กำลังกรอง: {category !== "ทั้งหมด" ? `หมวดหมู่ "${category}"` : ""} {search ? `คำค้น "${search}"` : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
