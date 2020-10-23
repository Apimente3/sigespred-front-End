import React from 'react';

const Options = ({options}) => {
    return (
        <>
            { options.map((option,i)=>(
                <option key={i+1} value={option.value}>{option.text}</option>
            ))}
        </>
    );
};

export default Options;