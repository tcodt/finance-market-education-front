"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPageUrl } from "@/utils/index";
import {
  PlayCircle,
  FileText,
  Award,
  Menu,
  X,
  LogIn,
  UserPlus,
  BookOpen,
  Library,
  Home,
  LucideLogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { icon: Home, label: "صفحه اصلی", page: "Home" },
  { icon: PlayCircle, label: "آموزش‌های ویدیویی", page: "video-courses" },
  { icon: BookOpen, label: "آموزش‌های مقاله‌ای", page: "articles" },
  { icon: Library, label: "خلاصه کتاب", page: "book-summaries" },
  { icon: FileText, label: "مقالات بازار مالی", page: "blogs" },
  { icon: Award, label: "لیدر بورد", page: "leaderboard" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [logoutMode, setLogoutMode] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-56 bg-white z-50 transition-transform duration-300 ease-out rounded-l-3xl shadow-[0_0_20px_rgba(0,0,0,0.1)] border-l border-[#D9D9D9]",
          "lg:h-screen lg:sticky lg:top-0 lg:flex-shrink-0 lg:w-[220px]",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#000000] flex items-center justify-center">
                <span className="text-white font-bold">آ</span>
              </div>
              <span className="font-bold text-base text-[#000000]">
                آموزش بازار
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive =
                pathname.includes(item.page) ||
                (item.page === "Dashboard" && pathname === "/");

              return (
                <Link
                  key={item.page}
                  href={createPageUrl(item.page)}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-[#000000] text-white shadow-lg shadow-[#000000]/25"
                      : "text-[#000000] hover:bg-[#E4E4E4]"
                  )}
                >
                  <item.icon className="w-4.5 h-4.5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Current User Info */}
          {user && (
            <div className="my-4 p-3 rounded-lg bg-gray-100 border border-gray-300">
              <div className="font-bold text-sm text-gray-800">
                {user.first_name && user.last_name
                  ? user.first_name + " " + user.last_name
                  : user.full_name}
              </div>

              <div className="text-xs text-gray-600 mt-1">
                {user.email ? user.email : user.phone_number}
              </div>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="space-y-2 pt-4 border-t border-[#D9D9D9]">
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  setLogoutMode(true);
                  setShowAuthModal(true);
                }}
                variant="outline"
                className="w-full border-[#D9D9D9] hover:border-[#000000] hover:text-[#000000] rounded-lg py-2.5 gap-2 text-sm"
              >
                <LucideLogOut className="w-4 h-4" />
                خروج
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setIsSignUpMode(false);
                    setLogoutMode(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full bg-[#000000] hover:bg-[#333333] text-white rounded-lg py-2.5 gap-2 text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  ورود
                </Button>
                <Button
                  onClick={() => {
                    setIsSignUpMode(true);
                    setLogoutMode(false);
                    setShowAuthModal(true);
                  }}
                  variant="outline"
                  className="w-full border-[#D9D9D9] hover:border-[#000000] hover:text-[#000000] rounded-lg py-2.5 gap-2 text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  ثبت‌نام
                </Button>
              </>
            )}
          </div>
        </div>
      </aside>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setLogoutMode(false);
        }}
        isSignUpDefault={isSignUpMode}
        logoutMode={logoutMode}
      />
    </>
  );
}
