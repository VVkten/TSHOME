import React, { useState, useEffect } from 'react';

interface ItemTimerProps {
  onTimeUpdate: (time: number) => void;
  onTimerStop: (time: number) => void;
  isRunning: boolean;
  onTimerToggle: () => void;
}

const ItemTimerComponent: React.FC<ItemTimerProps> = ({
  onTimeUpdate,
  onTimerStop,
  isRunning,
  onTimerToggle,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          onTimeUpdate(newTime); 
          return newTime;
        });
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
        onTimerStop(time); 
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time, onTimeUpdate, onTimerStop]);

  return (
    <div>
      <button onClick={onTimerToggle}>
        {isRunning ? 'Stop Timer' : 'Start Timer'}
      </button>
      <p>Time: {time} seconds</p>
    </div>
  );
};

export default ItemTimerComponent;
