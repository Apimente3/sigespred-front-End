import React from 'react';

const Row6 = ({children,title=""}) => {
    return (
        <div className="col-lg-6">
            { title.length!=0 ?<legend>{title}</legend>:null}
            {children}
        </div>
    );
};

export default Row6;