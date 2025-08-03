import TaskApis from "@/app/apis/task.apis";
import { CreateCategoryPayload, CreateTaskPayload, GetTaskListParams, ICategoryGetResponse, ICreateTaskResPonse, IGetTaskListResponse, Task } from "@/types/TaskTypes/taskTypes";




const {
    CreateTaskApi,
    GetTaskListApi, createCategoryApi, getCategoryApi,GetTaskDetailsApi

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


