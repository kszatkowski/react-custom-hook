import { useCallback, useState } from 'react';

type RequestConfig = {
    url: string;
    options?: RequestInit | undefined;
}

type UseHttpResponse = {
    isLoading: boolean;
    errorMessage: string;
    sendRequest: (requestConfig: RequestConfig, applyDataFn: (responseData: any) => void) => void
}

const useHttp = (): UseHttpResponse => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const sendRequest = useCallback(async (requestConfig: RequestConfig, applyDataFn: (responseData: any) => void) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch(requestConfig.url, requestConfig?.options);

            if (!response.ok) {
                const message = getErrorMessage(response.status);
                throw new Error(message);
            }

            const responseData = await response.json();
            applyDataFn(responseData);
        } catch (err) {
            setErrorMessage((err as Error).message);
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        errorMessage,
        sendRequest
    }
}

const getErrorMessage = (status: number): string => {
    switch (status) {
        case 404:
            return 'Page not found.';
        default:
            return 'An error occurred. Please try again later.'
    }
}

export default useHttp;