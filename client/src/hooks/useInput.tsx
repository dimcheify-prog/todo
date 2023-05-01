import {SyntheticEvent, useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue: string, validators: any)  => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsdirty] = useState(false);
    const valid = useValidation(value, validators);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = (e: SyntheticEvent) => {
        setIsdirty(true);
    };

    const onReset = () => {
        setValue(initialValue);
    };

    return {
        value, onChange, onBlur, isDirty, onReset, ...valid
    };
};