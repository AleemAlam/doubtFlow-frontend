import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const useAxios = ({ url, method='get', body = null, headers = null, isReply=false}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const [reply, setReply] = useState([]);

    const fetchData = async () => {
        try{
            const res = await axios[method](url, JSON.parse(headers), JSON.parse(body))
            setResponse(res.data)
            setloading(false)
            if(isReply) {
                const rep = await axios.get(`/reply/${res.question[0].creator}`);
                setReply(rep);
            } 
        } catch(err) {
            console.log(err);
            setError(true)
        }
        
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading, reply };
};

export default useAxios;