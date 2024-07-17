export interface CardProps {
  title: string;
  description: string;
  titleWeight?: "normal" | "bold" | "bolder" | number;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}
