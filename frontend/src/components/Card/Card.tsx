import React, { useState } from 'react';
import TaskList from './TaskList';
import { CardProps, Task } from './types';
import styles from './Card.module.scss';

const Card: React.FC<CardProps> = ({ title, description, titleWeight = 'normal' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editDescription, setEditDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [editTitle, setEditTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const toggleTasks = () => {
    setIsOpen(!isOpen);
  };

  const handleAddTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <button onClick={toggleTasks}>
          <span>{isOpen ? '▼' : '▶'}</span>
        </button>
        {editTitle ? (
          <input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={() => setEditTitle(false)}
            onKeyDown={(e) => handleKeyDown(e, () => setEditTitle(false))}
            autoFocus
            className={styles.titleInput}
          />
        ) : (
          <span
            className={styles.title}
            style={{ fontWeight: titleWeight }}
            onClick={() => setEditTitle(true)}
          >
            {currentTitle}
          </span>
        )}
      </div>
      <div className={styles.description}>
        {editDescription ? (
          <input
            type="text"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            onBlur={() => setEditDescription(false)}
            onKeyDown={(e) => handleKeyDown(e, () => setEditDescription(false))}
            autoFocus
          />
        ) : (
          <p onClick={() => setEditDescription(true)}>{currentDescription}</p>
        )}
      </div>
      <hr />
      {isOpen && (
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
};

export default Card;