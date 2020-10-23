import React from 'react';

const FromControl = ({children,label,require,withLabel=4, withControl=8}) => {
    let wLabel=`col-lg-${withLabel} control-labe`;
    let wControl=`col-lg-${withControl}`;
    return (
        <>
            <label className={wLabel}>{require? <span className="obligatorio">* </span>:''}
                {label}</label>
            <div className={wControl}>
                {children}
            </div>
        </>
    );
};

export default FromControl;