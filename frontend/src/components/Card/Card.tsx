import React, { useState } from 'react';
import TaskList from './TaskList';
import { CardProps, Subtask } from '../../store/types';
import styles from './Card.module.scss';

const Card: React.FC<CardProps> = ({ title, description, subtasks, titleWeight = 'normal' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [tasks, setTasks] = useState<Subtask[]>(subtasks);
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

  const handleTitleBlur = () => {
    if (currentTitle.trim()) {
      setEditTitle(false);
    }
  };

  const handleDescriptionBlur = () => {
    if (currentDescription.trim()) {
      setEditDescription(false);
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
            onBlur={handleTitleBlur}
            onKeyDown={(e) => handleKeyDown(e, handleTitleBlur)}
            autoFocus
            className={styles.titleInput}
          />
        ) : (
          <span
            className={styles.title}
            style={{ fontWeight: titleWeight }}
            onClick={() => setEditTitle(true)}
          >
            {currentTitle || 'No Title'}
          </span>
        )}
      </div>
      <div className={styles.description}>
        {editDescription ? (
          <input
            type="text"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            onKeyDown={(e) => handleKeyDown(e, handleDescriptionBlur)}
            autoFocus
          />
        ) : (
          <p onClick={() => setEditDescription(true)}>{currentDescription || 'No Description'}</p>
        )}
      </div>
      <div className={styles.dashedLine}></div>
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