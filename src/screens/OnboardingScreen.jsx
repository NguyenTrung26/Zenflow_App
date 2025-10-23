// src/screens/OnboardingScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { selectedGoal, setSelectedGoal, mood, setMood, setUser } = useApp();

  const [onboardingStep, setOnboardingStep] = React.useState(0);

  const steps = [
    {
      title: "Chào mừng đến ZenFlow",
      subtitle: "Hành trình thanh tịnh thân – tâm – trí",
      icon: "🧘‍♀️",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            Khám phá sức mạnh của thiền định và yoga trong việc cải thiện sức
            khỏe tinh thần và thể chất
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🧘</div>
              <p className="text-sm text-gray-600">Thiền định</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌿</div>
              <p className="text-sm text-gray-600">Yoga</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💆</div>
              <p className="text-sm text-gray-600">Thư giãn</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Mục tiêu của bạn là gì?",
      subtitle: "Chọn mục tiêu để nhận gợi ý phù hợp",
      icon: "🎯",
      content: (
        <div className="space-y-3">
          {[
            {
              icon: "😌",
              title: "Giảm stress",
              desc: "Xoa dịu căng thẳng hàng ngày",
            },
            {
              icon: "🎯",
              title: "Tăng tập trung",
              desc: "Cải thiện sự chú ý và năng suất",
            },
            {
              icon: "😴",
              title: "Ngủ ngon hơn",
              desc: "Có giấc ngủ sâu và chất lượng",
            },
            {
              icon: "💪",
              title: "Rèn sức khỏe",
              desc: "Tăng cường thể lực và linh hoạt",
            },
          ].map((goal) => (
            <button
              key={goal.title}
              onClick={() => setSelectedGoal(goal.title)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedGoal === goal.title
                  ? "border-teal-500 bg-teal-50 shadow-lg"
                  : "border-gray-200 hover:border-teal-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{goal.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800">{goal.title}</p>
                  <p className="text-sm text-gray-600">{goal.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Hôm nay bạn cảm thấy thế nào?",
      subtitle: "AI sẽ gợi ý bài tập phù hợp",
      icon: "💭",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "😊", label: "Vui vẻ" },
            { emoji: "😔", label: "Buồn bã" },
            { emoji: "😰", label: "Căng thẳng" },
            { emoji: "😴", label: "Mệt mỏi" },
            { emoji: "😤", label: "Bực bội" },
            { emoji: "😌", label: "Bình thản" },
          ].map((m) => (
            <button
              key={m.label}
              onClick={() => setMood(m.label)}
              className={`p-4 rounded-xl border-2 transition-all ${
                mood === m.label
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-teal-300"
              }`}
            >
              <div className="text-4xl mb-2">{m.emoji}</div>
              <p className="text-sm font-medium">{m.label}</p>
            </button>
          ))}
        </div>
      ),
    },
  ];

  const currentStep = steps[onboardingStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{currentStep.icon}</div>
          <h1 className="text-3xl font-bold text-teal-600 mb-2">
            {currentStep.title}
          </h1>
          <p className="text-gray-600">{currentStep.subtitle}</p>
        </div>

        <div className="mb-8">{currentStep.content}</div>

        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === onboardingStep ? "w-8 bg-teal-500" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {onboardingStep > 0 && (
            <button
              onClick={() => setOnboardingStep(onboardingStep - 1)}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Quay lại
            </button>
          )}
          <button
            onClick={() => {
              if (onboardingStep < steps.length - 1) {
                setOnboardingStep(onboardingStep + 1);
              } else {
                setUser({ name: "Người dùng", goal: selectedGoal, mood });
                navigate("/home");
              }
            }}
            disabled={
              (onboardingStep === 1 && !selectedGoal) ||
              (onboardingStep === 2 && !mood)
            }
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition-all disabled:opacity-50"
          >
            {onboardingStep === steps.length - 1 ? "Bắt đầu" : "Tiếp tục"}
          </button>
        </div>
      </div>
    </div>
  );
}
