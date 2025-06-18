import { useMantineColorScheme, Box, Text, Stack, useMantineTheme } from "@mantine/core";
import WBWT from "../WordByWordText/WordByWordText";
import styles from "./Landing.module.css";

const Landing = () => {
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();

    const textColor = colorScheme === 'dark'
        ? theme.colors.light[0]
        : theme.colors.dark[0];

    return (
        <Box className={styles.landing} style={{ color: textColor }}>
            <Box className={styles.greeting}>
                <Text className={styles.greetingText}>Hello!</Text>
                <Text className={styles.greetingText}>I&apos;m Patrick.</Text>
            </Box>
            <Stack className={styles.aboutMe} gap="md">
                <Stack className={styles.description} gap="md">
                    <WBWT className={styles.descriptionText} span>
                        I&apos;m a full-stack developer with a passion for creating dynamic, responsive, and
                        user-friendly web applications.
                    </WBWT>
                    <WBWT className={styles.descriptionText} span>
                        I specialize in building scalable applications using modern technologies and frameworks.
                        My goal is to deliver high-quality software that meets the needs of users and businesses alike.
                    </WBWT>
                    <WBWT className={styles.descriptionText} span>
                        I have experience in various programming languages and frameworks, primarily Python and
                        Django/Django REST Framework, along with JavaScript, TypeScript, React, and Node.js.
                    </WBWT>
                    <WBWT className={styles.descriptionText} span>
                        I enjoy working on challenging projects that push the boundaries of what is possible on the web.
                        In my free time, I love exploring new technologies and learning about the latest trends in web
                        development.
                    </WBWT>
                </Stack>
                <Box className={styles.moreInfo}>
                    <WBWT span className={styles.moreInfoText} span>
                        I didn&apos;t start off this way! I originally was a chemist- my degree is in
                        biochemistry. But I have always had a passion for technology and programming.
                        I&apos;ve pivoted that passion into a career in software development, and I couldn&apos;t be
                        happier. To me, it&apos;s a creative outlet!
                        But I&apos;m not just a developer! I&apos;m also a gamer and I love the outdoors.
                    </WBWT>
                </Box>
            </Stack>
        </Box>
    )
}
export default Landing;