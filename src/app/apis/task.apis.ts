


import axiosClient from "@/lib/axios.config";
import { CreateCategoryPayload, CreateTaskPayload, GetTaskListParams } from "@/types/TaskTypes/taskTypes";

const TaskApis = {
  CreateTaskApi: (payload: CreateTaskPayload) => {
    return axiosClient.post("/create-new-task", payload);
  },
  GetTaskListApi: (params: GetTaskListParams) => {
    return axiosClient.get("/get-all-task", { params });
  },
  GetTaskDetailsApi: (id: string) => {
    return axiosClient.get(`/task/${id}`);
  },
  createCategoryApi: (payload: CreateCategoryPayload) => {
    return axiosClient.post("/category", payload);
  },
  getCategoryApi: () => {
    return axiosClient.get("/category");
  },
  TaskStatusUpdateApi: (id: string, status: string) => {
    return axiosClient.patch(`/my-task/${id}/status`, { task_status: status });
  },
  DeleteTaskApi: (id: string) => {
    return axiosClient.patch(`/task/${id}`);
  }

};

export default TaskApis;
