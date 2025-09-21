import React from 'react';

type BadgeColor = 'gray' | 'blue' | 'green' | 'yellow' | 'red' | 'orange';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: 'sm' | 'md';
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  gray: 'bg-gray-100 text-gray-800',
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  orange: 'bg-orange-100 text-orange-800'
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm'
};

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = 'gray', 
  size = 'md',
  className = '' 
}) => {
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${colorClasses[color]}
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;