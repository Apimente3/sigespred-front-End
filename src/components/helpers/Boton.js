import React from 'react';

const Boton = ({textButton,procesando}) => {
    
    if(procesando){
        return (
            <>
                {}
                <button
                    disabled={'disabled'}
                    className="btnlogin btn btn-danger btn-sm bounceIn animation-delay5 login-link pull-right button-login"
                    type="submit"
                   >
                    <i className="fa fa-refresh fa-spin" aria-hidden="true"></i> Procesando ...
                </button>
            </>
        );
    }
    else{
        return (
            <>
                {}
                <button
                    className="btnlogin btn btn-danger btn-sm bounceIn animation-delay5 login-link pull-right button-login"
                    type="submit"
                    data-loading-text="<i class='fa fa-spinner fa-spin '></i> Iniciando sessión">
                    <i className="fa fa-sign-in"></i> {textButton}
                </button>
            </>
        ); 
    }
    
   
};

export default Boton;