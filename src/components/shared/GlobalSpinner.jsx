"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function GlobalLoading() {
  const { isLoadingGlobal } = useAuth();

  if (!isLoadingGlobal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
