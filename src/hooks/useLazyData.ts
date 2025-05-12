import { AxiosRequestConfig, CanceledError } from "axios";
import { useCallback, useState } from "react";
import apiClient from "../services/api-client";


interface FetchResponse<T> {
    count: number,
    results: T | T[];
}

interface Props {
    endpoint: string,
    requestConfig?: AxiosRequestConfig;
}

const useLazyData = <T>({endpoint, requestConfig} : Props) => {

    const [ data, setData ] = useState<T[] | T>([]);
    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const loadData = useCallback(() => {
        const controller = new AbortController();
        setIsLoading(true)
        apiClient.get
            <FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig })
            .then((res) => {
                setData(res.data.results)
                setIsLoading(false);
            }) 
            .catch ((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setIsLoading(false)
            })
            return () => controller.abort();
        
    }, [endpoint, requestConfig])

    return { data, error, isLoading, loadData}

}


export default useLazyData;