import axios from 'axios';
import { Task, TaskStatus } from '../store/types';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const createTask = async (taskData: Omit<Task, 'id' | 'subTasks'>): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};

export const updateTaskStatus = async (taskId: number, status: TaskStatus): Promise<void> => {
  await axios.put(`${API_BASE_URL}/tasks/${taskId}/status`, null, { params: { status } });
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
};
