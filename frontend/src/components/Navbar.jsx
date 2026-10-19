import React from "react";
import { Plus, LayoutGrid, Table, Newspaper, Calendar } from "lucide-react";

const Navbar = ({
  selectedCategory,
  onSelectCategory,
  onOpenCreateModal,
  viewMode,
  setViewMode,
  totalNewsCount,
}) => {
  const categories = [
    { id: "ทั้งหมด", label: "ข่าวทั้งหมด" },
    { id: "การศึกษา", label: "การศึกษา" },
    { id: "เทคโนโลยี", label: "เทคโนโลยี" },
    { id: "สังคม", label: "สังคม" },
  ];

  const today = new Intl.DateTimeFormat("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200/80 shadow-xs">
      {/* 1. Top Bar */}
      <div className="bg-[#000000] text-zinc-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-zinc-300 font-medium text-xs">
              วิชา 7153403 เทคโนโลยีการบริการเว็บ (ชุดโจทย์ 2: ข่าว)
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-xs">
            <span className="inline-flex items-center gap-1.5 font-light">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {today}
            </span>
            <span className="hidden sm:inline bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-300">
              รวม {totalNewsCount} ข่าว
            </span>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo Branding - Monochrome Luxury */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="bg-[#18181B] text-white px-4 py-2 rounded-xl font-black text-2xl tracking-tighter shadow-md shadow-zinc-950/20 flex items-center gap-2 border border-zinc-800">
                <Newspaper className="w-6 h-6 text-zinc-300 stroke-[2.2]" />
                <span className="tracking-tight font-serif">ข่าว</span>
              </div>
              <div className="ml-3 hidden sm:block">
                <div className="text-lg font-black tracking-tight text-[#18181B] uppercase leading-none font-serif">
                  ONLINE PORTAL
                </div>
                <div className="text-[11px] font-medium text-zinc-500 mt-1 tracking-wider">
                  ระบบจัดการข่าวสารออนไลน์
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons & View Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Switcher */}
            <div className="bg-[#F4F4F5] p-1 rounded-xl flex items-center border border-zinc-200">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="มุมมองการ์ดข่าว (Luxury Grid)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#18181B] text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">การ์ดข่าว</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                title="มุมมองตารางข้อมูล (Table View)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-[#18181B] text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span className="hidden md:inline">ตาราง</span>
              </button>
            </div>

            {/* Primary Button: #18181B (ดำเทา Charcoal Text: #FFFFFF), Hover: #27272A */}
            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white font-semibold text-sm shadow-md shadow-zinc-900/10 hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer shrink-0 border border-zinc-700"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>เพิ่มข่าวใหม่</span>
            </button>
          </div>
        </div>

        {/* Horizontal Category Bar */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-zinc-100 pt-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#18181B] text-white shadow-xs"
                    : "text-zinc-600 hover:bg-[#F4F4F5] hover:text-[#18181B]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
