// src/screens/BreathworkScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Play } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function BreathworkScreen() {
  const navigate = useNavigate();
  const { isPremium } = useApp();

  const techniques = [
    {
      title: "Thở 4-7-8",
      desc: "Giảm lo âu, dễ ngủ",
      duration: "5 phút",
      icon: "😴",
    },
    {
      title: "Box Breathing",
      desc: "Tăng tập trung",
      duration: "3 phút",
      icon: "🎯",
    },
    {
      title: "Thở sâu bụng",
      desc: "Thư giãn nhanh",
      duration: "2 phút",
      icon: "😌",
    },
    {
      title: "Wim Hof Method",
      desc: "Tăng năng lượng",
      duration: "10 phút",
      icon: "⚡",
      premium: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-6 pb-24">
      <div className="max-w-2xl mx-auto text-center">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-cyan-600 hover:text-cyan-800 font-semibold"
        >
          ← Quay lại
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Luyện tập thở</h2>
        <p className="text-gray-600 mb-8">
          Các bài tập thở giúp giảm căng thẳng và tăng năng lượng
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {techniques.map((technique, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-4">{technique.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">
                {technique.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{technique.desc}</p>
              <p className="text-cyan-600 text-sm font-semibold mb-4">
                {technique.duration}
              </p>
              <button
                onClick={() =>
                  technique.premium && !isPremium ? navigate("/premium") : null
                }
                className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-all flex items-center justify-center gap-2 font-semibold"
              >
                {technique.premium && !isPremium ? (
                  <>
                    <Lock size={20} />
                    Premium
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    Bắt đầu
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
