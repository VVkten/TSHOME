import React from 'react';
import ReactDOM from 'react-dom';
import TodoListComponent from './components/TodoListComponent';

const AppComponent: React.FC = () => {
  return (
    <div>
      <h1>Todo App with Timers</h1>
      <TodoListComponent />
    </div>
  );
};

// Експортуємо компонент за замовчуванням
export default AppComponent;

// Рендеримо AppComponent безпосередньо тут
ReactDOM.render(<AppComponent />, document.getElementById('root'));
