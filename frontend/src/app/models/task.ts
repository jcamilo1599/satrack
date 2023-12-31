export interface TaskModel {
  id: string;
  title: string;
  description: string;
  category: number;
  deadline: number;
  completed: boolean;
  userId: number;
}