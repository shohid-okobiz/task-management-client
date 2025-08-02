export interface CreateTaskPayload {
  title: string;
  description: string;
  date: string; 
  category: string;
}
export interface ICreateTaskResPonse {
  status: string
  message: string
  data: CreateTaskData
}

export interface CreateTaskData {
  title: string
  description: string
  date: string
  task_status: string
  category: Category
  user: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Category {
  _id: string
  name: string
}
export type TaskStatus = 'all' | 'pending' | 'collaborative' | 'ongoing' | 'done';

export interface GetTaskListParams {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  category?: string;
}

export interface IGetTaskListResponse {
  status: string
  message: string
  data: GetTaskList
}

export interface GetTaskList {
  tasks: Task[]
  total: number
  page: number
  totalPages: number
}

export interface Task {
  _id: string
  title: string
  description: string
  date: string
  task_status: string
  category: Category
  user: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Category {
  _id: string
  name: string
}

export interface CreateCategoryPayload {
  name: string;
}
export interface ICategoryGetResponse {
  status: string
  message: string
  data: CategoryGetData[]
}

export interface CategoryGetData {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  __v: number
  user?: string
}
