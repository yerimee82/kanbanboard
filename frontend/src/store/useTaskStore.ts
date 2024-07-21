import create from 'zustand';
import { Task, Subtask } from './types';

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string, status: 'pending' | 'inProgress' | 'completed', subtasks: Subtask[]) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (title, description, status, subtasks) => set((state) => ({
    tasks: [
      ...state.tasks,
      { id: Date.now(), title, description, status, subtasks: subtasks.map(subtask => ({ ...subtask, completed: false })) }
    ]
  }))
}));

export default useTaskStore;