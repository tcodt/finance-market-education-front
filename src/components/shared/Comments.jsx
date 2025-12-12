"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Reply } from "lucide-react";

import { useComments, usePostComment } from "@/hooks/useComments";

export default function Comments({ type = "video", blogId, slug }) {
  const [comment, setComment] = useState("");

  const { data, isLoading } = useComments(blogId, slug);
  const { mutate: submitComment, isPending } = usePostComment(blogId, slug);

  const handleSubmit = () => {
    if (!comment.trim()) return;

    submitComment(
      {
        blog: blogId,
        user: 1, // TODO: وصلش کن به یوزر واقعی
        parent: null,
        content: comment,
      },
      {
        onSuccess: () => setComment(""),
      }
    );
  };

  if (isLoading)
    return <div className="p-6 text-center">در حال بارگذاری نظرات...</div>;

  const comments = data || [];

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
            disabled={isPending}
            className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6 gap-2"
          >
            <Send className="w-4 h-4" />
            {isPending ? "در حال ارسال..." : "ارسال نظر"}
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
                  {item.user_name?.substring(0, 1) || "؟"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-[#1A1A1A]">
                    {item.user_name}
                  </span>
                  <span className="text-sm text-[#6E6E6E]">
                    {new Date(item.created_at).toLocaleDateString("fa-IR")}
                  </span>
                </div>

                <p className="text-[#1A1A1A] leading-relaxed mb-3">
                  {item.content}
                </p>

                {/* Replies */}
                {Array.isArray(item.replies) && item.replies.length > 0 && (
                  <div className="mt-4 mr-6 pr-6 border-r-2 border-[#E5E1DC] space-y-4">
                    {item.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="w-9 h-9 bg-gradient-to-br from-[#8B8B8B] to-[#a8a8a8]">
                          <AvatarFallback className="bg-transparent text-white text-sm">
                            {reply.user_name?.substring(0, 1) || "؟"}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-[#1A1A1A]">
                              {reply.user_name}
                            </span>
                            <span className="text-xs text-[#6E6E6E]">
                              {new Date(reply.created_at).toLocaleDateString(
                                "fa-IR"
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-[#1A1A1A] leading-relaxed">
                            {reply.content}
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
