'use client'
import { ColorSchemeToggle } from "./Components/ColorSchemeToggle/ColorSchemeToggle";
import FullPageScroller from "./Components/Scroller/FullPageScroller";
import Landing from "./Components/Landing/LandingComponent";
import SearchBarShowcase from "./Components/SearchbarShowcase/SearchBarShowcase";
import { useMantineTheme, useMantineColorScheme } from "@mantine/core";

export default function HomePage() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const backgroundColor = colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.light[0];

    const textColor = colorScheme === 'dark'
        ? theme.colors.light[0]
        : theme.colors.dark[0];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: backgroundColor,
                color: textColor,
                position: "relative"
            }}
        >
            <div
                style={{
                    position: "fixed",
                    top: 16,
                    right: 16,
                    zIndex: 1000
                }}
            >
                <ColorSchemeToggle />
            </div>
            <FullPageScroller
                duration={0.75}
                sections={[
                    <Landing key="landing" />,
                    <SearchBarShowcase key="search-bar-showcase" />
                ]}
            />
        </div>
    )
}
