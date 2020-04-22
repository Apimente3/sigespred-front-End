import React from 'react';

const ErrorMessage = ({mensaje, esconderError}) => {
    
    if (!mensaje) {
        return null;
    }
    else {
        return (
            <div className="alert alert-danger bounceIn animation-delay2">
                <strong>Opps!</strong> {mensaje}.

                <a href="#" onClick={esconderError}  className="close" >
                    <span aria-hidden="true">&times;</span>
                </a>
            
            </div>
        );
    }
}

export default ErrorMessage;