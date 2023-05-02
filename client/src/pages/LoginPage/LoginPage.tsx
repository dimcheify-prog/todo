import React, {FC, useContext} from 'react';
import {AppContext} from "../../index";
import {PulseLoader} from "react-spinners";
import "./LoginPage.sass";
import LoginForm from "../../components/LoginForm/LoginForm";
import {observer} from "mobx-react-lite";

const LoginPage: FC = () => {
    const {store} = useContext(AppContext);
    return (
        <div className="page-login">
            {store.auth.isLoading ? <PulseLoader/> : <LoginForm/>}
        </div>
    );
};

export default observer(LoginPage);