import { Award, Download, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const certificates = [
  {
    id: 1,
    title: "گواهینامه دوره مقدماتی بازار مالی",
    date: "۱۰ آذر ۱۴۰۳",
    instructor: "استاد میلاد رضایی",
    status: "completed",
  },
  {
    id: 2,
    title: "گواهینامه تحلیل تکنیکال مقدماتی",
    date: "۲۵ آبان ۱۴۰۳",
    instructor: "استاد سارا احمدی",
    status: "completed",
  },
];

export default function Certificates() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          گواهینامه‌ها
        </h1>
        <p className="text-[#8B8B8B]">گواهینامه‌های دریافت شده شما</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <Card
            key={cert.id}
            className="p-6 bg-white border-0 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E45858] to-[#ff7b7b] flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="bg-green-100 text-green-700 mb-2">
                  دریافت شده
                </Badge>
                <h3 className="font-bold text-[#1A1A1A]">{cert.title}</h3>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm text-[#8B8B8B]">
              <p>تاریخ صدور: {cert.date}</p>
              <p>مدرس: {cert.instructor}</p>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl gap-2"
              >
                <Download className="w-4 h-4" />
                دانلود
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#E8E0D5] rounded-xl gap-2 hover:border-[#E45858] hover:text-[#E45858]"
              >
                <ExternalLink className="w-4 h-4" />
                مشاهده
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
