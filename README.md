# ZenFlow - Ứng dụng Thiền & Yoga Toàn Diện 🧘‍♀️

![ZenFlow Banner](https://img.shields.io/badge/ZenFlow-Meditation%20%26%20Yoga-teal?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12.4-FFCA28?style=flat&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)

## 📖 Giới thiệu

**ZenFlow** là ứng dụng web hiện đại giúp người dùng:
- 🧘 **Thiền định** với bộ đếm thời gian thông minh và hiệu ứng hơi thở
- 🌿 **Tập Yoga** qua thư viện bài tập phong phú (Beginner → Advanced)
- 📊 **Theo dõi tiến trình** với biểu đồ và thống kê chi tiết
- 🎵 **Âm thanh nền** cao cấp (suối, chuông, rừng mưa, piano...)
- 💎 **Gói Premium** mở khóa nội dung độc quyền
- 🌙 **Zen Mode** giao diện tối tập trung

---

## ✨ Tính năng nổi bật

### 🎯 Core Features
- ✅ **Onboarding thông minh**: Thu thập mục tiêu & tâm trạng người dùng
- ✅ **Timer thiền**: Đếm ngược với hiệu ứng hít-thở (4s cycle)
- ✅ **200+ bài Yoga**: Phân loại theo cấp độ & danh mục
- ✅ **Thống kê Firestore**: Lưu session thiền, đồng bộ đa thiết bị
- ✅ **Dashboard trực quan**: Biểu đồ Recharts hiển thị phút thiền/ngày
- ✅ **Lịch tập luyện**: Quản lý lịch trình tuần với trạng thái hoàn thành

### 🔥 Premium Features
- 💎 Thư viện âm nhạc cao cấp (50+ tracks)
- 💎 Bài tập Yoga chuyên sâu (HD videos)
- 💎 AI cá nhân hóa lộ trình tập
- 💎 Thống kê nâng cao & insights
- 💎 Nội dung độc quyền từ chuyên gia

### 🌐 Tech Highlights
- **Firebase Authentication**: Đăng nhập Google OAuth
- **Firestore Database**: Lưu trữ sessions, user data
- **React Context API**: Quản lý state toàn cục
- **LocalStorage**: Offline data persistence
- **Lazy Loading**: Tối ưu hiệu năng với React.lazy()
- **Responsive Design**: Mobile-first với Tailwind CSS

---

## 🚀 Cài đặt & Chạy

### 1️⃣ Yêu cầu hệ thống
- Node.js >= 20.0.0
- npm >= 8.0.0

### 2️⃣ Clone project
```bash
git clone https://github.com/yourusername/zenflow-app.git
cd zenflow-app
```

### 3️⃣ Cài đặt dependencies
```bash
npm install
```

### 4️⃣ Cấu hình Firebase
Tạo file `src/services/firebase.js` với config của bạn:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... các thông tin khác
};
```

### 5️⃣ Chạy development server
```bash
npm run dev
```
Truy cập: `http://localhost:5173`

### 6️⃣ Build production
```bash
npm run build
npm run preview
```

---

## 📂 Cấu trúc thư mục

