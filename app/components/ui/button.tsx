// components/ui/button.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ className, variant = 'default', ...props }) => {
  let variantClasses = '';
  switch (variant) {
    case 'destructive':
      variantClasses = 'bg-red-500 text-white hover:bg-red-600';
      break;
    case 'outline':
      variantClasses = 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100';
      break;
    default:
      variantClasses = 'bg-blue-500 text-white hover:bg-blue-600';
  }

  return <button className={cn("px-4 py-2 rounded-md focus:outline-none", variantClasses, className)} {...props} />;
};

export default Button;
