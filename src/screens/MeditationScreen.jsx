// src/screens/MeditationScreen.jsx
import React, { useEffect, useState, useRef } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  Clock,
  Volume2,
  Droplets,
  Bell,
  Wind,
  Music as MusicIcon,
  CheckCircle,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { formatTime } from "../utils/formatTime";

export default function MeditationScreen() {
  const navigate = useNavigate();
  const {
    user,
    userStats,
    setUserStats,
    meditationTimer,
    setMeditationTimer,
    selectedDuration,
    setSelectedDuration,
    isTimerRunning,
    setIsTimerRunning,
    breathAnimation,
    setBreathAnimation,
    isPremium,
    selectedSound,
    setSelectedSound,
  } = useApp();

  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const audioRef = useRef(null);

  // 🎵 Âm thanh nền
  const sounds = [
    {
      name: "Tiếng suối",
      src: "/sounds/stream.mp3",
      icon: <Droplets size={20} />,
      premium: false,
    },
    {
      name: "Chuông chùa",
      src: "/sounds/bell.mp3",
      icon: <Bell size={20} />,
      premium: false,
    },
    {
      name: "Rừng mưa",
      src: "/sounds/rainforest.mp3",
      icon: <Wind size={20} />,
      premium: false,
    },
    {
      name: "Nhạc nhẹ",
      src: "/sounds/softmusic.mp3",
      icon: <MusicIcon size={20} />,
      premium: true,
    },
    {
      name: "Biển cả",
      src: "/sounds/ocean.mp3",
      icon: <Droplets size={20} />,
      premium: true,
    },
    {
      name: "Gió núi",
      src: "/sounds/mountainwind.mp3",
      icon: <Wind size={20} />,
      premium: true,
    },
  ];

  // 🕒 Thời lượng thiền
  const durations = [
    { label: "5 phút", value: 300 },
    { label: "10 phút", value: 600 },
    { label: "15 phút", value: 900 },
    { label: "20 phút", value: 1200 },
    { label: "30 phút", value: 1800 },
  ];

  // ⏳ Đếm ngược
  useEffect(() => {
    if (!isTimerRunning || meditationTimer <= 0) return;
    const timer = setInterval(() => setMeditationTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, meditationTimer]);

  // 🌬️ Hít vào / Thở ra
  useEffect(() => {
    if (!isTimerRunning) return;
    const breathing = setInterval(
      () =>
        setBreathAnimation((prev) => (prev === "inhale" ? "exhale" : "inhale")),
      4000
    );
    return () => clearInterval(breathing);
  }, [isTimerRunning]);

  // 🧘 Khi hoàn thành phiên thiền
  useEffect(() => {
    if (meditationTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setCompleted(true);

      // ✅ Cập nhật local stats
      setUserStats((prev) => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + selectedDuration / 60,
        streak: prev.streak + 1,
        nextLevelProgress: Math.min(prev.nextLevelProgress + 10, 100),
      }));

      // ✅ Lưu Firestore
      if (user?.uid) saveSessionToFirestore();
    }
  }, [meditationTimer, isTimerRunning]);

  const saveSessionToFirestore = async () => {
    try {
      setSaving(true);
      await addDoc(collection(db, "sessions"), {
        uid: user.uid,
        duration: selectedDuration,
        sound: selectedSound,
        createdAt: serverTimestamp(),
      });
      console.log("✅ Lưu session thành công!");
    } catch (err) {
      console.error("🔥 Lỗi lưu session:", err);
    } finally {
      setSaving(false);
    }
  };

  // 🎧 Quản lý phát âm thanh
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const sound = sounds.find((s) => s.name === selectedSound);
    if (!sound) return;

    // Nếu âm thanh Premium mà người dùng chưa mua → chặn
    if (sound.premium && !isPremium) return;

    const audio = new Audio(sound.src);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    if (isTimerRunning) {
      audio.play().catch((e) => console.warn("Không thể phát âm thanh:", e));
    }

    return () => {
      audio.pause();
    };
  }, [selectedSound, isTimerRunning]);

  // 🔁 Reset
  const handleReset = () => {
    setMeditationTimer(selectedDuration);
    setIsTimerRunning(false);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 pb-24">
      <div className="max-w-md mx-auto p-6">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Quay lại
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Thiền định
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Tìm lại sự bình yên nội tâm 🌿
          </p>

          {/* Vòng hơi thở */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 via-blue-500 to-purple-500 transition-all duration-[4000ms] ease-in-out ${
                isTimerRunning && breathAnimation === "inhale"
                  ? "scale-100 opacity-80"
                  : "scale-75 opacity-50"
              }`}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-semibold mb-2">
                {isTimerRunning
                  ? breathAnimation === "inhale"
                    ? "Hít vào"
                    : "Thở ra"
                  : "Sẵn sàng"}
              </p>
              <p className="text-white text-5xl font-bold">
                {formatTime(meditationTimer)}
              </p>
            </div>
          </div>

          {/* Thời lượng */}
          {!isTimerRunning && (
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
                <Clock size={20} /> Chọn thời gian
              </p>
              <div className="grid grid-cols-5 gap-2">
                {durations.map((dur) => (
                  <button
                    key={dur.value}
                    onClick={() => {
                      setSelectedDuration(dur.value);
                      setMeditationTimer(dur.value);
                    }}
                    className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDuration === dur.value
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-teal-100"
                    }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nút điều khiển */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="bg-teal-500 text-white px-8 py-4 rounded-full hover:bg-teal-600 transition-all flex items-center gap-2 shadow-lg font-semibold"
            >
              {isTimerRunning ? <Pause size={24} /> : <Play size={24} />}
              {isTimerRunning ? "Tạm dừng" : "Bắt đầu"}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-4 rounded-full hover:bg-gray-300 transition-all font-semibold"
            >
              <Clock size={20} /> Đặt lại
            </button>
          </div>

          {/* Chọn âm thanh */}
          <div className="border-t pt-6">
            <p className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <Volume2 size={20} /> Âm thanh nền
            </p>
            <div className="grid grid-cols-2 gap-2">
              {sounds.map((sound) => (
                <button
                  key={sound.name}
                  onClick={() =>
                    sound.premium && !isPremium
                      ? navigate("/premium")
                      : setSelectedSound(sound.name)
                  }
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    selectedSound === sound.name
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-teal-100"
                  } ${sound.premium && !isPremium ? "opacity-60" : ""}`}
                >
                  {sound.icon}
                  {sound.name}
                  {sound.premium && !isPremium && (
                    <span className="ml-1 text-xs">🔒</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Hoàn thành */}
          {completed && (
            <div className="mt-6 bg-teal-50 rounded-xl p-4 border-2 border-teal-200 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="text-teal-600" size={24} />
                <p className="font-bold text-teal-800">Hoàn thành!</p>
              </div>
              <p className="text-center text-gray-600 text-sm">
                Bạn vừa thiền {selectedDuration / 60} phút. Xuất sắc! 🎉
              </p>
              {saving && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  Đang lưu phiên...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
