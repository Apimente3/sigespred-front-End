import React from 'react';
import Row6 from "./Row6";

const FormGroupInline = ({children}) => {
    return (
        <>
            <div className="form-group">
                {children}

            </div>
        </>
    );
};

export default FormGroupInline;