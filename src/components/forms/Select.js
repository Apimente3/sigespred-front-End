import React from 'react';

const Select = ({children, onChange, required, name, value,initial=true}) => {
    return (
        <>
            <select
                required={required}
                className="form-control input-sm"
                name={name}
                onChange={onChange}
                value={value}
            >
                {initial ? <option value="0">-- SELECCIONE --</option> : ''}
                {children}

            </select>
        </>
    );
};

export default Select;