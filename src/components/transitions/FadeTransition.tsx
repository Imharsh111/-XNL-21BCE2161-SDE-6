
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FadeTransitionProps {
  show: boolean;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  onExited?: () => void;
}

const FadeTransition: React.FC<FadeTransitionProps> = ({
  show,
  duration = 300,
  className,
  children,
  onExited,
}) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show && !shouldRender) {
      setShouldRender(true);
      setIsAnimating(true);
    } else if (!show && shouldRender) {
      setIsAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        setIsAnimating(false);
        onExited?.();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [show, shouldRender, duration, onExited]);

  if (!shouldRender) {
    return null;
  }

  const animationStyles = {
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(10px)',
  };

  return (
    <div
      className={cn("transition-all duration-300", className)}
      style={animationStyles}
    >
      {children}
    </div>
  );
};

export default FadeTransition;
