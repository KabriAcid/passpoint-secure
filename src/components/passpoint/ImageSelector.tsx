import { motion } from "framer-motion";
import image1 from "@/assets/passpoint-image1.jpg";
import image2 from "@/assets/passpoint-image2.jpg";
import image3 from "@/assets/passpoint-image3.jpg";

export const PASSPOINT_IMAGES: Record<string, string> = {
  image1,
  image2,
  image3,
};

interface ImageSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function ImageSelector({ selected, onSelect }: ImageSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-muted-foreground">Select a security image</label>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(PASSPOINT_IMAGES).map(([id, src]) => (
          <motion.button
            key={id}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(id)}
            className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-square ${
              selected === id
                ? "border-accent shadow-[0_0_12px_hsl(145_60%_45%/0.3)]"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <img src={src} alt={`Security image ${id}`} className="w-full h-full object-cover" />
            {selected === id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-accent/10 flex items-center justify-center"
              >
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
