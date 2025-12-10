"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, ThumbsUp, Reply } from "lucide-react";

const sampleComments = [
  {
    id: 1,
    author: "علی محمدی",
    initials: "ع",
    date: "۲ روز پیش",
    text: "آموزش بسیار عالی بود. مفاهیم پایه‌ای به خوبی توضیح داده شده و مثال‌های کاربردی خیلی کمک کننده بودن.",
    likes: 12,
    replies: [
      {
        id: 11,
        author: "سارا احمدی",
        initials: "س",
        date: "۱ روز پیش",
        text: "کاملاً موافقم. من هم خیلی استفاده کردم.",
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    author: "مریم حسینی",
    initials: "م",
    date: "۵ روز پیش",
    text: "ممنون از استاد عزیز. آیا جلسات بیشتری در مورد تحلیل تکنیکال پیشرفته خواهید داشت؟",
    likes: 8,
    replies: [],
  },
  {
    id: 3,
    author: "رضا کریمی",
    initials: "ر",
    date: "۱ هفته پیش",
    text: "بخش مدیریت ریسک فوق‌العاده بود. لطفاً یک دوره جداگانه برای این موضوع هم قرار بدید.",
    likes: 15,
    replies: [],
  },
];

export default function Comments({ type = "video" }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(sampleComments);

  const handleSubmit = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "کاربر",
      initials: "ک",
      date: "همین الان",
      text: comment,
      likes: 0,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC]">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-[#E45858]" />
        <h3 className="text-lg font-bold text-[#1A1A1A]">نظرات کاربران</h3>
        <span className="text-sm text-[#6E6E6E]">({comments.length} نظر)</span>
      </div>

      {/* Comment Form */}
      <div className="mb-8">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="نظر خود را بنویسید..."
          className="min-h-[100px] resize-none border-[#E5E1DC] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20 text-right"
          dir="rtl"
        />
        <div className="flex justify-start mt-3">
          <Button
            onClick={handleSubmit}
            className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6 gap-2"
          >
            <Send className="w-4 h-4" />
            ارسال نظر
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((item) => (
          <div key={item.id} className="group">
            <div className="flex gap-4">
              <Avatar className="w-11 h-11 bg-gradient-to-br from-[#E45858] to-[#ff7b7b] flex-shrink-0">
                <AvatarFallback className="bg-transparent text-white font-medium">
                  {item.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-[#1A1A1A]">
                    {item.author}
                  </span>
                  <span className="text-sm text-[#6E6E6E]">{item.date}</span>
                </div>
                <p className="text-[#1A1A1A] leading-relaxed mb-3">
                  {item.text}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-sm text-[#6E6E6E] hover:text-[#E45858] transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-[#6E6E6E] hover:text-[#E45858] transition-colors">
                    <Reply className="w-4 h-4" />
                    <span>پاسخ</span>
                  </button>
                </div>

                {/* Replies */}
                {item.replies.length > 0 && (
                  <div className="mt-4 mr-6 pr-6 border-r-2 border-[#E5E1DC] space-y-4">
                    {item.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="w-9 h-9 bg-gradient-to-br from-[#8B8B8B] to-[#a8a8a8]">
                          <AvatarFallback className="bg-transparent text-white text-sm">
                            {reply.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-[#1A1A1A]">
                              {reply.author}
                            </span>
                            <span className="text-xs text-[#6E6E6E]">
                              {reply.date}
                            </span>
                          </div>
                          <p className="text-sm text-[#1A1A1A] leading-relaxed">
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
