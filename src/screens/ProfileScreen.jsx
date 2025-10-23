// ✅ src/screens/ProfileScreen.jsx
import React from "react";
import {
  Trophy,
  Crown,
  Sun,
  Moon,
  LogOut,
  BarChart,
  Sparkles,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, logout } from "../services/firebase";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const {
    user,
    isPremium,
    userStats,
    notifications,
    setNotifications,
    zenMode,
    setZenMode,
  } = useApp();

  // 🏅 Thành tựu động
  const achievements = [
    { icon: "🔥", title: "7 ngày streak", unlocked: userStats.streak >= 7 },
    {
      icon: "⭐",
      title: "50 buổi thiền",
      unlocked: userStats.totalSessions >= 50,
    },
    {
      icon: "🧘",
      title: "100 phút thiền",
      unlocked: userStats.totalMinutes >= 100,
    },
    { icon: "🏆", title: "Level 5", unlocked: userStats.currentLevel >= 5 },
    { icon: "💎", title: "30 ngày streak", unlocked: userStats.streak >= 30 },
    {
      icon: "👑",
      title: "100 buổi thiền",
      unlocked: userStats.totalSessions >= 100,
    },
    {
      icon: "🌟",
      title: "500 phút thiền",
      unlocked: userStats.totalMinutes >= 500,
    },
    { icon: "🎖️", title: "Level 10", unlocked: userStats.currentLevel >= 10 },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        zenMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 text-gray-800"
      } pb-24`}
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            Hồ sơ cá nhân {isPremium && <Crown className="text-yellow-400" />}
          </h2>
          <button
            onClick={() => navigate("/home")}
            className="text-sm text-teal-600 hover:underline"
          >
            ← Quay lại
          </button>
        </div>

        {/* 👤 Thông tin người dùng */}
        <div
          className={`rounded-2xl shadow-xl p-8 mb-6 relative overflow-hidden transition-all ${
            zenMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Nền động cho Premium */}
          {isPremium && (
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 to-orange-300/10 animate-pulse" />
          )}

          <div className="flex flex-wrap items-center gap-6 mb-6 relative z-10">
            {/* Avatar */}
            <div className="relative">
              {user?.photo || user?.photoURL ? (
                <img
                  src={user.photo || user.photoURL}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-teal-400 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                  {user?.name?.[0] || "U"}
                </div>
              )}
              {isPremium && (
                <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-md">
                  <Crown size={18} />
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-2xl font-bold">
                {user?.displayName || user?.name || "Người dùng ZenFlow"}
              </h3>
              <p
                className={`mb-2 ${
                  zenMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {user?.email || "Chưa đăng nhập"}
              </p>
              <p className="font-semibold flex items-center gap-2">
                Gói:
                <span
                  className={`${
                    isPremium
                      ? "text-yellow-500 flex items-center gap-1"
                      : "text-teal-600"
                  }`}
                >
                  {isPremium ? (
                    <>
                      Premium <Sparkles size={16} />
                    </>
                  ) : (
                    "Miễn phí"
                  )}
                </span>
              </p>
            </div>

            {/* Đăng nhập / Đăng xuất */}
            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center gap-2 shadow-md"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all shadow-md"
              >
                Đăng nhập với Google
              </button>
            )}
          </div>

          {!user && (
            <p className="text-center text-sm text-red-500 mt-2">
              ⚠️ Hãy đăng nhập để lưu tiến trình và mở khóa Premium.
            </p>
          )}

          {/* Thống kê */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 relative z-10">
            {[
              { label: "Ngày streak", value: userStats.streak },
              { label: "Buổi thiền", value: userStats.totalSessions },
              { label: "Cấp độ", value: `Lv ${userStats.currentLevel}` },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🏆 Thành tựu */}
        <div
          className={`rounded-2xl shadow-lg p-6 mb-6 transition-all ${
            zenMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={22} /> Thành tựu
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                  ach.unlocked
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md"
                    : zenMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <span className="text-3xl mb-1">{ach.icon}</span>
                <span className="text-xs text-center px-2">{ach.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ⚙️ Cài đặt */}
        <div
          className={`rounded-2xl shadow-lg overflow-hidden transition-all ${
            zenMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="font-bold text-lg p-6 border-b border-gray-200">
            Cài đặt
          </h3>
          <div className="divide-y divide-gray-200">
            {/* 🔔 Thông báo */}
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="text-teal-600 text-xl">🔔</div>
                <div>
                  <p className="font-semibold">Thông báo</p>
                  <p className="text-sm opacity-70">Nhận nhắc nhở hàng ngày</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-teal-500 cursor-pointer"
              />
            </div>

            {/* 🌙 Zen mode */}
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="text-indigo-500 text-xl">🌙</div>
                <div>
                  <p className="font-semibold">Chế độ Zen</p>
                  <p className="text-sm opacity-70">
                    Giao diện tập trung & yên tĩnh
                  </p>
                </div>
              </div>
              <button
                onClick={() => setZenMode(!zenMode)}
                className={`p-2 rounded-full transition-all ${
                  zenMode
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {zenMode ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>

            {/* 📊 Dashboard */}
            <div
              onClick={() => navigate("/dashboard")}
              className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <BarChart className="text-indigo-500" size={20} />
                <div>
                  <p className="font-semibold">Thống kê thiền</p>
                  <p className="text-sm opacity-70">Xem tiến trình chi tiết</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </div>

            {/* ⚙️ Cài đặt nâng cao */}
            <div
              onClick={() => navigate("/settings")}
              className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-teal-600 text-xl">⚙️</div>
                <div>
                  <p className="font-semibold">Cài đặt nâng cao</p>
                  <p className="text-sm opacity-70">
                    Tuỳ chỉnh trải nghiệm chi tiết
                  </p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </div>

            {/* 💎 Gói Premium (ẩn nếu đã mua) */}
            {!isPremium && (
              <div
                onClick={() => navigate("/premium")}
                className="p-6 flex items-center justify-between hover:bg-yellow-50 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <Crown className="text-yellow-500" size={22} />
                  <div>
                    <p className="font-semibold text-yellow-600">
                      Nâng cấp Premium
                    </p>
                    <p className="text-sm opacity-70">
                      Mở khoá âm thanh & bài tập cao cấp
                    </p>
                  </div>
                </div>
                <span className="text-yellow-500 font-bold">›</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
