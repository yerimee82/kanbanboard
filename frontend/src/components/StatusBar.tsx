import React from "react";
import styles from "./StatusBar.module.scss";
import eclipse from '../assets/eclipse.svg';

interface StatusCardProps {
  color: 'red' | 'orange' | 'green';
  title: string;
  count: number;
  children?: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ color, title, count, children }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.circle} ${styles[color]}`}></div>
      <div className={styles.title}>
        {title} <span className={styles.count}>({count})</span>
      </div>
      <img src={eclipse} alt="icon" className={styles.icon} />
      {children}
    </div>
  );
};

export default StatusCard;