```
zenflow-app/
├── public/
│   └── sounds/           # Âm thanh nền (stream.mp3, bell.mp3...)
├── src/
│   ├── components/
│   │   └── BottomNav.jsx           # Thanh điều hướng dưới
│   ├── contexts/
│   │   └── AppContext.jsx          # Global state management
│   ├── screens/
│   │   ├── OnboardingScreen.jsx    # Màn hình giới thiệu
│   │   ├── HomeScreen.jsx          # Trang chủ
│   │   ├── MeditationScreen.jsx    # Màn hình thiền
│   │   ├── YogaScreen.jsx          # Thư viện Yoga
│   │   ├── ScheduleScreen.jsx      # Lịch tập luyện
│   │   ├── ProfileScreen.jsx       # Hồ sơ người dùng
│   │   ├── DashboardScreen.jsx     # Thống kê chi tiết
│   │   ├── PremiumScreen.jsx       # Nâng cấp Premium
│   │   ├── MusicScreen.jsx         # Thư viện nhạc
│   │   ├── BreathworkScreen.jsx    # Bài tập thở
│   │   └── SettingsScreen.jsx      # Cài đặt
│   ├── services/
│   │   └── firebase.js             # Firebase config & auth
│   ├── utils/
│   │   ├── storage.js              # LocalStorage helpers
│   │   └── formatTime.js           # Format timer (MM:SS)
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind imports
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🎨 Screenshots

### 🏠 Trang chủ
- Hiển thị streak, stats, AI suggestions
- Quick access đến Thiền & Yoga
- Câu quote ngẫu nhiên mỗi ngày

### 🧘 Màn hình Thiền
- Vòng tròn hơi thở (inhale/exhale animation)
- Chọn thời gian: 5-30 phút
- Chọn âm thanh nền (miễn phí + premium)
- Lưu session lên Firestore

### 🌿 Thư viện Yoga
- Lọc theo cấp độ (Beginner/Intermediate/Advanced)
- Lọc theo danh mục (Buổi sáng/Giảm cân/Trị liệu...)
- Hiển thị giảng viên, rating, views

### 📊 Dashboard
- Biểu đồ phút thiền theo ngày (Recharts)
- Tổng buổi tập, phút thiền, streak
- Dữ liệu lấy từ Firestore

---

## 🔐 Firebase Setup

### 1. Tạo Firestore Collections

#### **users** collection
```javascript
{
  uid: string,
  isPremium: boolean,
  goal: string,
  mood: string,
  createdAt: timestamp
}
```

#### **sessions** collection
```javascript
{
  uid: string,
  duration: number,      // giây
  sound: string,
  createdAt: timestamp
}
```

### 2. Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

---

## 🧠 State Management Flow

```
AppContext.jsx (Global State)
├── user (Firebase Auth user)
├── isPremium (boolean)
├── meditationTimer (số giây còn lại)
├── isTimerRunning (boolean)
├── breathAnimation ('inhale' | 'exhale')
├── userStats { streak, totalSessions, totalMinutes, currentLevel }
├── selectedGoal (từ onboarding)
├── mood (từ onboarding)
├── selectedSound (âm thanh nền)
├── zenMode (chế độ tối)
└── notifications (bật/tắt nhắc nhở)
```

---

## 🎯 User Flow

```
1. Onboarding (chọn mục tiêu + tâm trạng)
   ↓
2. HomeScreen (streak, stats, gợi ý AI)
   ↓
3. Chọn Thiền hoặc Yoga
   ↓
4. Thiền: Timer → Lưu Firestore → Cập nhật stats
   Yoga: Xem video → Track progress
   ↓
5. Dashboard: Xem biểu đồ tiến trình
   ↓
6. Profile: Đăng nhập, nâng cấp Premium
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1 | UI Library |
| Vite | 7.1 | Build tool |
| Firebase | 12.4 | Auth + Database |
| Tailwind CSS | 3.4 | Styling |
| Recharts | 3.3 | Charts |
| React Router | 7.9 | Routing |
| Lucide React | 0.546 | Icons |

---

## 📝 Scripts

```bash
npm run dev      # Chạy dev server (port 5173)
npm run build    # Build production
npm run preview  # Preview production build
npm run lint     # Chạy ESLint
```

---

## 🐛 Troubleshooting

### ❌ Firebase authentication không hoạt động
- Kiểm tra `firebaseConfig` trong `firebase.js`
- Bật Google Sign-In trong Firebase Console
- Thêm domain vào Authorized domains

### ❌ Âm thanh không phát
- Đảm bảo file `.mp3` tồn tại trong `/public/sounds/`
- Browser có thể chặn autoplay → cần user interaction

### ❌ Firestore rules deny
- Kiểm tra rules trong Firebase Console
- Đảm bảo user đã đăng nhập (`request.auth != null`)

---

## 🤝 Contributing

Chúng tôi hoan nghênh mọi đóng góp!

1. Fork project
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**ZenFlow Team**

---

## 🙏 Acknowledgments

- 🎨 Design inspiration: Calm, Headspace
- 🎵 Sound effects: Freesound.org
- 📚 Meditation guides: Mindfulness Research Institute
- 🧘 Yoga instructions: Yoga Alliance

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/zenflow-app&type=Date)](https://star-history.com/#yourusername/zenflow-app&Date)

---

<div align="center">
  
  **Made with ❤️ by ZenFlow Team**
  
  ⭐ Nếu project hữu ích, đừng quên star repo! ⭐
  
</div>
