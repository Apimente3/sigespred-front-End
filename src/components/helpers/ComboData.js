import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const ComboData = ({ id, name, data, valorkey, valornombre, nombrefuncion}) => {

    const clickMe = () => {
        this.props.clickMe()
    }

    return (
        <>
        <div>
           
        </div>
        <select id={id} name={name} onChange={() => nombrefuncion()} className="form-control">
            <option value="">--SELECCIONE--</option>
            {data.result.map((value) =>  
                <option key={value[`${valorkey}`].toString()} value={value[`${valorkey}`].toString()}>
                    {value[`${valornombre}`].toString()}
                </option>
            )}
        </select>
        </>
    );
};

// Checkbox.propTypes = {
//     type: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     checked: PropTypes.bool,
//     onChange: PropTypes.func.isRequired,
// }ç//<input type={type} name={name} checked={checked} onChange={onChange} />

export default ComboData;