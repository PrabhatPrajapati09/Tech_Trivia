import React from 'react';

const Card = ({ children, className = '', title, style }) => {
    return (
        <div className={`glass-strong p-6 flex flex-col gap-4 hover:shadow-elegant-lg transition-all duration-300 hover:scale-[1.02] ${className}`} style={style}>
            {title && (
                <h3 className="text-xl font-bold mb-2 text-gradient-primary">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

export default Card;
