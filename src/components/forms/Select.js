import React from 'react';

const Select = ({children, onChange, required, name, value,initial=true,title="Seleccione un valor"},readonly=false) => {
    return (
        <>
            <select
                required={required?"required":""}
                className="form-control input-sm"
                name={name}
                onChange={onChange}
                value={value}
                title={title}
                readOnly={readonly}
            >
                {initial ? <option value="">-- SELECCIONE --</option> : ''}
                {children}

            </select>
        </>
    );
};

export default Select;