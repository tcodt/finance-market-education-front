"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  BookOpen,
  PlayCircle,
  MessageCircle,
  Medal,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

const overallLeaderboard = [
  {
    id: 1,
    name: "علی محمدی",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    score: 2850,
    articles: 45,
    videos: 38,
    comments: 67,
  },
  {
    id: 2,
    name: "سارا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    score: 2720,
    articles: 42,
    videos: 35,
    comments: 58,
  },
  {
    id: 3,
    name: "محمد حسینی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    score: 2580,
    articles: 38,
    videos: 40,
    comments: 52,
  },
  {
    id: 4,
    name: "مریم نوری",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    score: 2340,
    articles: 35,
    videos: 32,
    comments: 48,
  },
  {
    id: 5,
    name: "رضا کریمی",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    score: 2180,
    articles: 32,
    videos: 30,
    comments: 45,
  },
  {
    id: 6,
    name: "فاطمه صادقی",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    score: 1950,
    articles: 28,
    videos: 28,
    comments: 38,
  },
  {
    id: 7,
    name: "امیر رضایی",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    score: 1820,
    articles: 25,
    videos: 26,
    comments: 35,
  },
  {
    id: 8,
    name: "زهرا کاظمی",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    score: 1670,
    articles: 22,
    videos: 24,
    comments: 30,
  },
  {
    id: 9,
    name: "حسین نظری",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    score: 1540,
    articles: 20,
    videos: 22,
    comments: 28,
  },
  {
    id: 10,
    name: "نازنین امینی",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    score: 1420,
    articles: 18,
    videos: 20,
    comments: 25,
  },
  {
    id: 11,
    name: "پویا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    score: 1310,
    articles: 17,
    videos: 18,
    comments: 22,
  },
  {
    id: 12,
    name: "شیما رضایی",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    score: 1180,
    articles: 15,
    videos: 16,
    comments: 20,
  },
  {
    id: 13,
    name: "بهزاد محمدی",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    score: 1050,
    articles: 13,
    videos: 15,
    comments: 18,
  },
  {
    id: 14,
    name: "لیلا کریمی",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    score: 940,
    articles: 12,
    videos: 13,
    comments: 15,
  },
  {
    id: 15,
    name: "سعید حسینی",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    score: 820,
    articles: 10,
    videos: 12,
    comments: 14,
  },
];

const articlesLeaderboard = [
  {
    id: 1,
    name: "علی محمدی",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    count: 45,
  },
  {
    id: 2,
    name: "سارا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    count: 42,
  },
  {
    id: 3,
    name: "محمد حسینی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    count: 38,
  },
  {
    id: 4,
    name: "مریم نوری",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    count: 35,
  },
  {
    id: 5,
    name: "رضا کریمی",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    count: 32,
  },
  {
    id: 6,
    name: "فاطمه صادقی",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    count: 28,
  },
  {
    id: 7,
    name: "امیر رضایی",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    count: 25,
  },
  {
    id: 8,
    name: "زهرا کاظمی",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    count: 22,
  },
  {
    id: 9,
    name: "حسین نظری",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    count: 20,
  },
  {
    id: 10,
    name: "نازنین امینی",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    count: 18,
  },
  {
    id: 11,
    name: "پویا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    count: 17,
  },
  {
    id: 12,
    name: "شیما رضایی",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    count: 15,
  },
  {
    id: 13,
    name: "بهزاد محمدی",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    count: 13,
  },
  {
    id: 14,
    name: "لیلا کریمی",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    count: 12,
  },
  {
    id: 15,
    name: "سعید حسینی",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    count: 10,
  },
];

