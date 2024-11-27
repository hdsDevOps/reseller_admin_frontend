// components/Switch.tsx
import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md'
}) => {
  // Size configurations
  const sizes = {
    sm: {
      wrapper: 'w-8 h-4',
      circle: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      wrapper: 'w-11 h-6',
      circle: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      wrapper: 'w-14 h-7',
      circle: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`
        relative inline-flex shrink-0 cursor-pointer rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${checked ? 'bg-green-500' : 'bg-gray-200'}
        ${sizes[size].wrapper}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="sr-only">Toggle switch</span>
      <span
        className={`
          pointer-events-none inline-block transform rounded-full
          bg-white shadow ring-0 transition duration-200 ease-in-out
          ${checked ? sizes[size].translate : 'translate-x-0.5'}
          ${sizes[size].circle}
        `}
      />
    </button>
  );
};

export default Switch;