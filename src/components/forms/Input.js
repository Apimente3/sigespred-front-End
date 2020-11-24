import React from 'react';

const Input = ({required,type,placeholder,name,onChange,value,pattern,title,readonly=false,autocomplete="on"}) => {
    return (
        <>
            <input required={ required ? "required": ""}
                   type={type}
                   className="form-control input-sm center-date"
                   placeholder={placeholder}
                   name={name}
                   onChange={onChange}
                   value={value}
                   pattern={pattern}
                   title={title}
                   readOnly={readonly}
                   autoComplete={autocomplete}
            >
            </input>
        </>
    );
};

export default Input;