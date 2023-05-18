import { useState, useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchJokesHandler = useCallback(async (requestOptions,сonvertRecivedData) => {
        setIsLoading(true);
        try {
            const response = await fetch(requestOptions.url, {
                method: requestOptions.method ? requestOptions.method : 'GET',
                headers: requestOptions.headers ? requestOptions.headers : {},
                body: requestOptions.body ? JSON.stringify(requestOptions.body) : null
            });
            
            if (!response.ok) {
                throw new Error('Something went wrong :(');
            }
            const jokesData = await response.json();
            сonvertRecivedData(jokesData);
            
        } catch (e) {
            setError(e.message);
        }
        setIsLoading(false);
    }, []);

    return { isLoading, error, fetchJokesHandler};
}

export default useHttp;