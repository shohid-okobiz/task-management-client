import TaskApis from "@/app/apis/task.apis";
import { CreateCategoryPayload, CreateTaskPayload, GetTaskListParams, ICategoryGetResponse, ICreateTaskResPonse, IGetTaskListResponse } from "@/types/TaskTypes/taskTypes";




const {
    CreateTaskApi,
    GetTaskListApi, createCategoryApi, getCategoryApi

} = TaskApis;

export const TaskServices = {
    processCreateTaskHandler: async (payload: CreateTaskPayload): Promise<ICreateTaskResPonse> => {
        try {
            const response = await CreateTaskApi(payload);
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


