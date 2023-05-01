import React, {ChangeEvent, FC, SyntheticEvent, useContext, useState} from 'react';
import "./ModalCreate.sass";
import {AppContext} from "../../index";
import {useInput} from "../../hooks/useInput";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import {observer} from "mobx-react-lite";

interface IModalChangeProps {
    active: boolean;
    close: () => void;
}

const ModalCreate: FC<IModalChangeProps> = ({active, close}) => {
    const {store} = useContext(AppContext);

    const title = useInput('', {isEmpty: true, minLength: 3});

    const handlerClick = () => {
        store.tasks.addTask(store.auth.user.id, title.value);
        title.onReset();
        close();
    };

    if (!active) {
        return null
    }
    return (
        <div className="modal" onClick={close}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2 className="modal__title">Создать задачу</h2>
                </div>
                <div className="modal__body">
                    <input className="modal__input" onChange={(e) => title.onChange(e)} value={title.value} onBlur={(e) => title.onBlur(e)} type="text" placeholder="Новая задача" />
                    {(title.isDirty && title.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
                    {(title.isDirty && title.minLengthError) && <ErrorHandler error={'Мало символов'}/>}
                    <div className="modal__button-box">
                        <button disabled={!title.isValid} className="modal__button" onClick={handlerClick}>Создать</button>
                        <button className="modal__button" onClick={close}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default observer(ModalCreate);