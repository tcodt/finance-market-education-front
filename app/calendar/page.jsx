import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const events = [
  {
    id: 1,
    title: "وبینار تحلیل هفتگی بازار",
    date: "۲۰ دی ۱۴۰۳",
    time: "۱۸:۰۰",
    type: "webinar",
  },
  {
    id: 2,
    title: "جلسه آموزش پرایس اکشن",
    date: "۲۲ دی ۱۴۰۳",
    time: "۲۰:۰۰",
    type: "class",
  },
  {
    id: 3,
    title: "آزمون پایان دوره مقدماتی",
    date: "۲۵ دی ۱۴۰۳",
    time: "۱۰:۰۰",
    type: "exam",
  },
];

export default function Calendar() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          تقویم
        </h1>
        <p className="text-[#8B8B8B]">رویدادها و کلاس‌های آینده</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card
            key={event.id}
            className="p-5 bg-white border-0 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#FFF8F3] flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-[#E45858]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1A1A1A] mb-1">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm text-[#8B8B8B]">
                  <span>{event.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
