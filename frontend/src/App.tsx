// App.tsx
import React from 'react';
import Header from './components/Header';
import './styles/global.scss';
import KanbanBoard from './components/Kanbanboard';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <KanbanBoard />
    </>
  );
};

export default App;