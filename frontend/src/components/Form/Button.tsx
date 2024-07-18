import React from 'react'
import styles from './Form.module.scss'

interface ButtonProds {
    onClick: () => void;
    children: React.ReactNode;
    color?: string;
    backgroundColor?: string;
}

const Button:React.FC<ButtonProds> = ({ onClick, children, color, backgroundColor }) => {
  return (
    <button
      type="button"
      className={styles.button}
      style={{ color, backgroundColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;