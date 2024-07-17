import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Kanbanboard</h1>
      <button className={styles.button}>
        <span className={styles.plusIcon}>+</span> Add New Task
      </button>
    </header>
  );
};


export default Header