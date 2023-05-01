import React, {SyntheticEvent, useContext} from 'react';
import {useInput} from "../../hooks/useInput";
import {AppContext} from "../../index";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import {Link, useNavigate} from "react-router-dom";
import "./RegistrationPage.sass";

const RegistrationPage = () => {
    const email = useInput('', {isEmail: false, isEmpty: true});
    const password = useInput('', {isEmpty: true, minLength: 5});

    const {store} = useContext(AppContext);
    const navigate = useNavigate();

    const handlerSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        store.auth.registration(email.value, password.value);
        navigate('/tasks');
    };

    return (
        <div className="page-registration">
            <form onSubmit={handlerSubmit} className="form-registration">
                <h2 className="form-registration__title">Регистрация</h2>
                <input className="form-registration__input" onChange={(e) => email.onChange(e)} value={email.value} onBlur={(e) => email.onBlur(e)} type="email" placeholder="Email"/>
                {(email.isDirty && email.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
                {(email.isDirty && email.emailError) && <ErrorHandler error={'Некорректный email'}/>}
                <input className="form-registration__input" onChange={(e) => password.onChange(e)} value={password.value} onBlur={(e) => password.onBlur(e)} type="password" placeholder="Password"/>
                {(password.isDirty && password.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
                {(password.isDirty && password.minLengthError) && <ErrorHandler error={'Некоректная длина'}/>}
                <div className="form-registration__button-box">
                    <button className="form-registration__button" type="submit">Зарегистрироваться</button>
                    <Link className="form-registration__link" to="/login">Уже есть аккаунт?</Link>
                </div>
            </form>
        </div>
    );;
};

export default RegistrationPage;