const videosLeaderboard = [
  {
    id: 1,
    name: "محمد حسینی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    count: 40,
  },
  {
    id: 2,
    name: "علی محمدی",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    count: 38,
  },
  {
    id: 3,
    name: "سارا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    count: 35,
  },
  {
    id: 4,
    name: "مریم نوری",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    count: 32,
  },
  {
    id: 5,
    name: "رضا کریمی",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    count: 30,
  },
  {
    id: 6,
    name: "فاطمه صادقی",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    count: 28,
  },
  {
    id: 7,
    name: "امیر رضایی",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    count: 26,
  },
  {
    id: 8,
    name: "زهرا کاظمی",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    count: 24,
  },
  {
    id: 9,
    name: "حسین نظری",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    count: 22,
  },
  {
    id: 10,
    name: "نازنین امینی",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    count: 20,
  },
  {
    id: 11,
    name: "پویا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    count: 18,
  },
  {
    id: 12,
    name: "شیما رضایی",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    count: 16,
  },
  {
    id: 13,
    name: "بهزاد محمدی",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    count: 15,
  },
  {
    id: 14,
    name: "لیلا کریمی",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    count: 13,
  },
  {
    id: 15,
    name: "سعید حسینی",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    count: 12,
  },
];

const commentsLeaderboard = [
  {
    id: 1,
    name: "علی محمدی",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    count: 67,
  },
  {
    id: 2,
    name: "سارا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    count: 58,
  },
  {
    id: 3,
    name: "محمد حسینی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    count: 52,
  },
  {
    id: 4,
    name: "مریم نوری",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    count: 48,
  },
  {
    id: 5,
    name: "رضا کریمی",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    count: 45,
  },
  {
    id: 6,
    name: "فاطمه صادقی",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    count: 38,
  },
  {
    id: 7,
    name: "امیر رضایی",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    count: 35,
  },
  {
    id: 8,
    name: "زهرا کاظمی",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    count: 30,
  },
  {
    id: 9,
    name: "حسین نظری",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    count: 28,
  },
  {
    id: 10,
    name: "نازنین امینی",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    count: 25,
  },
  {
    id: 11,
    name: "پویا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    count: 22,
  },
  {
    id: 12,
    name: "شیما رضایی",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    count: 20,
  },
  {
    id: 13,
    name: "بهزاد محمدی",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    count: 18,
  },
  {
    id: 14,
    name: "لیلا کریمی",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    count: 15,
  },
  {
    id: 15,
    name: "سعید حسینی",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    count: 14,
  },
];

// Current user data (رتبه کاربر فعلی)
const currentUser = {
  name: "شما",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
  overallRank: 23,
  overallScore: 450,
  overallData: { articles: 7, videos: 5, comments: 8 },
  monthlyRank: 18,
  monthlyScore: 180,
  monthlyData: { articles: 3, videos: 2, comments: 4 },
};

const monthlyLeaderboard = [
  {
    id: 1,
    name: "سارا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    score: 850,
    articles: 12,
    videos: 10,
    comments: 18,
  },
  {
    id: 2,
    name: "محمد حسینی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    score: 780,
    articles: 11,
    videos: 12,
    comments: 15,
  },
  {
    id: 3,
    name: "مریم نوری",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
    score: 720,
    articles: 10,
    videos: 9,
    comments: 14,
  },
  {
    id: 4,
    name: "علی محمدی",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    score: 680,
    articles: 9,
    videos: 11,
    comments: 12,
  },
  {
    id: 5,
    name: "رضا کریمی",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    score: 620,
    articles: 8,
    videos: 8,
    comments: 13,
  },
  {
    id: 6,
    name: "فاطمه صادقی",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    score: 580,
    articles: 7,
    videos: 9,
    comments: 11,
  },
  {
    id: 7,
    name: "امیر رضایی",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    score: 540,
    articles: 7,
    videos: 7,
    comments: 10,
  },
  {
    id: 8,
    name: "زهرا کاظمی",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    score: 490,
    articles: 6,
    videos: 8,
    comments: 9,
  },
  {
    id: 9,
    name: "حسین نظری",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    score: 450,
    articles: 6,
    videos: 6,
    comments: 8,
  },
  {
    id: 10,
    name: "نازنین امینی",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    score: 410,
    articles: 5,
    videos: 7,
    comments: 7,
  },
  {
    id: 11,
    name: "پویا احمدی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    score: 380,
    articles: 5,
    videos: 5,
    comments: 7,
  },
  {
    id: 12,
    name: "شیما رضایی",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    score: 350,
    articles: 4,
    videos: 6,
    comments: 6,
  },
  {
    id: 13,
    name: "بهزاد محمدی",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    score: 320,
    articles: 4,
    videos: 4,
    comments: 6,
  },
  {
    id: 14,
    name: "لیلا کریمی",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    score: 280,
    articles: 3,
    videos: 5,
    comments: 5,
  },
  {
    id: 15,
    name: "سعید حسینی",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    score: 250,
    articles: 3,
    videos: 4,
    comments: 4,
  },
];

