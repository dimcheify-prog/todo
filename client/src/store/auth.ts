import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios, {AxiosError} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import AppStore from "./store";
import {ITask} from "../models/ITask";

export default class Auth {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    error = '';

    constructor(private store: AppStore) {
        makeAutoObservable(this);
    };

    setError(err: string) {
        this.error = err;
    };

    setAuth(bool: boolean) {
        this.isAuth = bool;
    };

    setUser(user: IUser) {
        this.user = user;
    };

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('id', response.data.user.id);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            if (err instanceof AxiosError) {
                this.setError(err!.response!.data);
            }
        } finally {
            this.setLoading(false);
        }
    };

    async registration(email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('id', response.data.user.id);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            if (err instanceof AxiosError) {
                this.setError(err.response!.data!.massage);
            }
        } finally {
            this.setLoading(false);
        }
    };

    async logout() {
        try {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            this.store.tasks.updateFilter('all');
            this.store.tasks.setTasks([]);
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (err) {
            if (err instanceof AxiosError) {
                this.setError(err.response!.data!.massage);
            }
        }
    };
};