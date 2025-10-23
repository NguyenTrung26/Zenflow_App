// src/screens/ScheduleScreen.jsx
import React from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ScheduleScreen() {
  const navigate = useNavigate();
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const [selectedDay, setSelectedDay] = React.useState(2);

  const schedule = [
    {
      day: 1,
      time: "07:00",
      activity: "Yoga Buổi Sáng",
      duration: "15 phút",
      completed: true,
    },
    {
      day: 2,
      time: "07:00",
      activity: "Yoga Buổi Sáng",
      duration: "15 phút",
      completed: true,
    },
    {
      day: 2,
      time: "20:00",
      activity: "Thiền Tối",
      duration: "10 phút",
      completed: false,
    },
    {
      day: 3,
      time: "07:00",
      activity: "Power Yoga",
      duration: "30 phút",
      completed: false,
    },
    {
      day: 4,
      time: "12:00",
      activity: "Thở Sâu",
      duration: "5 phút",
      completed: false,
    },
    {
      day: 5,
      time: "07:00",
      activity: "Yoga Linh Hoạt",
      duration: "25 phút",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Lịch tập luyện
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Tuần này</h3>
            <button className="text-teal-600 text-sm font-semibold">
              Thêm lịch +
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day, idx) => {
              const hasSchedule = schedule.some((s) => s.day === idx);
              const allCompleted = schedule
                .filter((s) => s.day === idx)
                .every((s) => s.completed);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                    selectedDay === idx
                      ? "bg-teal-500 text-white shadow-lg"
                      : hasSchedule
                      ? allCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="text-xs mb-1">{day}</span>
                  <span className="text-lg font-bold">{idx + 18}</span>
                  {hasSchedule && (
                    <div className="w-1 h-1 bg-current rounded-full mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Calendar size={20} />
            Lịch ngày {selectedDay + 18}/10
          </h3>
          {schedule.filter((s) => s.day === selectedDay).length > 0 ? (
            schedule
              .filter((s) => s.day === selectedDay)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
                        item.completed ? "bg-green-100" : "bg-teal-100"
                      }`}
                    >
                      {item.completed ? "✅" : "🧘"}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {item.activity}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {item.time} • {item.duration}
                      </p>
                    </div>
                  </div>
                  {!item.completed && (
                    <button className="bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-all">
                      Bắt đầu
                    </button>
                  )}
                </div>
              ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <p className="text-gray-500 mb-4">
                Chưa có lịch tập cho ngày này
              </p>
              <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all">
                Thêm lịch mới
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
          <h3 className="font-bold text-gray-800 mb-4">Mục tiêu tuần</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Buổi tập: 4/7</span>
                <span className="text-sm font-semibold text-teal-600">57%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-teal-500 h-full" style={{ width: "57%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Phút thiền: 85/120
                </span>
                <span className="text-sm font-semibold text-teal-600">71%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: "71%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
