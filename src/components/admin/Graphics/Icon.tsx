'use client';

import React from 'react';
import { cn } from "src/utilities/cn";

interface IconProps {
  size?: 'sm' | 'lg';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ size = 'sm', className }) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-lg",
        "bg-primary/10 text-primary",
        size === 'sm' ? "h-8 w-8" : "h-12 w-12",
        "transition-all duration-200",
        "hover:bg-primary/15",
        className
      )}
    >
      {/* Replace with your actual logo SVG */}
      <span 
        className={cn(
          "font-bold",
          size === 'sm' ? "text-lg" : "text-xl"
        )}
      >
        A&D
      </span>
    </div>
  );
};

export default Icon;
