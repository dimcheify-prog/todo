import React, {FC} from "react";
import {ITask} from "../../models/ITask";
import TaskItem from "../TaskItem/TaskItem";
import "./TasksList.sass";
import {observer} from "mobx-react-lite";

interface ITasksListProps {
    tasks: ITask[];
}

const TasksList: FC<ITasksListProps> = ({tasks}) => {

    return (
        <div className="tasks-list">
            {tasks.length > 0 ?
                tasks.map((task) => {
                return <TaskItem key={task.id} task={task}/>
            })
            : <div className="tasks-list__block-text">
                    <span className="tasks-list__text">Здесь могли быть ваши задачи.(</span>
                </div>
            }
        </div>
    );
};

export default observer(TasksList);