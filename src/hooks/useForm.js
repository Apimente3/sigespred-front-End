import {useState} from 'react';

export const useForm = ( initialState = {} , fieldsUpperCase) => {
    const [values, setValues] = useState(initialState);
    const reset = () => {
        setValues( initialState );
    }
    const handleInputChange = ({ target }) => {
        console.log('target');
        console.log(target);
        if(fieldsUpperCase.includes(target.name)){
            setValues({
                ...values,
                [ target.name ]: target.value.toUpperCase()
            });
        }else{
            setValues({
                ...values,
                [ target.name ]: target.value
            });
        }
    }
    return [ values, setValues,handleInputChange,reset ];
}

