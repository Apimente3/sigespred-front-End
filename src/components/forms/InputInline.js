import React from 'react';

const InputInline = ({label,require=true,withLabel=4, withControl=8,required,type,placeholder,name,onChange,value,pattern,title,maxLength}) => {

    let wLabel=`col-lg-${withLabel} control-labe`;
    let wControl=`col-lg-${withControl}`;
    return (
        <>
            <label className={wLabel}>
                {require ? <span className="obligatorio">* </span>:''}
                {label}</label>
            <div className={wControl}>
                <input required={ require ? "required": ""}
                       type={type}
                       className="form-control input-sm"
                       placeholder={placeholder}
                       name={name}
                       onChange={onChange}
                       value={value}
                       pattern={pattern}
                       title={title}
                       maxLength={maxLength}
                >
                </input>
            </div>
        </>
    );
};

export default InputInline;