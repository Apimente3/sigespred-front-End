import React from 'react';

const Input = ({required,type,placeholder,name,onChange,value,pattern,title,readonly=false}) => {
    return (
        <>
            <input required={ required ? "required": ""}
                   type={type}
                   className="form-control input-sm"
                   placeholder={placeholder}
                   name={name}
                   onChange={onChange}
                   value={value}
                   pattern={pattern}
                   title={title}
                   readOnly={readonly}
            >
            </input>
        </>
    );
};

export default Input;