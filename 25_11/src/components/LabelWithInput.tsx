import React from "react";

// Оголошення типів для пропсів
interface LabelWithInputProps {
  id: string;
  labelText: string;
  inputType: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Тип для обробника події
}

const LabelWithInput: React.FC<LabelWithInputProps> = ({
  id,
  labelText,
  inputType,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type={inputType} value={value} onChange={onChange} />
    </div>
  );
};

export default LabelWithInput;
