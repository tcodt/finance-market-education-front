"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, User } from "lucide-react";

import { useComments, usePostComment } from "@/hooks/useComments";

export default function Comments({ type, id, slug }) {
  const [comment, setComment] = useState("");

  // ✅ گرفتن لیست کامنت‌ها
  const { data = [], isLoading } = useComments({ type, id, slug });

  // ✅ ارسال کامنت
  const { mutate: submitComment, isPending } = usePostComment({
    type,
    id,
    slug,
  });

  const handleSubmit = () => {
    if (!comment.trim()) return;

    submitComment(
      {
        parent: null,
        content: comment,
      },
      {
        onSuccess: () => setComment(""),
      }
    );
  };

  if (isLoading) {
    return <div className="p-6 text-center">در حال بارگذاری نظرات...</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-[#E45858]" />
        <h3 className="text-lg font-bold text-[#1A1A1A]">نظرات کاربران</h3>
        <span className="text-sm text-[#6E6E6E]">({data.length} نظر)</span>
      </div>

      {/* Form */}
      <div className="mb-8">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="نظر خود را بنویسید..."
          className="min-h-[100px] resize-none border-[#E5E1DC] rounded-xl"
          dir="rtl"
        />
        <div className="flex justify-start mt-3">
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6 gap-2"
          >
            <Send className="w-4 h-4" />
            {isPending ? "در حال ارسال..." : "ارسال نظر"}
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.id} className="flex gap-4">
            <Avatar className="w-11 h-11 bg-[#E45858]">
              <AvatarFallback className="text-gray-500">
                {item.user_name?.[0] || <User />}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold">
                  {item.user_name || item.user}
                </span>
                <span className="text-sm text-[#6E6E6E]">
                  {new Date(item.created_at).toLocaleDateString("fa-IR")}
                </span>
              </div>

              <p className="mb-2">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
