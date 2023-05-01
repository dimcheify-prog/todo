import api from "../http/index";
import {AxiosResponse} from "axios";
import {ITask} from "../models/ITask";

export default class TasksService {
    static async getTasks(id: string): Promise<AxiosResponse> {
        return api.get(`users/${id}/tasks`);
    };

    static async removeTask( taskId: string) {
        return api.delete(`/tasks/${taskId}`);
    };

    static async createTask(userId: string, newTask: ITask) {
        return api.post(`users/${userId}/tasks`, newTask);
    };

    static async updateTaskStatus(taskId: string, status: boolean) {
        return api.patch(`/tasks/${taskId}`, {isComplete: !status});
    };
};
