import React, {useState, useEffect, useCallback} from "react";
import * as motion from "motion/react-client";
import { FaArrowDown } from "react-icons/fa";
import {Box, Text, Stack} from "@mantine/core";
import WBWT from "../WordByWordText/WordByWordText";
import styles from "./Landing.module.css";

const Landing = () => {

    const allText = [
        `I'm a full-stack developer with a passion for creating dynamic, responsive, and user-friendly web applications.`,
        `I specialize in building scalable applications using modern technologies and frameworks. My goal is to deliver high-quality software that meets the needs of users and businesses alike.`,
        `I have experience in various programming languages and frameworks, primarily Python and Django/Django REST Framework, along with JavaScript, TypeScript, React, and Next.js.`,
        `I didn't start off this way. I originally was a chemist- my degree is in biochemistry. But I have always had a passion for technology and programming. I've pivoted that passion into a career in software development, and I couldn't be happier. To me, it's a creative outlet!`,
    ]

    const [current, setCurrent] = useState(-1);
    const handleComplete = useCallback(
        (index: number) =>
            setTimeout(() => setCurrent(prev => (prev === index ? prev + 1 : prev)), 300),
        []
    );

    useEffect(() => {
        const id = setTimeout(() => setCurrent(0), 1500);
        return () => clearTimeout(id);
    }, []);

    return (
        <Box className={styles.landing}>
            <Box className={styles.greeting}>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.5,
                        scale: {type: "spring", visualDuration: 0.5},
                    }}
                >
                    <Text className={styles.greetingText} span>Hello!</Text>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 1,
                        duration: 0.5,
                        scale: {type: "spring", visualDuration: 0.5},
                    }}
                >
                    <Text className={styles.greetingText} span>I&apos;m Patrick.</Text>
                </motion.div>
            </Box>
            <Stack className={styles.aboutMe} gap="xs">
                {allText.map((text, i) => (
                    <WBWT
                        key={i}
                        className={i < 3 ? styles.descriptionText : styles.moreInfoText}
                        start={i === current}
                        span
                        onComplete={() => handleComplete(i)}
                    >
                        {text}
                    </WBWT>
                ))}
            </Stack>
            <Box className={styles.scrollHintWrapper}>
                <Text size="sm" fw={500}>
                    Scroll down for more
                </Text>
                <FaArrowDown size={28} className={styles.arrow}/>
            </Box>
        </Box>
    )
}
export default Landing;