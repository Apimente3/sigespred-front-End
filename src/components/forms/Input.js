import React from 'react';

const Input = ({required,type,placeholder,name,onChange,value}) => {
    return (
        <>
            <input required={required}
                   type={type}
                   className="form-control input-sm"
                   placeholder={placeholder}
                   name={name}
                   onChange={onChange}
                   value={value}
            >
            </input>
        </>
    );
};

export default Input;