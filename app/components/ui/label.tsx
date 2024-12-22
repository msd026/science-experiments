// components/ui/label.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return <label className={cn("block text-sm font-medium text-gray-700", className)} {...props} />;
};

export default Label;
