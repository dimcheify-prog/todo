import React, {FC, SyntheticEvent, useContext} from 'react';
import "./LoginForm.sass";
import {observer} from "mobx-react-lite";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import {Link, useNavigate} from "react-router-dom";
import {useInput} from "../../hooks/useInput";
import {AppContext} from "../../index";

const LoginForm: FC = () => {
    const email = useInput('', {isEmail: false, isEmpty: true});
    const password = useInput('', {isEmpty: true});

    const {store} = useContext(AppContext);

    const navigate = useNavigate();

    const handlerSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await store.auth.login(email.value, password.value);
        navigate('/tasks');
    };
    return (
        <form onSubmit={handlerSubmit} className="form-login">
            {store.auth.error ? <h1>{store.auth.error}</h1> : null}
            <h2 className="form-login__title">Вход</h2>
            <input className="form-login__input" onChange={(e) => email.onChange(e)} value={email.value} onBlur={(e) => email.onBlur(e)} type="email" placeholder="Email"/>
            {(email.isDirty && email.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            {(email.isDirty && email.emailError) && <ErrorHandler error={'Некорректный email'}/>}
            <input className="form-login__input" onChange={(e) => password.onChange(e)} value={password.value} onBlur={(e) => password.onBlur(e)} type="password" placeholder="Password"/>
            {(password.isDirty && password.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            <div className="form-login__button-box">
                <button className="form-login__button" type="submit">Войти</button>
                <Link className="form-login__link" to="/registration">Регистрация</Link>
            </div>
        </form>
    );
};

export default observer(LoginForm);