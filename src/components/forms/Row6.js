import React from 'react';

const Row6 = ({children,title}) => {
    return (
        <div className="col-lg-6">
            <legend>{title}</legend>
            {children}
        </div>
    );
};

export default Row6;