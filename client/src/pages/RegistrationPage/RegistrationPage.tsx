import React, {FC, useContext} from 'react';
import "./RegistrationPage.sass";
import {observer} from "mobx-react-lite";
import {AppContext} from "../../index";
import {PulseLoader} from "react-spinners";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const RegistrationPage: FC = () => {
    const {store} = useContext(AppContext);
    return (
        <div className="page-registration">
            {store.auth.isLoading ? <PulseLoader/> : <RegistrationForm/>}
        </div>
    );;
};

export default observer(RegistrationPage);