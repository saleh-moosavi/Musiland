"use client";

import { useEffect, useState } from "react";
import { formatTimeAgo } from "@/libs/timeAgo";

export default function TimeAgo({ date }: { date: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatTimeAgo(date));
  }, [date]);

  return (
    <span className="text-xs text-my-black-med dark:text-my-black-low">
      ({time} ago)
    </span>
  );
}
