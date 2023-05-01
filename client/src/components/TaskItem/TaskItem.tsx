import React, {FC, useContext, useState} from 'react';
import {ITask} from "../../models/ITask";
import {AppContext} from "../../index";
import {FcCheckmark} from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import "./TaskItem.sass";
import {observer} from "mobx-react-lite";

interface ITaskItemProps {
    task: ITask
}

const TaskItem: FC<ITaskItemProps> = ({task}) => {
    const {store} = useContext(AppContext);
    const [isComplete, setIsComplete] = useState(task.isComplete);

    const handlerClick = () => {
        store.tasks.changeTaskStatus(task.id, task.isComplete);
        setIsComplete(!isComplete);
    };

    const classes = ['task-item__checkmark'];

    if (!isComplete) {
        classes.push('undone');
    } else {
        classes.push('done');
    }

    return (
        <div className="task-item">
            <FcCheckmark cursor={'pointer'} onClick={handlerClick} className={classes.join(' ')} size="3rem"/>
            <p className="task-item__task-name">{task.title}</p>
            <FaTrash className="task-item__button" size="3rem" onClick={() => store.tasks.removeTask(task.id)}/>
        </div>
    );
};

export default observer(TaskItem);