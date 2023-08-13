import { useState, useEffect } from 'react';

export const useApi = (task: any, deps: any) => {
    const [data, setData] = useState(task.initialValue);
    const [inProgress, setInProgress] = useState(task.defer === false || task.currentUser === true);
    const [isError, setIsError] = useState(false);

    const execute = async (params = null) => {
        try {
            setInProgress(true);
            setIsError(false);
            setData(task.initialValue);

            const result = await task.action(params);

            setData(result);
            setInProgress(false);

            task.onSuccess && task.onSuccess(result);
        } catch (e) {
            setIsError(true);
            setInProgress(false);

            task.onError && task.onError(e);
        }
    };

    useEffect(() => {
        if (task.defer || task.condition === false) return;

        execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        data,
        inProgress,
        isError,
        setData,
        execute
    };
};

export default useApi;