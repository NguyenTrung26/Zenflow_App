// src/screens/MusicScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Lock, Play } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function MusicScreen() {
  const navigate = useNavigate();
  const { isPremium } = useApp();

  const playlists = [
    {
      title: "Thiền Zen",
      tracks: 12,
      duration: "45 phút",
      icon: "🎋",
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Biển êm đềm",
      tracks: 8,
      duration: "30 phút",
      icon: "🌊",
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Rừng mưa",
      tracks: 10,
      duration: "40 phút",
      icon: "🌳",
      color: "from-emerald-400 to-green-500",
    },
    {
      title: "Piano nhẹ nhàng",
      tracks: 15,
      duration: "60 phút",
      icon: "🎹",
      color: "from-purple-400 to-pink-500",
      premium: true,
    },
    {
      title: "Thiên nhiên",
      tracks: 20,
      duration: "90 phút",
      icon: "🦋",
      color: "from-yellow-400 to-orange-500",
      premium: true,
    },
    {
      title: "Ngủ sâu",
      tracks: 6,
      duration: "2 giờ",
      icon: "🌙",
      color: "from-indigo-400 to-purple-500",
      premium: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-pink-600 hover:text-pink-800 font-semibold"
        >
          ← Quay lại
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nhạc thư giãn</h2>
        <p className="text-gray-600 mb-8">
          Tuyển chọn âm nhạc giúp bạn thư giãn và tập trung
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {playlists.map((playlist, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div
                className={`h-40 bg-gradient-to-br ${playlist.color} flex items-center justify-center text-7xl relative`}
              >
                {playlist.icon}
                {playlist.premium && !isPremium && (
                  <div className="absolute top-3 right-3 bg-white/90 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Crown size={14} />
                    PRO
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">
                  {playlist.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {playlist.tracks} bài • {playlist.duration}
                </p>
                <button
                  onClick={() =>
                    playlist.premium && !isPremium ? navigate("/premium") : null
                  }
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  {playlist.premium && !isPremium ? (
                    <>
                      <Lock size={20} />
                      Nâng cấp
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Phát
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
