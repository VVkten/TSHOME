import React from 'react';

interface TotalTimerProps {
  totalTime: number;
}

const TotalTimerComponent: React.FC<TotalTimerProps> = ({ totalTime }) => {
  return <h2>Total Time: {totalTime} seconds</h2>;
};

export default TotalTimerComponent;
