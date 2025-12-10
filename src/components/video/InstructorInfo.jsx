import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, BookOpen } from 'lucide-react';

export default function InstructorInfo({ 
  name = 'استاد میلاد رضایی',
  email = 'milad@example.com',
  avatar,
  rating = 4.8,
  duration = '۶ هفته',
  lessons = 14
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white rounded-2xl shadow-sm border border-[#E5E1DC]">
      {/* Instructor */}
      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14 border-2 border-[#E45858]/20">
          <AvatarImage src={avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"} />
          <AvatarFallback className="bg-[#E45858] text-white font-bold">م</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-bold text-[#1A1A1A] text-lg">{name}</h4>
          <p className="text-sm text-[#6E6E6E]">{email}</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFF8F3] flex items-center justify-center">
            <Star className="w-5 h-5 text-[#E45858] fill-[#E45858]" />
          </div>
          <div>
            <p className="font-bold text-[#1A1A1A]">{rating}</p>
            <p className="text-xs text-[#6E6E6E]">امتیاز</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFF8F3] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#E45858]" />
          </div>
          <div>
            <p className="font-bold text-[#1A1A1A]">{duration}</p>
            <p className="text-xs text-[#6E6E6E]">مدت دوره</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFF8F3] flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#E45858]" />
          </div>
          <div>
            <p className="font-bold text-[#1A1A1A]">{lessons} جلسه</p>
            <p className="text-xs text-[#6E6E6E]">تعداد جلسات</p>
          </div>
        </div>
      </div>
    </div>
  );
}