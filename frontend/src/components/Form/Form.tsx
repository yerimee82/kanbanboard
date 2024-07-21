import React, { useState } from "react";
import styles from "./Form.module.scss";
import InputField from "./InputField";
import Button from "./Button";
import DropDown from "./DropDown";
import useTaskStore from "../../store/useTaskStore";
import { Subtask } from "../../store/types";

interface FormProps {
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ onClose }) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'inProgress' | 'completed'>('pending');
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now(), text: '', completed: false }]);
  };

  const handleRemoveSubtask = (id: number) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const handleSubtaskChange = (id: number, text: string) => {
    setSubtasks(subtasks.map((subtask) => subtask.id === id ? { ...subtask, text } : subtask));
  };

  const handleCreateTask = () => {
    if (!title.trim() || !description.trim()) return;
    addTask(title, description, status, subtasks);
    setTitle('');
    setDescription('');
    setStatus('pending');
    setSubtasks([]);
    onClose();
  };

  return (
    <div className={styles.roundBox}>
      <h2>Add New Task</h2>
      <InputField 
        id="title" 
        label="Title" 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputField
        id="description"
        label="Description"
        type="text"
        height="80px"
        textarea={true}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>Subtasks</p>
      {subtasks.map((subtask) => (
        <InputField
          key={subtask.id}
          id={subtask.id.toString()}
          label=""
          type="text"
          placeholder="예시) 밥 먹기"
          value={subtask.text}
          onChange={(e) => handleSubtaskChange(subtask.id, e.target.value)}
          onRemove={() => handleRemoveSubtask(subtask.id)}
        />
      ))}
      <Button onClick={handleAddSubtask} color="#635FC7" backgroundColor="#F4F7FD">
        Add New Subtask
      </Button>
      <DropDown
        id="status"
        label="Status"
        options={[
          { value: "pending", label: "Pending", color: "red" },
          { value: "inProgress", label: "In Progress", color: "orange" },
          { value: "completed", label: "Completed", color: "green" },
        ]}
        value={status}
        onChange={(e) => setStatus(e.target.value as 'pending' | 'inProgress' | 'completed')}
      />
      <Button onClick={handleCreateTask} color="#FFFFFF" backgroundColor="#635FC7">
        Create Task
      </Button>
    </div>
  );
};

export default Form;