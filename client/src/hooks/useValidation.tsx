import {useEffect, useState} from "react";

export const useValidation = (value: string, validators: any) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        for (const validator in validators) {
            switch (validator) {
                case 'minLength':
                    value.length < validators[validator] ? setMinLengthError(true) : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    break;
            }
        }
    }, [value, validators]);

    useEffect(() => {
        if (isEmpty || minLengthError || emailError) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [isEmpty, minLengthError, emailError])

    return {
        isEmpty, minLengthError, emailError, isValid
    }
}