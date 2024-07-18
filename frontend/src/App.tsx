import React from 'react';
import Header from './components/Header'
import './styles/global.scss'
import StatusBar from './components/StatusBar'
import Card from './components/Card/Card'
import KanbanList from './components/KanbanList'
import useTaskStore from './store/useTaskStore';


function App() {
  const tasks = useTaskStore((state) => state.tasks);

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const completedTasks = tasks.filter(task => task.status === 'completed');


  return (
    <>
      <Header />
      <div className="boardContainer">
        <KanbanList>
          <StatusBar color="red" title="Pending" count={pendingTasks.length} />
          {pendingTasks.map(task => (
            <Card key={task.id} title={task.title} description={task.description} />
          ))}
        </KanbanList>
        <KanbanList>
          <StatusBar color="orange" title="In Progress" count={inProgressTasks.length} />
          {inProgressTasks.map(task => (
            <Card key={task.id} title={task.title} description={task.description} />
          ))}
        </KanbanList>
        <KanbanList>
          <StatusBar color="green" title="Completed" count={completedTasks.length} />
          {completedTasks.map(task => (
            <Card key={task.id} title={task.title} description={task.description} />
          ))}
        </KanbanList>
      </div>
    </>
  )
}

export default App
