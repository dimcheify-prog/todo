import React, {FC, useContext, useEffect, useState} from 'react';
import {AppContext} from "../../index";
import {observer} from "mobx-react-lite";
import {Navigate, useNavigate} from "react-router-dom";
import TasksList from "../../components/TasksList/TasksList";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import "./TasksPage.sass";
import ModalCreate from "../../components/ModalCreate/ModalCreate";
import FilterBar from "../../components/FilterBar/FilterBar";
import {PulseLoader} from "react-spinners";

const TasksPage: FC = () => {
    const [showModal, setShowModal] = useState(false);
    const {store} = useContext(AppContext);

    const onClose = () => {
        setShowModal(false)
    }

    const popUp = () => {
        setShowModal(true);
    };

    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem('token');
        if (token) {
            const userId = localStorage.getItem('id');
            store.tasks.fetchTasks(userId);
        }
    }, []);

    const handleClick = async () => {
        await store.auth.logout();
        navigate('/login');
    };

    if (!localStorage.getItem('token')) {
        return <Navigate replace to='/login'/>
    } else {
        return (
            <div className="tasks-page">
                {store.tasks.error ? <ErrorHandler error={store.tasks.error}/> : null}
                <button className="tasks-page__button" onClick={handleClick}>Выход</button>
                <h2 className="tasks-page__title">Ваши задачи</h2>
                <FilterBar/>
                {store.tasks.isLoading ? <PulseLoader/> : <TasksList tasks={store.tasks.todoFilter}/>}
                <ModalCreate active={showModal} close={onClose}/>
                <button className="tasks-page__plus-button" onClick={popUp}>+</button>
            </div>
        );
    }
};

export default observer(TasksPage);