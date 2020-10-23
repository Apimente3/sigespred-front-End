import React from 'react';

const Row6 = ({children,title}) => {
    return (
        <div className="col-lg-12">
            <legend>{title}</legend>
            {children}
        </div>
    );
};

export default Row6;