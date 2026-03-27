// src/components/OrientationGuard.tsx
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function OrientationGuard() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white text-center p-5">
      <div className="max-w-xs flex flex-col items-center">
        <Icon icon="mdi:rotate-3d-variant" width="48" />
        <h2 className="mt-3 mb-2 text-lg">Better in Landscape</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          This experience is designed for wider screens.
          <br />
          Please rotate your device or open on desktop.
        </p>
      </div>
    </div>
  );
}
