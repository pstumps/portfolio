import "@mantine/core/styles.css";
import React from "react";
import {
    MantineProvider,
    ColorSchemeScript,
    mantineHtmlProps,
    createTheme,
} from "@mantine/core";
// import {theme} from "../theme";

const theme = createTheme({
  primaryColor: 'blue',

    colors: {
        light: ['#ffffff', '#f0f0f0', '#e0e0e0', '#d1d1d1', '#c2c2c2', '#b3b3b3', '#a4a4a4', '#959595', '#868686', '#777777'],
        dark: ['#1a1a1a', '#2c2c2c', '#3f3f3f', '#525252', '#666666', '#7a7a7a', '#8d8d8d', '#a1a1a1', '#b4b4b4', '#c8c8c8'],
    },
});


export default function RootLayout({children}: { children: any }) {

    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript/>
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme='auto'>{children}</MantineProvider>
            </body>
        </html>
    );
}
