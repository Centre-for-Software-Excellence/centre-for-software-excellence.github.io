import { useEffect, useRef, useState } from 'react';

export function useMousePosition(throttle = true) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const rafId = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (throttle) {
        // Cancel previous animation frame if still pending
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }

        // Schedule update for next frame
        rafId.current = requestAnimationFrame(() => {
          setMouseX(event.clientX);
          setMouseY(event.clientY);
        });
      } else {
        // Update immediately
        setMouseX(event.clientX);
        setMouseY(event.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      // Cancel any pending animation frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [throttle]);

  return { mouseX, mouseY };
}
