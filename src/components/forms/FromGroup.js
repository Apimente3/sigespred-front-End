import React from 'react';

const FromGroup = ({children,label,require,}) => {
    return (
        <div className="form-group ">
            <label className="col-lg-4 control-label">{require? <span className="obligatorio">* </span>:''}
                {label}</label>
            <div className="col-lg-8">
                {children}

            </div>


        </div>
    );
};

export default FromGroup;