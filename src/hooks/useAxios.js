import {useState,useEffect} from 'react';
import {initAxiosInterceptors} from '../config/axios';

export const UseAxios = ({url,method,options}) => {

    const [loading,setLoading] =useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const Axios = initAxiosInterceptors();
                const {data} = await Axios[method](url, options);
                setResponse(data);
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [url,method]);

    return {loading, response, error };

};

