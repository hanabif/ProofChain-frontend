import React from 'react';
import { theme } from './theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clipped?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  clipped = true,
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #6F26FF 0%, #B066FE 100%)',
          color: 'white',
          border: 'none',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'white',
          border: '1px solid rgba(111, 38, 255, 0.5)',
        };
      case 'secondary':
        return {
          background: 'rgba(111, 38, 255, 0.1)',
          color: 'white',
          border: '1px solid rgba(111, 38, 255, 0.2)',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: theme.colors.primary,
          border: 'none',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-1.5 text-sm';
      case 'md':
        return 'px-6 py-2.5 text-base';
      case 'lg':
        return 'px-8 py-3.5 text-lg';
      default:
        return 'px-6 py-2.5';
    }
  };

  const clippedStyle = clipped
    ? {
        clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))',
      }
    : {};

  return (
    <button
      className={`
        relative inline-flex items-center justify-center font-header font-semibold uppercase tracking-wider
        transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${getSizeStyles()}
        ${className}
      `}
      style={{
        ...getVariantStyles(),
        ...clippedStyle,
      }}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
