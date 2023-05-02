import {makeAutoObservable} from "mobx";
import AppStore from "./store";
import TasksService from "../service/TasksService";
import {ITask} from "../models/ITask";
import {AxiosError} from "axios";
import {v4} from "uuid";

export default class Tasks {
    tasks = [] as ITask[];
    isLoading = false;
    error = '';
    filterMode = 'all';

    constructor(private store: AppStore) {
        makeAutoObservable(this);
    };

    updateFilter(filter: string) {
        this.filterMode = filter;
    };

    get todoFilter() {
        if (this.filterMode === 'all') {
            return this.tasks;
        } else if (this.filterMode === 'done') {
            return this.tasks.filter((task) => task.isComplete);
        } else if (this.filterMode === 'undone') {
            return this.tasks.filter((task) => !task.isComplete);
        }
        return this.tasks;
    };

    setTasks(tasks: []) {
        this.tasks = tasks;
    };

    setLoading(bool: boolean) {
        this.isLoading = bool;
    };

    setChangeStatus(id: string, status: boolean) {
        const updatedTaskArr = this.tasks.map((task) => {
            if (task.id === id) {
                return {...task, isComplete: !status};
            }
            return task;
        });
        this.tasks = updatedTaskArr;
    };

    setError(err: string) {
        this.error = err;
    };

    setRemove(id:string) {
        this.tasks = this.tasks.filter((item) => item.id !== id);
    };

    setNewTask(newTask: ITask) {
        this.tasks.push(newTask);
    };

    async fetchTasks(id: string | null) {
        this.setLoading(true);
        try {
            const response = await TasksService.getTasks(id);
            this.setTasks(response.data);
        } catch (err) {
            if (err instanceof AxiosError){
                this.setError(err.response?.data.message);
            }
        } finally {
            this.setLoading(false);
        }
    };

    async changeTaskStatus(taskId: string, status: boolean) {
        try {
            const response = await TasksService.updateTaskStatus(taskId, status);
            this.setChangeStatus(taskId, status);
        } catch (err) {
            if (err instanceof AxiosError) {
                this.setError(err.response?.data.message);
            }
        }
    };

    async removeTask(id: string) {
        try {
            const response = await TasksService.removeTask(id);
            this.setLoading(true);
            this.setRemove(id);
        } catch (err) {
            if (err instanceof AxiosError) {
                this.setError(err.response!.data.massage);
            }
        } finally {
            this.setLoading(false);
        }
    };

    async addTask(userId: string | null, taskTitle: string,) {
        try {
            const newTask = {
                id: v4(),
                title: taskTitle,
                isComplete: false,
                userId: userId,
            }

            const response = await TasksService.createTask(userId, newTask);
            this.setNewTask(newTask);
            this.setLoading(true);

        } catch (err) {
            if (err instanceof AxiosError) {
                this.setError(err.response!.data.massage);
            }
        } finally {
            this.setLoading(false);
        }
    };
};