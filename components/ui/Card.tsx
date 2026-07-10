import { HTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-[#111114] border border-white/10 rounded-[20px] p-[28px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] ${
          hoverable ? "transition-all duration-300 hover:bg-[#141418] hover:border-white/15 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

type MotionCardProps = CardProps & HTMLMotionProps<"div">;

export const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className = "", hoverable = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`bg-[#111114] border border-white/10 rounded-[20px] p-[28px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] ${className}`}
        whileHover={hoverable ? {
          y: -2,
          backgroundColor: "#141418",
          borderColor: "rgba(255,255,255,0.15)",
          boxShadow: "0 12px 32px -12px rgba(0,0,0,0.6)",
        } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionCard.displayName = "MotionCard";
