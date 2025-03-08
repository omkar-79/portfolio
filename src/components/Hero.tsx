'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 0.8,
          color: 0x49c5b6,
          backgroundColor: 0x222829,
          points: 10.0,
          maxDistance: 19.0,
          spacing: 15.0,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="w-full h-screen relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-poppins">
        <h1 className="text-4xl md:text-8xl mb-4 text-white" style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}>
          Omkar Balekundri
        </h1>
        <p className="text-l md:text-xl text-gray-300">
          Software Engineering and Machine Learning
        </p>
      </div>
    </div>
  );
}