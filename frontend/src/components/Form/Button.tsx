import React from 'react'
import styles from './Form.module.scss'

interface ButtonProds {
    onClick: () => void;
    children: React.ReactNode;
    color?: string;
}

const Button:React.FC<ButtonProds> = ({ onClick, children, color }) => {
  return (
    <button
      type="button"
      className={styles.addButton}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;