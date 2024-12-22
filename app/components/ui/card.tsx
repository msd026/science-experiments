// components/ui/card.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return <div className={cn("bg-white shadow rounded-lg p-4", className)} {...props} />;
};

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("mb-4", className)} {...props} />;
};

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => {
  return <h3 className={cn("text-xl font-semibold", className)} {...props} />;
};

const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => {
  return <p className={cn("text-gray-600", className)} {...props} />;
};

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("mt-2", className)} {...props} />;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
