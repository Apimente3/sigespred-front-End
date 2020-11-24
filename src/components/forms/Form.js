import React from 'react';

const Form = ({children,onSubmit,autocomplete="on"}) => {
    return (
        <>
            <form onSubmit={onSubmit} autoComplete={autocomplete}>
                {children}
            </form>
        </>
    );
};

export default Form;