import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "purple" | "success" | "warning" | "danger";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "outline", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center px-[12px] py-[4px] rounded-full text-[13px] font-medium whitespace-nowrap";
    
    const variants = {
      outline: "bg-white/[0.03] border border-white/10 text-[#D4D4D8]",
      purple: "bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 text-[#C084FC]",
      success: "bg-[#10B981]/10 border border-[#10B981]/25 text-[#34D399]",
      warning: "bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#FCD34D]",
      danger: "bg-[#EF4444]/10 border border-[#EF4444]/25 text-[#F87171]",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
