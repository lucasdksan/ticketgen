import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  fullWidth = false, 
  size = "md",
  className = "",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg shadow-indigo-200",
    secondary: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-lg shadow-emerald-100",
    danger: "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-400 shadow-lg shadow-rose-100",
    outline: "bg-white border-2 border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 focus:ring-indigo-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
