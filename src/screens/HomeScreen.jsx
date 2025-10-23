// src/screens/HomeScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Trophy,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  Settings,
  Sun,
  Moon,
  Music,
  Wind,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function HomeScreen() {
  const navigate = useNavigate();
  const { zenMode, setZenMode, userStats, mood, dailyQuote, completedToday } =
    useApp();

  return (
    <div
      className={`min-h-screen pb-24 transition-colors duration-500 ${
        zenMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50"
      }`}
    >
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2
              className={`text-3xl font-bold ${
                zenMode ? "text-white" : "text-gray-800"
              }`}
            >
              {new Date().getHours() < 12
                ? "Chào buổi sáng"
                : new Date().getHours() < 18
                ? "Chào buổi chiều"
                : "Chào buổi tối"}{" "}
              ☀️
            </h2>
            <p
              className={`${zenMode ? "text-gray-300" : "text-gray-600"} mt-1`}
            >
              Cảm giác hôm nay:{" "}
              <span className="font-semibold">{mood || "Tuyệt vời"}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/settings")}
              className={`p-3 rounded-full ${
                zenMode ? "bg-gray-800" : "bg-white shadow-md"
              } transition-all`}
            >
              <Settings
                className={zenMode ? "text-white" : "text-gray-600"}
                size={20}
              />
            </button>
            <button
              onClick={() => setZenMode(!zenMode)}
              className={`p-3 rounded-full ${
                zenMode ? "bg-yellow-500" : "bg-gray-800"
              } transition-all shadow-lg`}
            >
              {zenMode ? (
                <Sun className="text-white" size={20} />
              ) : (
                <Moon className="text-white" size={20} />
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            zenMode
              ? "bg-gradient-to-r from-orange-900 to-red-900"
              : "bg-gradient-to-r from-orange-400 to-red-400"
          } rounded-2xl p-6 mb-6 shadow-lg`}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Flame className="text-white" size={32} />
              <div>
                <p className="text-white text-2xl font-bold">
                  {userStats.streak} ngày
                </p>
                <p className="text-orange-100 text-sm">Chuỗi ngày liên tiếp</p>
              </div>
            </div>
            <Trophy className="text-yellow-300" size={32} />
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500"
              style={{ width: `${userStats.nextLevelProgress}%` }}
            />
          </div>
          <p className="text-white text-sm mt-2">
            Level {userStats.currentLevel} • {userStats.nextLevelProgress}% đến
            Level {userStats.currentLevel + 1}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div
            className={`${
              zenMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-4 shadow-lg`}
          >
            <CheckCircle
              className={`${zenMode ? "text-green-400" : "text-teal-500"} mb-2`}
              size={24}
            />
            <p
              className={`text-2xl font-bold ${
                zenMode ? "text-white" : "text-gray-800"
              }`}
            >
              {userStats.totalSessions}
            </p>
            <p
              className={`text-xs ${
                zenMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Buổi tập
            </p>
          </div>
          <div
            className={`${
              zenMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-4 shadow-lg`}
          >
            <Clock
              className={`${zenMode ? "text-blue-400" : "text-teal-500"} mb-2`}
              size={24}
            />
            <p
              className={`text-2xl font-bold ${
                zenMode ? "text-white" : "text-gray-800"
              }`}
            >
              {userStats.totalMinutes}
            </p>
            <p
              className={`text-xs ${
                zenMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Phút thiền
            </p>
          </div>
          <div
            className={`${
              zenMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-4 shadow-lg`}
          >
            <Target
              className={`${
                zenMode ? "text-purple-400" : "text-teal-500"
              } mb-2`}
              size={24}
            />
            <p
              className={`text-2xl font-bold ${
                zenMode ? "text-white" : "text-gray-800"
              }`}
            >
              {Math.floor(userStats.totalSessions / 7)}
            </p>
            <p
              className={`text-xs ${
                zenMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Tuần hoàn thành
            </p>
          </div>
        </div>

        <div
          className={`${
            zenMode
              ? "bg-gradient-to-r from-purple-900 to-indigo-900"
              : "bg-gradient-to-r from-purple-500 to-indigo-500"
          } rounded-2xl p-6 mb-6 shadow-lg`}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="text-yellow-300" size={24} />
            <div>
              <h3 className="text-white font-bold text-lg mb-2">
                Gợi ý AI hôm nay
              </h3>
              <p className="text-purple-100 mb-3">
                {mood === "Căng thẳng" &&
                  "Hãy thử bài thiền thở sâu 10 phút để xoa dịu căng thẳng."}
                {mood === "Mệt mỏi" &&
                  "Yoga nhẹ nhàng buổi tối sẽ giúp bạn phục hồi năng lượng."}
                {mood === "Vui vẻ" &&
                  "Tuyệt vời! Hãy thử thử thách Power Yoga 30 phút hôm nay."}
                {!mood &&
                  "Dựa trên mục tiêu của bạn, hãy bắt đầu với bài thiền 15 phút."}
              </p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-all">
                Bắt đầu ngay
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => navigate("/meditation")}
            className="bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-3xl p-8 text-left hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl">🧘</div>
              {completedToday && (
                <CheckCircle className="text-teal-200" size={24} />
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">Bắt đầu thiền</h3>
            <p className="text-teal-50 mb-3">Tĩnh tâm và thư giãn ngay</p>
            <div className="flex gap-2">
              <span className="bg-teal-500 px-3 py-1 rounded-full text-sm">
                5-30 phút
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate("/yoga")}
            className="bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-3xl p-8 text-left hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold mb-2">Bài tập Yoga</h3>
            <p className="text-blue-50 mb-3">Rèn luyện thân thể linh hoạt</p>
            <div className="flex gap-2">
              <span className="bg-blue-400 px-3 py-1 rounded-full text-sm">
                15-45 phút
              </span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate("/breath")}
            className={`${
              zenMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-6 shadow-lg text-left hover:shadow-xl transition-all`}
          >
            <Wind
              className={`${zenMode ? "text-cyan-400" : "text-cyan-500"} mb-3`}
              size={32}
            />
            <h4
              className={`font-bold ${
                zenMode ? "text-white" : "text-gray-800"
              }`}
            >
              Thở sâu
            </h4>
            <p
              className={`text-sm ${
                zenMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              2-5 phút
            </p>
          </button>
          <button
            onClick={() => navigate("/music")}
            className={`${
              zenMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-6 shadow-lg text-left hover:shadow-xl transition-all`}
          >
            <Music
              className={`${zenMode ? "text-pink-400" : "text-pink-500"} mb-3`}
              size={32}
            />
            <h4
              className={`font-bold ${
                zenMode ? "text-white" : "text-gray-800"
              }`}
            >
              Nhạc thư giãn
            </h4>
            <p
              className={`text-sm ${
                zenMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Ambient
            </p>
          </button>
        </div>

        <div
          className={`${
            zenMode ? "bg-gray-800 border-gray-700" : "bg-white"
          } rounded-2xl p-6 border-l-4 border-teal-500 shadow-lg`}
        >
          <div className="flex items-start gap-3">
            <Sparkles
              className="text-yellow-500 flex-shrink-0 mt-1"
              size={20}
            />
            <div>
              <p
                className={`${
                  zenMode ? "text-gray-300" : "text-gray-700"
                } italic text-lg leading-relaxed`}
              >
                "{dailyQuote}"
              </p>
              <p
                className={`${
                  zenMode ? "text-gray-500" : "text-gray-500"
                } mt-3 text-sm`}
              >
                — Trích dẫn hôm nay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
