import React from 'react';
import useTaskStore from '../store/useTaskStore';
import KanbanList from './KanbanList';
import StatusBar from './StatusBar';
import Card from './Card/Card';

const KanbanBoard: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className='boardContainer'>
      <KanbanList>
        <StatusBar color="red" title="Pending" count={pendingTasks.length} />
        {pendingTasks.map(task => (
          <Card key={task.id} title={task.title} description={task.description} subtasks={task.subtasks} />
        ))}
      </KanbanList>
      <KanbanList>
        <StatusBar color="orange" title="In Progress" count={inProgressTasks.length} />
        {inProgressTasks.map(task => (
          <Card key={task.id} title={task.title} description={task.description} subtasks={task.subtasks} />
        ))}
      </KanbanList>
      <KanbanList>
        <StatusBar color="green" title="Completed" count={completedTasks.length} />
        {completedTasks.map(task => (
          <Card key={task.id} title={task.title} description={task.description} subtasks={task.subtasks} />
        ))}
      </KanbanList>
    </div>
  );
};

export default KanbanBoard;