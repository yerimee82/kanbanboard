import React from 'react'
import styles from './Form.module.scss';

interface DropDownProps {
    id: string;
    label: string;
    options: { value: string; label: string; color: string }[];
}

const DropDown:React.FC<DropDownProps> = ({ id, label, options }) => {
  return (
    <div className={styles.selectField}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <select id={id} className={styles.select}>
                {options.map((option) => (
                    <option key={option.value} value={option.value} style={{ color: option.color }}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
  );
}

export default DropDown;