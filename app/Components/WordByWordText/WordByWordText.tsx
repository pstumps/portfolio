import React, { useEffect, useState, useMemo, useRef } from 'react';

import { Text } from "@mantine/core";

import styles from './WordByWordText.module.css';

interface WordByWordTextProps {
    children: string;
    className?: string;
    start?: boolean;
    delay?: number; // in ms
    span?: boolean;
    onComplete?: () => void;
}

const WBWT: React.FC<WordByWordTextProps> = ({ children, className, start=false, delay=50, span=false, onComplete }) => {
    const words = useMemo(() => children.trim().split(/\s+/), [children]);
    const [vis, setVis] = useState(0);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const hasCalled = useRef(false);
    const noop = () => {}; // null operation to avoid undefined errors
    const onCompleteRef = useRef<() => void>(() => {});

    useEffect (() => {
        onCompleteRef.current = onComplete || noop;
    }, [onComplete]);


    useEffect(() => {
        if (!start) return;
        hasCalled.current = false;
        setVis(0);
        timer.current = setInterval(() => {
            setVis(v => {
                if (v >= words.length) {
                    if (timer.current) clearInterval(timer.current);
                    onCompleteRef.current?.();
                }
                return v + 1;
            });
        }, delay);
        return () => {
            if (timer.current) clearInterval(timer.current);
        }
    }, [start, delay, words.length]);

    return (
        <Text component={span ? 'span' : 'p'} className={className}>
            {words.map((w, i) => (
                <span
                    key={i}
                    className={`${styles.word} ${i < vis ? styles.visible : ''}`}
                >
                    {w}
                    {i < words.length - 1 && ' '}
                </span>
            ))}
        </Text>
    );
};
export default WBWT;