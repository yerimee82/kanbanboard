export interface Subtask {
  id: number;
  text: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed';
  subtasks: Subtask[];
}

export interface CardProps {
  title: string;
  description: string;
  subtasks: Subtask[];
  titleWeight?: 'normal' | 'bold' | 'bolder' | number;
}