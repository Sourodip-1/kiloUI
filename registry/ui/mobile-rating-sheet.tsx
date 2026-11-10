"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, CheckCircle2, MessageSquare, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingCategory {
  id: string;
  label: string;
}

export interface MobileRatingSheetProps {
  isOpen?: boolean;
  title?: string;
  subtitle?: string;
  initialRating?: number;
  categories?: RatingCategory[];
  onRatingChange?: (rating: number) => void;
  onSubmit?: (data: { rating: number; selectedCategories: string[]; feedback: string }) => void;
  onDismiss?: () => void;
  className?: string;
}

const DEFAULT_CATEGORIES: RatingCategory[] = [
  { id: "fluid-ui", label: "Fluid UI" },
  { id: "speed", label: "Instant Speed" },
  { id: "haptics", label: "Tactile Haptics" },
  { id: "design", label: "Aesthetic Design" },
  { id: "privacy", label: "Private & Secure" },
];

const RATING_FEEDBACK: Record<number, string> = {
  1: "We are listening. What fell short?",
  2: "Help us understand how to improve",
  3: "Solid start — what can we polish?",
  4: "Glad you enjoyed it! What stood out?",
  5: "Exceptional! Thank you for the support!",
};

export function MobileRatingSheet({
  isOpen = true,
  title = "Enjoying Kilo Studio?",
  subtitle = "Your feedback shapes future releases and micro-interactions.",
  initialRating = 5,
  categories = DEFAULT_CATEGORIES,
  onRatingChange,
  onSubmit,
  onDismiss,
  className,
}: MobileRatingSheetProps) {
  const [rating, setRating] = React.useState(initialRating);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [selectedCats, setSelectedCats] = React.useState<string[]>(["fluid-ui", "design"]);
  const [feedback, setFeedback] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const activeRating = hoverRating !== null ? hoverRating : rating;

  const handleStarClick = (num: number) => {
    setRating(num);
    onRatingChange?.(num);
  };

  const toggleCategory = (id: string) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit?.({ rating, selectedCategories: selectedCats, feedback });
  };

  if (!isOpen) return null;

  return (
    <div className={cn("w-full max-w-sm mx-auto p-4 select-none", className)}>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full rounded-3xl bg-[#141824] border border-white/10 p-5 shadow-2xl backdrop-blur-xl overflow-hidden text-white"
      >
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#8083ff]/15 to-transparent pointer-events-none" />

        {/* Top Dismiss Button */}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss feedback prompt"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <AnimatePresence mode="wait">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
              {/* Header Icon + Titles */}
              <div className="text-center space-y-1.5 pt-1">
                <div className="mx-auto w-11 h-11 rounded-2xl bg-[#8083ff]/15 border border-[#8083ff]/30 flex items-center justify-center text-[#c0c1ff] shadow-inner mb-2">
                  <Heart className="w-5 h-5 fill-[#8083ff] text-[#8083ff]" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-white font-sans">
                  {title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-[260px] mx-auto">
                  {subtitle}
                </p>
              </div>

              {/* Interactive 5-Star Row */}
              <div className="flex flex-col items-center justify-center gap-1.5 py-1">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const isFilled = starNum <= activeRating;
                    return (
                      <motion.button
                        key={starNum}
                        type="button"
                        whileHover={{ scale: 1.25, rotate: 6 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleStarClick(starNum)}
                        onMouseEnter={() => setHoverRating(starNum)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 focus:outline-none cursor-pointer transition-colors"
                        aria-label={`Rate ${starNum} out of 5 stars`}
                      >
                        <Star
                          className={cn(
                            "w-7 h-7 transition-all duration-200",
                            isFilled
                              ? "text-amber-400 fill-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.4)]"
                              : "text-zinc-600 hover:text-zinc-400"
                          )}
                        />
                      </motion.button>
                    );
                  })}
                </div>
                <span className="text-[11px] font-mono text-[#c0c1ff] font-medium h-4">
                  {RATING_FEEDBACK[activeRating]}
                </span>
              </div>

              {/* Tag Chips */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-semibold text-zinc-400 tracking-wider">
                  What did you like most?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCats.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer",
                          isSelected
                            ? "bg-[#8083ff]/20 text-[#c0c1ff] border-[#8083ff]/50 shadow-xs"
                            : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                        )}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Text Message */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Note (optional)
                  </span>
                  <span>{feedback.length}/140</span>
                </div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value.slice(0, 140))}
                  placeholder="Tell us what you'd love to see next..."
                  rows={2}
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8083ff]/60 resize-none transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center gap-2">
                {onDismiss && (
                  <button
                    type="button"
                    onClick={onDismiss}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    Maybe Later
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#8083ff] hover:bg-[#6c70ff] text-xs font-bold text-white shadow-lg shadow-[#8083ff]/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          ) : (
            /* Thank You State */
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8 text-center space-y-3"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-white">Thank You!</h4>
                <p className="text-xs text-zinc-400 max-w-[240px] mx-auto">
                  Your feedback has been logged directly into our release telemetry.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-[11px] font-mono text-[#8083ff] hover:underline cursor-pointer"
              >
                Edit your review
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

