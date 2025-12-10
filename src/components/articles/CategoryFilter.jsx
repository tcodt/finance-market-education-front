import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  'همه',
  'فارکس',
  'کریپتو',
  'بورس ایران',
  'سهام جهانی',
  'روانشناسی معامله‌گری',
];

export default function CategoryFilter({ activeCategory, onCategoryChange, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
              activeCategory === category
                ? "bg-[#000000] text-white shadow-lg shadow-[#000000]/25"
                : "bg-white text-[#000000] border border-[#D9D9D9] hover:border-[#000000] hover:text-[#000000]"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Search */}
      <div className="relative w-full md:w-72">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6E6E]" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجوی مقاله..."
          className="pr-10 border-[#D9D9D9] rounded-xl focus:border-[#000000] focus:ring-[#000000]/20 bg-white"
          dir="rtl"
        />
      </div>
    </div>
  );
}