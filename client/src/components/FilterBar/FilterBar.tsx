import React, {FC, useContext} from 'react';
import FilterButton from "../FilterButton/FilterButton";
import {AppContext} from "../../index";
import {observer} from "mobx-react-lite";

const FilterBar: FC = () => {
    const {store} = useContext(AppContext);

    const filterMode = store.tasks.filterMode;

    return (
        <div>
            <FilterButton text={'Все'} isActive={filterMode === 'all'} filter={() => store.tasks.updateFilter('all')}/>
            <FilterButton text={'Завершенные'} isActive={filterMode === 'done'} filter={() => store.tasks.updateFilter('done')}/>
            <FilterButton text={'Незавершенные'} isActive={filterMode === 'undone'} filter={() => store.tasks.updateFilter('undone')}/>
        </div>
    );
};

export default observer(FilterBar);