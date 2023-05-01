import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios, {AxiosError} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import AppStore from "./store";

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
        try {
            const response = await AuthService.login(email, password);
            this.setLoading(true);
            localStorage.setItem('token', response.data.accessToken);
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
        try {
            this.setLoading(true);
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
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
            // const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (err) {
            if (err instanceof AxiosError) {
                this.setError(err.response!.data!.massage);
            }
        }
    };

    async checkAuth() {
        this.setLoading(true);
        this.setAuth(true);
        this.setLoading(false);
    };
};