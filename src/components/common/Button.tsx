import React from 'react';
import { BUTTON_STYLES } from '../../utils/constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`${BUTTON_STYLES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}