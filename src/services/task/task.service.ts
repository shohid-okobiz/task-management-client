import TaskApis from "@/app/apis/task.apis";
import axios from "axios";
import { CreateCategoryPayload, CreateTaskPayload, GetTaskListParams, ICategoryGetResponse, ICreateTaskResPonse, IGetTaskDetailsResponse, IGetTaskListResponse, Task } from "@/types/TaskTypes/taskTypes";
import { apiBaseUrl } from "@/config/config";




const {
    CreateTaskApi,
    GetTaskListApi, createCategoryApi, getCategoryApi, GetTaskDetailsApi, TaskStatusUpdateApi, DeleteTaskApi

} = TaskApis;

export const TaskServices = {
    processCreateTaskHandler: async (payload: CreateTaskPayload): Promise<ICreateTaskResPonse> => {
        try {
            const response = await CreateTaskApi(payload);
            console.log("response==", response)
            return response?.data as ICreateTaskResPonse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in create task");
            }
        }
    },
    processUpdateStatusTask: async (
        id: string,
        status: string
    ): Promise<ICreateTaskResPonse> => {
        try {
            const response = await TaskStatusUpdateApi(id, status);
            return response?.data as ICreateTaskResPonse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in update task status");
            }
        }
    },


    processDeleteTask: async (taskId: string, token: string) => {
        return axios.delete(`${apiBaseUrl}/task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    processGetTaskHandler: async (
        params: GetTaskListParams
    ): Promise<IGetTaskListResponse> => {
        try {
            const response = await GetTaskListApi(params);
            return response?.data as IGetTaskListResponse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in fetching tasks");
            }
        }
    },
    GetTaskDetailsApi: async (
        id: string
    ): Promise<{ status: string; message: string; data: Task }> => {
        try {
            const response = await GetTaskDetailsApi(id);
            return response?.data as { status: string; message: string; data: Task };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in task details fetch");
            }
        }
    },


    processCreateCetegoryHandler: async (payload: CreateCategoryPayload): Promise<ICategoryGetResponse> => {
        try {
            const response = await createCategoryApi(payload);
            return response?.data as ICategoryGetResponse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in create task");
            }
        }
    },
    processGetategoryHandler: async (

    ): Promise<ICategoryGetResponse> => {
        try {
            const response = await getCategoryApi();
            console.log("category response === ", response)
            return response?.data as ICategoryGetResponse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in fetching tasks");
            }
        }
    },





};


