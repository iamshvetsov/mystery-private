import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        const intervalId = setInterval(() => savedCallback.current(), delay);

        savedCallback.current();

        return () => clearInterval(intervalId);
    }, [delay]);
}
