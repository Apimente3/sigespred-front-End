import React from 'react';

const Options = ({options,index,valor}) => {
    return (
        <>
            { options.map((option,i)=>(
                <option key={i+1} value={option[index]}>{option[valor]}</option>
            ))}
        </>
    );
};

export default Options;