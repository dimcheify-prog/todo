import React, {FC} from 'react';
import "./ErrorHandler.sass";

interface IErrorHandlerProps {
    error: string;
}

const ErrorHandler: FC<IErrorHandlerProps> = ({error}) => {
    return (
        <div>
            <span className="error-text">{error}</span>
        </div>
    );
};

export default ErrorHandler;