import React, { useState } from 'react';
import Button from '../components/Button';
import { IconDownload, IconArrowRight } from '../components/Icon';

export const ButtonDemo: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-5 p-8">
      <div className="max-w-5xl mx-auto bg-gray-0 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-90 mb-6">버튼 컴포넌트 데모</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-80 mb-4">타입 (Type)</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-80 mb-4">크기 (Size)</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xlarge">XLarge</Button>
            <Button size="large">Large</Button>
            <Button size="medium">Medium</Button>
            <Button size="small">Small</Button>
            <Button size="xsmall">XSmall</Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-80 mb-4">상태 (State)</h2>
          <div className="mb-4">
            <label className="flex items-center">
              <input 
                type="checkbox"
                checked={isDisabled}
                onChange={() => setIsDisabled(!isDisabled)}
                className="mr-2"
              />
              <span>버튼 비활성화</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button disabled={isDisabled}>Default</Button>
            <Button variant="secondary" disabled={isDisabled}>Secondary</Button>
            <Button variant="tertiary" disabled={isDisabled}>Tertiary</Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-80 mb-4">아이콘 (Icon)</h2>
          <div className="flex flex-wrap gap-4">
            <Button leftIcon={<IconDownload className="w-5 h-5" />}>
              Left Icon
            </Button>
            <Button rightIcon={<IconArrowRight className="w-5 h-5" />}>
              Right Icon
            </Button>
            <Button 
              leftIcon={<IconDownload className="w-5 h-5" />}
              rightIcon={<IconArrowRight className="w-5 h-5" />}
            >
              Both Icons
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-80 mb-4">텍스트 버튼 (Text Button)</h2>
          <div className="flex flex-wrap gap-4">
            <Button isTextOnly>Default</Button>
            <Button isTextOnly size="large">Large</Button>
            <Button isTextOnly size="medium">Medium</Button>
            <Button isTextOnly size="small">Small</Button>
            <Button isTextOnly size="xsmall">XSmall</Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-80 mb-4">텍스트 버튼 아이콘 (Text Button Icon)</h2>
          <div className="flex flex-wrap gap-4">
            <Button isTextOnly leftIcon={<IconDownload className="w-5 h-5" />}>
              Left Icon
            </Button>
            <Button isTextOnly rightIcon={<IconArrowRight className="w-5 h-5" />}>
              Right Icon
            </Button>
            <Button 
              isTextOnly
              leftIcon={<IconDownload className="w-5 h-5" />}
              rightIcon={<IconArrowRight className="w-5 h-5" />}
            >
              Both Icons
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;