import React from 'react';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({ value, onValueChange, children, className }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { selectedValue: value, onValueChange });
        }
        return child;
      })}
    </div>
  );
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  children: React.ReactNode;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroupItem({ value, id, children, selectedValue, onValueChange }: RadioGroupItemProps) {
  return (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <input
        type="radio"
        id={id}
        name="paymentMethod"
        value={value}
        checked={selectedValue === value}
        onChange={() => onValueChange && onValueChange(value)}
        style={{ marginRight: 4 }}
      />
      {children}
    </label>
  );
} 