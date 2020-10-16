import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const ComboOptions = ({data, valorkey, valornombre}) => {
    let varData = null;

    if (data) {
        varData = data[Object.keys(data)[0]];
    }
    
    if (varData) {
        return (
            <>
                {varData.map((value) =>  
                    <option key={value[`${valorkey}`].toString()} value={value[`${valorkey}`].toString()}>
                        {value[`${valornombre}`].toString()}
                    </option>
                )}

            </>
        );
    } else {
        return (
            <>
            </>
        );
    }

};

// Checkbox.propTypes = {
//     type: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     checked: PropTypes.bool,
//     onChange: PropTypes.func.isRequired,
// }ç//<input type={type} name={name} checked={checked} onChange={onChange} />

export default ComboOptions;