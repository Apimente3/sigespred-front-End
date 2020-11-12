import React from 'react';

const Form = ({children,onSubmit,autocomplete="on"}) => {
    return (
        <>
            <form onSubmit={onSubmit} autocomplete={autocomplete}>
                {children}
            </form>
        </>
    );
};

export default Form;