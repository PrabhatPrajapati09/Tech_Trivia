import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95";

    const variants = {
        primary: "bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-lg shadow-primary/40 hover:shadow-glow",
        secondary: "bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white shadow-lg shadow-secondary/40 hover:shadow-glow-pink",
        outline: "border-2 border-slate-600 hover:border-primary text-slate-300 hover:text-primary bg-transparent hover:bg-primary/10",
        ghost: "text-text-muted hover:text-text hover:bg-surface-light/50 bg-transparent backdrop-blur-sm"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
