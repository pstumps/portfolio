'use client'
import { useEffect, useState } from 'react';
import {SegmentedControl, Group, useMantineColorScheme} from '@mantine/core';
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

export function ColorSchemeToggle() {
    const {setColorScheme, colorScheme} = useMantineColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Group justify="center" mt="xl">
            <SegmentedControl
                defaultValue={'light'}
                value={colorScheme}
                onChange={(value) => setColorScheme(value as 'light' | 'dark')}
                data={[
                    { label: <IoMdSunny />, value: 'light' },
                    { label: <FaMoon />, value: 'dark' },
                ]}
                fullWidth
            />
        </Group>
    );
}
