import React, { useState } from 'react';
import { Task } from './types';
import TaskItem from './TaskItem';
import styles from './Card.module.scss';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: (text: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onAdd }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    onAdd(newTask);
    setNewTask('');
  };

  return (
    <>
      <div className={styles.tasks}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>
      <form onSubmit={handleAddTask} className={styles.addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="테스크 추가"
        />
        <button type="submit">추가</button>
      </form>
    </>
  );
};

export default TaskList;