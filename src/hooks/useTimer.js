import { useState, useEffect } from "react";

/**
 * Hook đếm giờ (timer)
 * @param {number} initial - thời gian ban đầu (tính bằng giây)
 */
export default function useTimer(initial = 300) {
    const [time, setTime] = useState(initial);
    const [running, setRunning] = useState(false);

    // Đếm lùi mỗi giây khi running = true
    useEffect(() => {
        if (!running) return;
        const interval = setInterval(() => {
            setTime((t) => Math.max(t - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [running]);

    // Reset lại thời gian về ban đầu
    const reset = () => setTime(initial);

    // Chuyển giây → phút:giây
    const formatTime = (t) => {
        const m = Math.floor(t / 60);
        const s = t % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return { time, setTime, running, setRunning, reset, formatTime };
}
