import React, {FC} from 'react';
import "./FilterButton.sass";
import {observer} from "mobx-react-lite";

interface IFilterButtonProps {
    text: string;
    isActive: boolean;
    filter: any;
}

const FilterButton: FC<IFilterButtonProps> = ({text, isActive, filter}) => {
    const classes = ['filter-button'];

    if (isActive) {
        classes.push('active');
    }

    return (
        <button className={classes.join(' ')} onClick={filter}>
            {text}
        </button>
    );
};

export default observer(FilterButton);