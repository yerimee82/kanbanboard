import React from 'react';
import { Subtask } from '../../store/types';
import styles from './Card.module.scss';

interface TaskItemProps {
  task: Subtask;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={styles.task}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.completed ? styles.completed : ''}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>X</button>
    </div>
  );
};

export default TaskItem;