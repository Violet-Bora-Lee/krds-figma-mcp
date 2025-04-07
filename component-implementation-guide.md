# KRDS 컴포넌트 구현 가이드

이 문서는 KRDS 디자인 시스템에 따른 컴포넌트 구현 가이드입니다. 테일윈드 CSS를 활용하여 디자인 시스템의 컴포넌트를 구현하는 방법을 설명합니다.

## 목차

- [일반 가이드라인](#일반-가이드라인)
- [버튼 컴포넌트](#버튼-컴포넌트)
  - [Button](#button)
  - [Button_text (텍스트 버튼)](#button_text-텍스트-버튼)
- [데모 페이지](#데모-페이지)
- [컬러 시스템](#컬러-시스템)

## 일반 가이드라인

컴포넌트는 재사용 가능한 디자인 요소로, 일관성을 유지하며 효율적으로 디자인 작업을 수행할 수 있도록 돕습니다. 아토믹 컴포넌트를 직접 사용하지 않는 것을 권장합니다. 아토믹 컴포넌트를 직접 사용하는 경우 디자인 시스템의 일관성을 해칠 수 있으며, 유지보수의 복잡성을 증가시킬 수 있습니다.

## 버튼 컴포넌트

본 구현에서는 일반 버튼과 텍스트 버튼을 하나의 통합된 `Button` 컴포넌트로 구현했습니다. `isTextOnly` 속성을 통해 두 스타일을 구분합니다.

### Button

버튼은 사용자 과업과 플로우의 중요도에 따라 위계를 구분하여 사용합니다.

#### 타입 (Type)

버튼은 Primary, Secondary, Tertiary 세 가지 타입이 있습니다. 각 타입에 따라 테일윈드 클래스를 다르게 적용합니다.

```jsx
// Primary Button (variant="primary")
<Button variant="primary">Primary</Button>

// Secondary Button (variant="secondary")
<Button variant="secondary">Secondary</Button>

// Tertiary Button (variant="tertiary")
<Button variant="tertiary">Tertiary</Button>
```

#### 크기 (Size)

버튼은 XLarge, Large, Medium, Small, XSmall 다섯 가지 크기가 있습니다.

```jsx
// XLarge Button
<Button size="xlarge">XLarge</Button>

// Large Button
<Button size="large">Large</Button>

// Medium Button
<Button size="medium">Medium</Button>

// Small Button
<Button size="small">Small</Button>

// XSmall Button
<Button size="xsmall">XSmall</Button>
```

#### 상태 (State)

버튼은 Default, Hover, Pressed, Disabled 네 가지 상태를 가집니다. 상태에 따른 스타일은 Tailwind의 상태 클래스(hover:, active:, disabled:)를 사용하여 구현합니다.

```jsx
// 기본 상태
<Button>Default</Button>

// 비활성화 상태
<Button disabled={true}>Disabled</Button>

// hover와 active 상태는 CSS pseudo-class를 통해 자동으로 적용됩니다
```

#### 아이콘 (Icon)

버튼에는 왼쪽, 오른쪽 또는 양쪽에 아이콘을 배치할 수 있습니다.

```jsx
// Left Icon Button
<Button leftIcon={<IconDownload className="w-5 h-5" />}>
  Left Icon
</Button>

// Right Icon Button
<Button rightIcon={<IconArrowRight className="w-5 h-5" />}>
  Right Icon
</Button>

// Both Icon Button
<Button 
  leftIcon={<IconDownload className="w-5 h-5" />}
  rightIcon={<IconArrowRight className="w-5 h-5" />}
>
  Both Icons
</Button>
```

### Button_text (텍스트 버튼)

텍스트 버튼은 배경이 없는 버튼으로, 주로 부가적인 액션에 사용합니다. 통합 버튼 컴포넌트에서는 `isTextOnly` 속성을 통해 구현됩니다.

```jsx
// 기본 텍스트 버튼
<Button isTextOnly>Default</Button>

// 크기별 텍스트 버튼
<Button isTextOnly size="large">Large</Button>
<Button isTextOnly size="medium">Medium</Button>
<Button isTextOnly size="small">Small</Button>
<Button isTextOnly size="xsmall">XSmall</Button>

// 아이콘이 있는 텍스트 버튼
<Button isTextOnly leftIcon={<IconDownload className="w-5 h-5" />}>
  Left Icon
</Button>
```

## 컴포넌트 구현 예시

아래는 실제 구현된 Button 컴포넌트입니다:

```tsx
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
```

## 아이콘 컴포넌트

버튼에서 사용할 수 있는 아이콘 컴포넌트도 함께 구현했습니다:

```tsx
import React from 'react';

interface IconProps {
  className?: string;
}

export const IconDownload: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 3V16M12 16L7 11M12 16L17 11M21 21H3" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconArrowRight: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M5 12H19M19 12L13 6M19 12L13 18" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
```

## 데모 페이지

프로젝트에는 버튼 컴포넌트의 다양한 옵션을 시각적으로 확인할 수 있는 데모 페이지가 포함되어 있습니다. 이 페이지는 다음 경로에서 확인할 수 있습니다:

```
/src/pages/ButtonDemo.tsx
```

데모 페이지는 다음 섹션으로 구성되어 있습니다:

1. **타입 (Type)** - Primary, Secondary, Tertiary 버튼
2. **크기 (Size)** - XLarge, Large, Medium, Small, XSmall 버튼
3. **상태 (State)** - Default, Disabled 상태 (체크박스로 토글 가능)
4. **아이콘 (Icon)** - 왼쪽, 오른쪽, 양쪽 아이콘 버튼
5. **텍스트 버튼 (Text Button)** - 다양한 크기의 텍스트 버튼
6. **텍스트 버튼 아이콘 (Text Button Icon)** - 아이콘이 있는 텍스트 버튼

## 컬러 시스템

테일윈드 설정에 정의된 색상 팔레트를 사용하여 컴포넌트를 구현합니다. 주요 색상 카테고리는 다음과 같습니다:

- **gray**: 중립적인 색상으로 텍스트, 배경 등에 사용
- **primary**: 주요 브랜드 색상, 강조가 필요한 요소에 사용
- **secondary**: 보조 브랜드 색상, 시각적 계층 구조를 만들기 위해 사용
- **accent**: 강조 색상, 중요한 정보나 액션을 나타낼 때 사용
- **system**: 상태 표시(경고, 성공, 오류, 정보)를 위한 색상

각 색상 카테고리는 0(흰색)부터 100(검정)까지의 명도 단계를 가지고 있으며, 접근성과 가독성을 고려하여 적절한 대비를 유지해야 합니다.

## 타입스크립트 사용 가이드

컴포넌트 구현 시 타입스크립트를 활용하여 타입 안전성을 확보하는 것이 좋습니다. 특히 다음 타입 정의 패턴을 활용하세요:

1. **Union 타입**을 사용하여 제한된 옵션을 정의:
   ```typescript
   type ButtonType = 'primary' | 'secondary' | 'tertiary';
   type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
   ```

2. **Record 타입**을 사용하여 객체 인덱싱 시 타입 안전성 확보:
   ```typescript
   const variantClasses: Record<ButtonType, string> = {
     primary: '...',
     secondary: '...',
     tertiary: '...'
   };
   ```

3. **React 타입 확장**으로 기존 HTML 요소 속성 확장:
   ```typescript
   interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: ButtonType;
     size?: ButtonSize;
     // 추가 속성들...
   }
   ```