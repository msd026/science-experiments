// components/ui/slider.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  return <input type="range" className={cn("w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer", className)} {...props} />;
};

export default Slider;
