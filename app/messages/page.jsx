import { MessageSquare, Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Messages() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          پیام‌ها
        </h1>
        <p className="text-[#8B8B8B]">پیام‌های خود را مدیریت کنید</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E0D5] p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-[#F5EDE3] rounded-full flex items-center justify-center">
          <MessageSquare className="w-10 h-10 text-[#E45858]" />
        </div>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">
          پیامی وجود ندارد
        </h2>
        <p className="text-[#8B8B8B]">هنوز پیامی دریافت نکرده‌اید</p>
      </div>
    </div>
  );
}
