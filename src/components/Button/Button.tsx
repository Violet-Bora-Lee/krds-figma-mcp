import React from 'react';
import classNames from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isTextOnly?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  isTextOnly = false,
  children,
  className,
  disabled,
  ...props
}) => {
  // 일반 버튼 스타일
  const variantClasses: Record<ButtonType, string> = {
    primary: 'bg-primary-50 text-gray-0 hover:bg-primary-40 active:bg-primary-70',
    secondary: 'bg-primary-5 text-primary-60 border border-primary-50 hover:bg-primary-10 active:bg-primary-20',
    tertiary: 'bg-transparent text-gray-80 border border-gray-40 hover:border-gray-50 hover:bg-gray-5 active:bg-gray-10'
  };

  // 텍스트 버튼 스타일
  const textVariantClasses: Record<ButtonType, string> = {
    primary: 'text-primary-60 hover:bg-gray-5 active:bg-gray-10',
    secondary: 'text-gray-80 hover:bg-gray-5 active:bg-gray-10',
    tertiary: 'text-gray-60 hover:bg-gray-5 active:bg-gray-10'
  };

  // 일반 버튼 크기
  const sizeClasses: Record<ButtonSize, string> = {
    xlarge: 'h-16 px-6 text-lg rounded-lg',
    large: 'h-14 px-5 text-lg rounded-lg',
    medium: 'h-12 px-4 text-base rounded-md',
    small: 'h-10 px-3 text-sm rounded-md',
    xsmall: 'h-8 px-3 text-sm rounded-md'
  };

  // 텍스트 버튼 크기
  const textSizeClasses: Record<ButtonSize, string> = {
    large: 'text-lg',
    medium: 'h-8 px-0.5 text-base',
    small: 'h-6 px-0.5 text-sm',
    xsmall: 'h-5 px-0.5 text-sm',
    xlarge: 'text-lg' // 텍스트 버튼에는 xlarge가 없지만 타입 호환성을 위해 추가
  };

  // 비활성화 스타일
  const disabledClasses = isTextOnly 
    ? 'disabled:text-gray-40' 
    : 'disabled:bg-gray-10 disabled:text-gray-40 disabled:border-gray-10';

  return (
    <button
      className={classNames(
        'flex items-center justify-center gap-1 transition-colors',
        isTextOnly ? textVariantClasses[variant] : variantClasses[variant],
        isTextOnly ? textSizeClasses[size] : sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;