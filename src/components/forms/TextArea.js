import React from 'react';

const TextArea = ({required,type,placeholder,name,onChange,value,pattern,title,readonly=false}) => {
    return (
        <>
            <textarea required={ required ? "required": ""}
                   type={type}
                   className="form-control input-sm"
                   placeholder={placeholder}
                   name={name}
                   onChange={onChange}
                   pattern={pattern}
                   title={title}
                   readOnly={readonly}
            >{value}
            </textarea>
        </>
    );
};

export default TextArea;