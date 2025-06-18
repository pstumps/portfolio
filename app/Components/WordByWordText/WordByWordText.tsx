import React, { useEffect, useState } from 'react';
import { Text } from "@mantine/core";

interface WordByWordTextProps {
    children: string;
    className?: string;
    delay?: number;
    span?: boolean;
}

const WBWT: React.FC<WordByWordTextProps> = ({ children, className, delay=100, span=false }) => {
    const words = children.split(' ');
    const [vis, setVisCount] = useState(0);

    useEffect(() => {
        if (vis < words.length) {
            const timeout = setTimeout(() => setVisCount(vis + 1), delay);
            return () => clearTimeout(timeout);
        }
    }, [vis, words.length, delay]);
    const text = words.slice(0, vis).join(' ');

    return (
        <Text className={className} span={span}>
            {text}
        </Text>
    );
};
export default WBWT;