const tabs = [
  { id: "overall", label: "برترین‌ها", icon: Trophy },
  { id: "monthly", label: "برترین‌های ماه", icon: Award },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("overall");

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-lg font-bold text-[#6E6E6E]">#{rank}</span>;
  };

  const getRankBadge = (rank) => {
    if (rank === 1)
      return "bg-white border-2 border-yellow-400 shadow-lg shadow-yellow-200";
    if (rank === 2)
      return "bg-white border-2 border-gray-300 shadow-lg shadow-gray-200";
    if (rank === 3)
      return "bg-white border-2 border-amber-500 shadow-lg shadow-amber-200";
    return "bg-white border-2 border-[#E5E1DC]";
  };

  const renderLeaderboard = () => {
    const leaderboard =
      activeTab === "monthly" ? monthlyLeaderboard : overallLeaderboard;

    return (
      <div className="space-y-3">
        {leaderboard.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-md",
              getRankBadge(index + 1)
            )}
          >
            <div className="flex items-center justify-center w-12">
              {getRankIcon(index + 1)}
            </div>
            <Avatar className="w-12 h-12 border-2 border-white shadow-md">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-[#E45858] text-white">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-bold text-[#1A1A1A]">{user.name}</h4>
              <div className="flex items-center gap-3 text-xs text-[#6E6E6E] mt-1">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {user.articles}
                </span>
                <span className="flex items-center gap-1">
                  <PlayCircle className="w-3 h-3" />
                  {user.videos}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {user.comments}
                </span>
              </div>
            </div>
            <Badge className="bg-[#E45858] text-white border-0 px-4 py-1 text-base">
              {user.score}
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">لیدربورد</h1>
        <p className="text-[#6E6E6E]">رتبه‌بندی بهترین کاربران پلتفرم</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-[#E45858] text-white shadow-lg shadow-[#E45858]/25"
                : "bg-white text-[#6E6E6E] border border-[#E5E1DC] hover:border-[#E45858] hover:text-[#E45858]"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Content */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E1DC]">
        {renderLeaderboard()}
      </div>

      {/* Current User Rank */}
      <div className="mt-6 bg-[#F0EAE2] rounded-2xl p-5 border-2 border-[#E45858]">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12">
            <span className="text-lg font-bold text-[#E45858]">
              #
              {activeTab === "monthly"
                ? currentUser.monthlyRank
                : currentUser.overallRank}
            </span>
          </div>
          <Avatar className="w-12 h-12 border-2 border-[#E45858] shadow-md">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-[#E45858] text-white font-bold">
              ش
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-bold text-[#1A1A1A]">{currentUser.name}</h4>
            <div className="flex items-center gap-3 text-xs text-[#6E6E6E] mt-1">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {activeTab === "monthly"
                  ? currentUser.monthlyData.articles
                  : currentUser.overallData.articles}
              </span>
              <span className="flex items-center gap-1">
                <PlayCircle className="w-3 h-3" />
                {activeTab === "monthly"
                  ? currentUser.monthlyData.videos
                  : currentUser.overallData.videos}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {activeTab === "monthly"
                  ? currentUser.monthlyData.comments
                  : currentUser.overallData.comments}
              </span>
            </div>
          </div>
          <Badge className="bg-[#E45858] text-white border-0 px-4 py-1 text-base">
            {activeTab === "monthly"
              ? currentUser.monthlyScore
              : currentUser.overallScore}
          </Badge>
        </div>
      </div>
    </div>
  );
}
