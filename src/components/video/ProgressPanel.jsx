import React from 'react';
import { Check, Circle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const lessons = [
  { id: 1, title: 'مبانی بازارهای مالی', status: 'completed', duration: '۲۵ دقیقه' },
  { id: 2, title: 'آشنایی با فارکس و کریپتو', status: 'completed', duration: '۳۲ دقیقه' },
  { id: 3, title: 'روانشناسی معاملات', status: 'completed', duration: '۲۸ دقیقه' },
  { id: 4, title: 'مدیریت ریسک', status: 'current', duration: '۳۰ دقیقه' },
  { id: 5, title: 'استراتژی‌های پرایس اکشن', status: 'locked', duration: '۳۵ دقیقه' },
  { id: 6, title: 'تحلیل تکنیکال پیشرفته', status: 'locked', duration: '۴۰ دقیقه' },
  { id: 7, title: 'الگوهای کندل استیک', status: 'locked', duration: '۲۲ دقیقه' },
  { id: 8, title: 'سطوح حمایت و مقاومت', status: 'locked', duration: '۲۶ دقیقه' },
  { id: 9, title: 'اندیکاتورهای کاربردی', status: 'locked', duration: '۳۸ دقیقه' },
  { id: 10, title: 'استراتژی معاملاتی شخصی', status: 'locked', duration: '۴۵ دقیقه' },
];

export default function ProgressPanel() {
  const completed = lessons.filter(l => l.status === 'completed').length;
  const total = lessons.length;

  return (
    <div className="bg-white rounded-[20px] p-4 pt-2 shadow-[0_2px_20px_rgba(0,0,0,0.03)] sticky top-3 h-[calc(100vh-1.5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-[#1A1A1A]">پیشرفت شما</h3>
        <span className="text-xs text-[#999]">{completed}/{total}</span>
      </div>
      
      {/* Lessons List with connecting line */}
      <div className="relative overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {/* Vertical connecting line */}
        <div className="absolute right-[11px] top-1 bottom-1 w-[2px] bg-gradient-to-b from-[#E45858] via-[#E5E1DC] to-[#E5E1DC]" 
             style={{ 
               height: `${(lessons.length - 1) * 42}px`,
               background: `linear-gradient(to bottom, #E45858 0%, #E45858 ${(completed / total) * 100}%, #E5E1DC ${(completed / total) * 100}%, #E5E1DC 100%)`
             }} 
        />

        <div className="space-y-0">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="flex items-center gap-3 py-1.5 cursor-pointer group relative"
            >
              {/* Status Circle */}
              <div className="relative z-10 flex-shrink-0">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
                  lesson.status === 'completed' && "bg-[#E45858]",
                  lesson.status === 'current' && "bg-white border-[2.5px] border-[#E45858]",
                  lesson.status === 'locked' && "bg-white border-[1.5px] border-[#E5E1DC]"
                )}>
                  {lesson.status === 'completed' && (
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  )}
                </div>
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-[13px] leading-snug transition-colors",
                  lesson.status === 'completed' && "text-[#1A1A1A] font-medium",
                  lesson.status === 'current' && "text-[#1A1A1A] font-semibold",
                  lesson.status === 'locked' && "text-[#6E6E6E]"
                )}>
                  {lesson.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}