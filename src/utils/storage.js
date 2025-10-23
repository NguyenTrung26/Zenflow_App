// src/utils/storage.js
export const save = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error("Lỗi lưu localStorage:", err);
    }
};

export const load = (key, fallback) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch (err) {
        console.error("Lỗi đọc localStorage:", err);
        return fallback;
    }
};
