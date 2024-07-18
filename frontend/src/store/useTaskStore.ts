import create from 'zustand';

interface Subtask {
  id: string;
  text: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed';
  subtasks: Subtask[];
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string, status: 'pending' | 'inProgress' | 'completed', subtasks: Subtask[]) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (title, description, status, subtasks) => set((state) => ({
    tasks: [
      ...state.tasks,
      { id: Date.now(), title, description, status, subtasks }
    ]
  }))
}));

export default useTaskStore;