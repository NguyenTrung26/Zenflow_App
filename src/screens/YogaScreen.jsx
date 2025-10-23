// src/screens/YogaScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Clock, Lock, Play } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function YogaScreen() {
  const navigate = useNavigate();
  const { isPremium } = useApp();
  const [selectedLevel, setSelectedLevel] = React.useState("Tất cả");
  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả");

  const yogaLessons = [
    {
      title: "Yoga Buổi Sáng Năng Lượng",
      level: "Beginner",
      duration: "15 phút",
      category: "Buổi sáng",
      image: "☀️",
      instructor: "Ngọc Anh",
      rating: 4.9,
      views: "12K",
      premium: false,
    },
    {
      title: "Thư Giãn Trước Khi Ngủ",
      level: "Beginner",
      duration: "20 phút",
      category: "Buổi tối",
      image: "🌙",
      instructor: "Minh Tú",
      rating: 4.8,
      views: "8.5K",
      premium: false,
    },
    {
      title: "Tăng Linh Hoạt Toàn Thân",
      level: "Intermediate",
      duration: "30 phút",
      category: "Linh hoạt",
      image: "🤸",
      instructor: "Hà My",
      rating: 4.7,
      views: "15K",
      premium: true,
    },
    {
      title: "Power Yoga Giảm Cân",
      level: "Advanced",
      duration: "45 phút",
      category: "Giảm cân",
      image: "💪",
      instructor: "Quang Huy",
      rating: 4.9,
      views: "20K",
      premium: true,
    },
    {
      title: "Yoga Cho Người Bận Rộn",
      level: "Beginner",
      duration: "10 phút",
      category: "Nhanh",
      image: "⚡",
      instructor: "Thu Hà",
      rating: 4.6,
      views: "9K",
      premium: false,
    },
    {
      title: "Giảm Đau Lưng Cột Sống",
      level: "Intermediate",
      duration: "25 phút",
      category: "Trị liệu",
      image: "🩺",
      instructor: "Dr. Lan",
      rating: 4.8,
      views: "11K",
      premium: true,
    },
  ];

  const filteredLessons = yogaLessons.filter((lesson) => {
    const levelMatch =
      selectedLevel === "Tất cả" || lesson.level === selectedLevel;
    const categoryMatch =
      selectedCategory === "Tất cả" || lesson.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 pb-24">
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-teal-600 hover:text-teal-800 font-semibold"
        >
          ← Quay lại
        </button>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Bài tập Yoga</h2>
            <p className="text-gray-600">Chọn bài tập phù hợp với bạn</p>
          </div>
          <button
            onClick={() => navigate("/premium")}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Crown size={20} />
            Premium
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Cấp độ:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["Tất cả", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedLevel === level
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-teal-100"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">Danh mục:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              "Tất cả",
              "Buổi sáng",
              "Buổi tối",
              "Giảm cân",
              "Linh hoạt",
              "Trị liệu",
              "Nhanh",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="bg-gradient-to-br from-teal-400 to-blue-500 h-48 flex items-center justify-center text-8xl relative">
                {lesson.image}
                {lesson.premium && !isPremium && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Lock size={14} />
                    PRO
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Giảng viên: {lesson.instructor}
                </p>

                <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      lesson.level === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : lesson.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {lesson.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {lesson.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    ⭐ {lesson.rating}
                  </span>
                  <span>{lesson.views} lượt xem</span>
                </div>

                <button
                  onClick={() =>
                    lesson.premium && !isPremium ? navigate("/premium") : null
                  }
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  {lesson.premium && !isPremium ? (
                    <>
                      <Lock size={20} />
                      Nâng cấp để xem
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Bắt đầu
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Không tìm thấy bài tập phù hợp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
