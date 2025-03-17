import React, { useState, useEffect } from 'react';
import TodoItemComponent from './TodoItemComponent';

const TodoListComponent: React.FC = () => {
  const [todoItems, setTodoItems] = useState<{ name: string; time: number; isRunning: boolean }[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [newItemName, setNewItemName] = useState('');

  // Оновлюємо загальний час кожен раз, коли змінюється час одного з елементів
  const updateTotalTime = () => {
    const total = todoItems.reduce((acc, item) => acc + item.time, 0);
    setTotalTime(total);
  };

  useEffect(() => {
    updateTotalTime();
  }, [todoItems]);

  const addTodoItem = (name: string) => {
    if (name.trim()) {
      setTodoItems([...todoItems, { name, time: 0, isRunning: false }]);
      setNewItemName('');
    }
  };

  // Функція для оновлення часу одного елемента
  const handleTimeUpdate = (index: number, time: number) => {
    setTodoItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].time = time;
      return updatedItems;
    });
  };

  // Функція для зупинки таймера для конкретного елемента
  const stopTimer = (index: number, time: number) => {
    setTodoItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].time = time;
      return updatedItems;
    });
  };

  // Функція для перемикання таймера
  const toggleTimer = (index: number) => {
    setTodoItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isRunning: !item.isRunning } : item
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Enter task name"
      />
      <button onClick={() => addTodoItem(newItemName)} disabled={!newItemName}>
        Create Todo Item
      </button>

      <p>Total Time: {totalTime} seconds</p>

      {todoItems.map((item, index) => (
        <div key={index}>
          <TodoItemComponent
            name={item.name}
            onTimeUpdate={(time) => handleTimeUpdate(index, time)} 
            isRunning={item.isRunning}
            onTimerToggle={() => toggleTimer(index)}
            onTimerStop={(time) => stopTimer(index, time)} 
          />
        </div>
      ))}
    </div>
  );
};

export default TodoListComponent;
