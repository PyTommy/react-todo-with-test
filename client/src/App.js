import React from 'react';
import DayPage from './pages/DayPage';

function App() {
  return (
    <div data-test="component-app">
      <h1 className="h2 bg-primary m-0">ToDoApp</h1>
      <DayPage />
    </div>
  );
}

export default App;