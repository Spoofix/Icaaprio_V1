import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center">
      <Shield className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-blue-600 dark:text-blue-400 mr-2`} />
      <span className={`font-bold text-blue-600 dark:text-blue-400 ${sizeClasses[size]}`}>
        ICAAPrio
      </span>
    </div>
  );
}