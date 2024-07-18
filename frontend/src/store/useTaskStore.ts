import  { create } from 'zustand';

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'inProgress' | 'completed';
}

interface TaskStore {
    tasks: Task[];
    addTask: (title: string, description: string, status: 'pending' | 'inProgress' | 'completed') => void;
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (title, description, status) => set((state) => ({
        tasks: [
            ...state.tasks,
            { id: Date.now(), title, description, status }
        ]
    }))
}));

export default useTaskStore;