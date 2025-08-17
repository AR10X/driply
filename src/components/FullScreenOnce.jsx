import React, { useEffect, useRef } from "react";

const FullscreenOnce = ({ children }) => {
  const firedRef = useRef(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (firedRef.current) return;

    const isInFullscreen = () => (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );

    const requestFullScreen = (el) => {
      if (el.requestFullscreen) return el.requestFullscreen();
      if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
      if (el.msRequestFullscreen) return el.msRequestFullscreen();
      return Promise.reject(new Error("Fullscreen API not supported"));
    };

    const enterFullscreen = () => {
      if (isInFullscreen()) {
        firedRef.current = true;
        return;
      }

      const el = wrapperRef.current || document.documentElement;
      
      requestFullScreen(el).catch(err => {
        console.error("Fullscreen error:", err);
      }).finally(() => {
        firedRef.current = true;
      });
    };

    // Try immediately on component mount
    enterFullscreen();

    // Also set up click handler as fallback
    const handleInteraction = () => {
      if (!firedRef.current) {
        enterFullscreen();
      }
    };

    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="min-h-screen w-full"
      style={{ backgroundColor: 'inherit' }}
    >
      {children}
    </div>
  );
};

export default FullscreenOnce;