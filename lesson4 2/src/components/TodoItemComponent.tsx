import React, { useState } from 'react';
import ItemTimerComponent from './ItemTimerComponent';

interface TodoItemProps {
  name: string;
  onTimeUpdate: (time: number) => void;
  isRunning: boolean;
  onTimerToggle: () => void;
  onTimerStop: (time: number) => void;
}

const TodoItemComponent: React.FC<TodoItemProps> = ({
  name,
  onTimeUpdate,
  isRunning,
  onTimerToggle,
  onTimerStop,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      <h3 style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{name}</h3>
      <ItemTimerComponent
        onTimeUpdate={onTimeUpdate}
        isRunning={isRunning}
        onTimerToggle={onTimerToggle}
        onTimerStop={onTimerStop}
      />
    </div>
  );
};

export default TodoItemComponent;
