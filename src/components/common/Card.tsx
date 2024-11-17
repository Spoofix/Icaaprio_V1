import React from 'react';
import { CARD_STYLES } from '../../utils/constants';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`${CARD_STYLES} ${className}`}>
      {children}
    </div>
  );
}