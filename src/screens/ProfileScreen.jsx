import React from "react";
import { Trophy, Crown, Sun, Moon, LogOut } from "lucide-react";
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

  // 📊 Thành tựu dựa trên dữ liệu thật
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
      className={`min-h-screen transition-colors duration-500 ${
        zenMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-teal-50 to-blue-50 text-gray-800"
      } pb-24`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Hồ sơ cá nhân</h2>
          <button
            onClick={() => navigate("/home")}
            className="text-sm text-teal-600 hover:underline"
          >
            ← Quay lại
          </button>
        </div>

        {/* 👤 Thông tin người dùng + Google Auth */}
        <div
          className={`rounded-2xl shadow-lg p-8 mb-6 ${
            zenMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-6 mb-6 flex-wrap">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-teal-400"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.[0] || "U"}
                </div>
              )}
              {isPremium && (
                <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-md">
                  <Crown size={18} />
                </span>
              )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <h3 className="text-2xl font-bold">
                {user?.displayName || "Người dùng ZenFlow"}
              </h3>
              <p className="text-gray-500 mb-2">
                {user?.email || "Chưa đăng nhập"}
              </p>
              <p className="font-semibold">
                Gói:{" "}
                <span
                  className={isPremium ? "text-yellow-500" : "text-teal-600"}
                >
                  {isPremium ? "Premium" : "Miễn phí"}
                </span>
              </p>
            </div>

            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all"
              >
                Đăng nhập với Google
              </button>
            )}
          </div>

          {/* 🧾 Thống kê */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <p className="text-3xl font-bold">{userStats.streak}</p>
              <p className="text-sm opacity-70">Ngày streak</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{userStats.totalSessions}</p>
              <p className="text-sm opacity-70">Buổi thiền</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">Lv {userStats.currentLevel}</p>
              <p className="text-sm opacity-70">Cấp độ</p>
            </div>
          </div>
        </div>

        {/* 🏆 Thành tựu */}
        <div
          className={`rounded-2xl shadow-lg p-6 mb-6 ${
            zenMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={22} /> Thành tựu
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                  ach.unlocked
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md"
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
          className={`rounded-2xl shadow-lg overflow-hidden ${
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

            {/* 🌙 Chế độ tối */}
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="text-indigo-500 text-xl">🌙</div>
                <div>
                  <p className="font-semibold">Chế độ tối</p>
                  <p className="text-sm opacity-70">
                    Chuyển giao diện tối/sáng
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
                    Tùy chỉnh chi tiết trải nghiệm thiền
                  </p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
