import React, { useEffect, useState, useRef } from 'react';

const delay = ms => new Promise(res => setTimeout(res, ms));

const withDebounce = () => {
    const [isActive, setIsActive] = useState(false);
    const debounceFn = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        if (isActive && debounceFn.current) {
            debounceFn.current();
            setIsActive(false);
        }
    }, [isActive]);

    async function debounce(fn, ms = 700) {
        if (debounceTimeout.current) return;
        setIsActive(true);
        debounceFn.current = fn;
        debounceTimeout.current = delay(ms);
        await debounceTimeout.current;
        debounceTimeout.current = null;
    }

    return { debounce, isActive };
};

export default withDebounce;
