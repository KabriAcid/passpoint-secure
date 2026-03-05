import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface ClickImageCanvasProps {
  imageSrc: string;
  maxPoints?: number;
  points: Point[];
  onPointsChange: (points: Point[]) => void;
  disabled?: boolean;
}

export default function ClickImageCanvas({
  imageSrc,
  maxPoints = 4,
  points,
  onPointsChange,
  disabled = false,
}: ClickImageCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || points.length >= maxPoints || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      onPointsChange([...points, { x, y }]);
    },
    [disabled, points, maxPoints, onPointsChange]
  );

  const handleReset = () => {
    onPointsChange([]);
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden border border-border cursor-crosshair select-none"
        onClick={handleClick}
      >
        <img
          src={imageSrc}
          alt="PassPoint authentication image"
          className="w-full h-auto block"
          onLoad={() => setImageLoaded(true)}
          draggable={false}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          </div>
        )}
        <AnimatePresence>
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="passpoint-marker"
              style={{
                left: `${point.x * 100}%`,
                top: `${point.y * 100}%`,
              }}
            >
              {index + 1}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {points.length}/{maxPoints} points selected
        </p>
        {points.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
