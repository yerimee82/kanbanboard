import React, { useState } from "react";
import styles from "./Form.module.scss";
import InputField from "./InputField";
import Button from "./Button";
import DropDown from "./DropDown";

interface Subtask {
  id: string;
}

const Form = () => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: `subtask-${subtasks.length}` }]);
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const temp = () => {

  };

  return (
    <div className={styles.roundBox}>
      <h2>Add New Task</h2>
      <InputField id="title" label="Title" type="text" />
      <InputField
        id="description"
        label="description"
        type="text"
        height="80px"
        textarea={true}
      />
      <p>Subtasks</p>
      {subtasks.map((subtask) => (
        <InputField
          key={subtask.id}
          id={subtask.id}
          label=""
          type="text"
          placeholder="e.g. Take a break"
          onRemove={() => handleRemoveSubtask(subtask.id)}
        />
      ))}
      <Button onClick={handleAddSubtask} 
        color="#635FC7"
        backgroundColor="#F4F7FD"
        >
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
      />
      <Button onClick={temp} color="#FFFFFF" backgroundColor="#635FC7">
        Create Task
      </Button>
    </div>
  );
};

export default Form;
