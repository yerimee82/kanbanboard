import React from 'react';
import styles from './Form.module.scss';

interface DropDownProps {
    id: string;
    label: string;
    options: { value: string; label: string; color: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
  const DropDown: React.FC<DropDownProps> = ({ id, label, options, value, onChange }) => {
    return (
      <div className={styles.selectField}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <select id={id} className={styles.select} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value} className={styles.option}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default DropDown;