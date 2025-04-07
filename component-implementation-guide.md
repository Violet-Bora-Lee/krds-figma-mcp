# KRDS 컴포넌트 구현 가이드

이 문서는 KRDS 디자인 시스템에 따른 컴포넌트 구현 가이드입니다. 테일윈드 CSS를 활용하여 디자인 시스템의 컴포넌트를 구현하는 방법을 설명합니다.

## 목차

- [일반 가이드라인](#일반-가이드라인)
- [버튼 컴포넌트](#버튼-컴포넌트)
  - [Button](#button)
  - [Button_text](#button_text)

## 일반 가이드라인

컴포넌트는 재사용 가능한 디자인 요소로, 일관성을 유지하며 효율적으로 디자인 작업을 수행할 수 있도록 돕습니다. 아토믹 컴포넌트를 직접 사용하지 않는 것을 권장합니다. 아토믹 컴포넌트를 직접 사용하는 경우 디자인 시스템의 일관성을 해칠 수 있으며, 유지보수의 복잡성을 증가시킬 수 있습니다.

## 버튼 컴포넌트

### Button

버튼은 사용자 과업과 플로우의 중요도에 따라 위계를 구분하여 사용합니다.

#### 타입 (Type)

버튼은 Primary, Secondary, Tertiary 세 가지 타입이 있습니다. 각 타입에 따라 테일윈드 클래스를 다르게 적용합니다.

```jsx
// Primary Button
<button className="bg-primary-50 text-gray-0 hover:bg-primary-40 active:bg-primary-70 disabled:bg-gray-10 disabled:text-gray-40 rounded-lg">
  primary
</button>

// Secondary Button
<button className="bg-primary-5 text-primary-60 border border-primary-50 hover:bg-primary-10 active:bg-primary-20 disabled:bg-gray-10 disabled:text-gray-40 disabled:border-gray-10 rounded-lg">
  secondary
</button>

// Tertiary Button
<button className="bg-transparent text-gray-80 border border-gray-40 hover:border-gray-50 hover:bg-gray-5 active:bg-gray-10 disabled:bg-transparent disabled:text-gray-40 disabled:border-gray-20 rounded-lg">
  tertiary
</button>
```

#### 크기 (Size)

버튼은 XLarge, Large, Medium, Small, XSmall 다섯 가지 크기가 있습니다.

```jsx
// XLarge Button (h-16, text-lg)
<button className="h-16 px-6 text-lg rounded-lg">xlarge</button>

// Large Button (h-14, text-lg)
<button className="h-14 px-5 text-lg rounded-lg">large</button>

// Medium Button (h-12, text-base)
<button className="h-12 px-4 text-base rounded-md">medium</button>

// Small Button (h-10, text-sm)
<button className="h-10 px-3 text-sm rounded-md">small</button>

// XSmall Button (h-8, text-sm)
<button className="h-8 px-3 text-sm rounded-md">xsmall</button>
```

#### 상태 (State)

버튼은 Default, Hover, Pressed, Disabled 네 가지 상태를 가집니다. 상태에 따른 스타일은 Tailwind의 상태 클래스(hover:, active:, disabled:)를 사용하여 구현합니다.

```jsx
<button 
  className="
    bg-primary-50 text-gray-0 rounded-lg
    hover:bg-primary-40 
    active:bg-primary-70 
    disabled:bg-gray-10 disabled:text-gray-40
  "
  disabled={isDisabled}
>
  버튼 텍스트
</button>
```

#### 아이콘 (Icon)

버튼에는 왼쪽, 오른쪽 또는 양쪽에 아이콘을 배치할 수 있습니다.

```jsx
// Left Icon Button
<button className="flex items-center gap-1 bg-primary-50 text-gray-0 rounded-lg">
  <IconDownload className="w-5 h-5" />
  <span>left icon</span>
</button>

// Right Icon Button
<button className="flex items-center gap-1 bg-primary-50 text-gray-0 rounded-lg">
  <span>right icon</span>
  <IconArrowRight className="w-5 h-5" />
</button>

// Both Icon Button
<button className="flex items-center gap-1 bg-primary-50 text-gray-0 rounded-lg">
  <IconDownload className="w-5 h-5" />
  <span>both icon</span>
  <IconArrowRight className="w-5 h-5" />
</button>
```

### Button_text

텍스트 버튼은 배경이 없는 버튼으로, 주로 부가적인 액션에 사용합니다.

#### 크기 (Size)

텍스트 버튼은 Large, Medium, Small, XSmall 네 가지 크기가 있습니다.

```jsx
// Large Button Text (text-lg)
<button className="text-lg text-gray-80">large</button>

// Medium Button Text (h-8, text-base)
<button className="h-8 px-0.5 text-base text-gray-80">medium</button>

// Small Button Text (h-6, text-sm)
<button className="h-6 px-0.5 text-sm text-gray-80">small</button>

// XSmall Button Text (h-5, text-sm)
<button className="h-5 px-0.5 text-sm text-gray-80">xsmall</button>
```

#### 상태 (State)

텍스트 버튼은 Default, Hover, Pressed, Disabled 네 가지 상태를 가집니다.

```jsx
<button 
  className="
    text-gray-80 
    hover:bg-gray-5 
    active:bg-gray-10 
    disabled:text-gray-40
  "
  disabled={isDisabled}
>
  버튼 텍스트
</button>
```

#### 아이콘 (Icon)

텍스트 버튼에도 왼쪽, 오른쪽 또는 양쪽에 아이콘을 배치할 수 있습니다.

```jsx
// Left Icon Button Text
<button className="flex items-center gap-1 text-gray-80">
  <IconDownload className="w-5 h-5 text-gray-70" />
  <span>left icon</span>
</button>

// Right Icon Button Text
<button className="flex items-center gap-1 text-gray-80">
  <span>right icon</span>
  <IconArrowRight className="w-5 h-5 text-gray-70" />
</button>

// Both Icon Button Text
<button className="flex items-center gap-1 text-gray-80">
  <IconDownload className="w-5 h-5 text-gray-70" />
  <span>both icon</span>
  <IconArrowRight className="w-5 h-5 text-gray-70" />
</button>
```

## 컴포넌트 구현 예시

아래는 React와 TypeScript를 사용한 Button 컴포넌트 구현 예시입니다:

```tsx
import React from 'react';
import classNames from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  const typeClasses = {
    primary: 'bg-primary-50 text-gray-0 hover:bg-primary-40 active:bg-primary-70',
    secondary: 'bg-primary-5 text-primary-60 border border-primary-50 hover:bg-primary-10 active:bg-primary-20',
    tertiary: 'bg-transparent text-gray-80 border border-gray-40 hover:border-gray-50 hover:bg-gray-5 active:bg-gray-10'
  };

  const sizeClasses = {
    xlarge: 'h-16 px-6 text-lg rounded-lg',
    large: 'h-14 px-5 text-lg rounded-lg',
    medium: 'h-12 px-4 text-base rounded-md',
    small: 'h-10 px-3 text-sm rounded-md',
    xsmall: 'h-8 px-3 text-sm rounded-md'
  };

  const disabledClasses = 'disabled:bg-gray-10 disabled:text-gray-40 disabled:border-gray-10';

  return (
    <button
      className={classNames(
        'flex items-center justify-center gap-1 transition-colors',
        typeClasses[type],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};
```

## 컬러 시스템

테일윈드 설정에 정의된 색상 팔레트를 사용하여 컴포넌트를 구현합니다. 주요 색상 카테고리는 다음과 같습니다:

- **gray**: 중립적인 색상으로 텍스트, 배경 등에 사용
- **primary**: 주요 브랜드 색상, 강조가 필요한 요소에 사용
- **secondary**: 보조 브랜드 색상, 시각적 계층 구조를 만들기 위해 사용
- **accent**: 강조 색상, 중요한 정보나 액션을 나타낼 때 사용
- **system**: 상태 표시(경고, 성공, 오류, 정보)를 위한 색상

각 색상 카테고리는 0(흰색)부터 100(검정)까지의 명도 단계를 가지고 있으며, 접근성과 가독성을 고려하여 적절한 대비를 유지해야 합니다.