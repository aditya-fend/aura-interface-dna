// src/components/OrientationGuard.tsx
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function OrientationGuard() {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const check = () => {
      const ua = navigator.userAgent.toLowerCase();

      const isMobile = /android|iphone|ipad|ipod|mobile|tablet/i.test(ua);

      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      const isSmallScreen = window.innerWidth < 1024;

      // 🚨 BLOCK CONDITION
      if (isMobile || isTouchDevice || isSmallScreen) {
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
      }
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isBlocked) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white text-center p-6">
      <div className="max-w-sm flex flex-col items-center">
        <Icon icon="mdi:laptop" width="48" />
        <h2 className="mt-3 mb-2 text-lg">Desktop Only Experience</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Aura is currently optimized for desktop screens.
          <br />
          Mobile and tablet support is coming soon.
        </p>{" "}
      </div>
    </div>
  );
}
