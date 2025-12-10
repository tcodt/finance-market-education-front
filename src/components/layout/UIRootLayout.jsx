"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UIRootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E4E4E4] flex">
      <style>{`
        :root {
          --color-bg: #E4E4E4;
          --color-text: #000000;
          --color-accent: #000000;
        }
        
        * {
          font-family: 'Vazirmatn', 'Segoe UI', Tahoma, sans-serif;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile Header */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 flex items-center justify-between px-4"
        dir="rtl"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="hover:bg-[#D9D9D9]"
        >
          <Menu className="w-6 h-6 text-[#000000]" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#000000] flex items-center justify-center">
            <span className="text-white font-bold">آ</span>
          </div>
          <span className="font-bold text-[#000000]">آموزش بازار مالی</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 lg:pt-0 min-h-screen flex-1" dir="rtl">
        <div className="p-3">{children}</div>
      </main>
    </div>
  );
}
