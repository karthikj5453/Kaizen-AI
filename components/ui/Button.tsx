import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all cursor-pointer rounded-xl";
    
    const variants = {
      primary: "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-[0_4px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_16px_rgba(139,92,246,0.4)] border border-white/10 hover:-translate-y-[1px]",
      secondary: "bg-[#18181B] text-[#FAFAFA] border border-white/10 hover:bg-[#141418] hover:border-white/20",
      ghost: "bg-transparent text-[#D4D4D8] border border-transparent hover:text-[#FAFAFA] hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-[13px]",
      md: "px-6 py-3 text-[15px]",
      lg: "px-8 py-4 text-[16px]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Framer Motion version
type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">;

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all cursor-pointer rounded-xl";
    
    const variants = {
      primary: "bg-[#8B5CF6] text-white border border-white/10",
      secondary: "bg-[#18181B] text-[#FAFAFA] border border-white/10",
      ghost: "bg-transparent text-[#D4D4D8] border border-transparent",
    };

    const sizes = {
      sm: "px-4 py-2 text-[13px]",
      md: "px-6 py-3 text-[15px]",
      lg: "px-8 py-4 text-[16px]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={variant === "primary" ? { y: -1, boxShadow: "0 6px 16px rgba(139,92,246,0.4)", backgroundColor: "#7C3AED" } : variant === "secondary" ? { backgroundColor: "#141418", borderColor: "rgba(255,255,255,0.2)" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#FAFAFA" }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        style={variant === "primary" ? { boxShadow: "0 4px 12px rgba(139,92,246,0.3)" } : undefined}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MotionButton.displayName = "MotionButton";
