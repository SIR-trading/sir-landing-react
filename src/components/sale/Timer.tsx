"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

const MS_PER_SECOND = 1000;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;

interface TimerProps {
  startDate: number;
  daysDuration: number;
  noDays?: boolean;
}

const Timer = ({ startDate, daysDuration, noDays = false }: TimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  const endDate = useMemo(() => {
    return (
      startDate * MS_PER_SECOND + MS_PER_SECOND * SECONDS_PER_DAY * daysDuration
    );
  }, [startDate, daysDuration]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      setTimeRemaining(Math.max(0, endDate - now)); // Prevent negative time
    };

    updateTimer(); // Initial update
    const interval = setInterval(updateTimer, MS_PER_SECOND);

    return () => clearInterval(interval);
  }, [endDate]);

  const formatTime = useCallback((totalSeconds: number): string => {
    const days = String(Math.floor(totalSeconds / SECONDS_PER_DAY)).padStart(
      2,
      "0",
    );
    const remainingSecondsAfterDays = totalSeconds % SECONDS_PER_DAY;
    const hours = String(
      Math.floor(remainingSecondsAfterDays / SECONDS_PER_HOUR),
    ).padStart(2, "0");
    const minutes = String(
      Math.floor(
        (remainingSecondsAfterDays % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
      ),
    ).padStart(2, "0");
    const seconds = String(
      Math.floor(remainingSecondsAfterDays % SECONDS_PER_MINUTE),
    ).padStart(2, "0");

    return noDays
      ? `${hours}:${minutes}:${seconds}`
      : `${days}:${hours}:${minutes}:${seconds}`;
  }, [noDays]);

  const timer = useMemo(() => {
    const totalSeconds = Math.floor(timeRemaining / MS_PER_SECOND);
    return formatTime(totalSeconds);
  }, [timeRemaining, formatTime]);

  return (
    <div>
      <label className="cursor-pointer text-xs">{timer}</label>
    </div>
  );
};

export default Timer;
