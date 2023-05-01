import React, {SyntheticEvent, useContext} from 'react';
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import {useInput} from "../../hooks/useInput";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../index";
import "./LoginPage.sass";

const LoginPage = () => {
    const email = useInput('', {isEmail: false, isEmpty: true});
    const password = useInput('', {isEmpty: true});

    const navigate = useNavigate();

    const {store} = useContext(AppContext);

    const handlerSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await store.auth.login(email.value, password.value);
        navigate('/tasks');
    };

    return (
        <div className="page-login">
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
        </div>
    );
};

export default LoginPage;