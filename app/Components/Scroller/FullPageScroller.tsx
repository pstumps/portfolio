'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface FullPageScrollerProps {
    sections: React.ReactNode[];
    duration?: number; // ms
}

export default function FullPageScroller({ sections, duration=500 }: FullPageScrollerProps) {
    const [index, setIndex] = useState(0);
    const locked = useRef(false);
    const dir = useRef<1 | -1>(1);
    
    const clamp = (i: number) => Math.max(0, Math.min(i, sections.length - 1));
    
    const navigate = useCallback(
        (delta: number) => {
            if (locked.current) return;
            dir.current = delta > 0 ? 1 : -1;
            const next = clamp(index + dir.current);
            if (next !== index) {
                locked.current = true;
                setIndex(next);
                setTimeout(() => {
                    locked.current = false;
                }, duration * 1000 + 100);
            }
        }, [index, duration, sections.length, clamp]
    );
    
    useEffect(() => {
        const onWheel = (e: WheelEvent) => navigate(e.deltaY);
        window.addEventListener('wheel', onWheel, { passive: true });
        return () => {
            window.removeEventListener('wheel', onWheel);
        }
    }, [navigate]);

    const variants = {
        enter: (d: 1 | -1) => ({y:`${d * 100}%`, opacity: 0}),
        center: {y: '0%', opacity: 1},
        exit: (d: 1 | -1) => ({y:`${-d * 100}%`, opacity: 0})
    };

    return (
        <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence custom={dir.current} mode="wait">
                <motion.div
                    key={index}
                    custom={dir.current}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    transition={{ duration, ease:[0.4, 0, 0.2, 1] }}
                    style={{
                        height: '100vh',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {sections[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}