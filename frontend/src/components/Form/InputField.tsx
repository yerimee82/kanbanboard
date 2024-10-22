import React from 'react';
import styles from './Form.module.scss';

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    height?: string;
    textarea?: boolean;
    onRemove?: () => void;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  }
  
  const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    height,
    textarea,
    onRemove,
    value,
    onChange,
  }) => {
    const Element = textarea ? "textarea" : "input";
    return (
      <div className={styles.inputField}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={styles.inputWrapper}>
          <Element
            id={id}
            className={styles.input}
            style={{ height }}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
          />
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemove}
            >
              ×
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default InputField;