import React from "react";
import {Box, Text, Stack} from "@mantine/core";
import styles from "./SearchBarShowcase.module.css";

const SearchBarShowcase = () => {


    return (
        <Stack className={styles.searchBarShowcase} gap="xs" justify="center" align="center">
            <Box>
                <Text className={styles.searchBarHeaderText}>Here's a search bar I made for one of my personal projects.</Text>
                <Text className={styles.searchBarHeaderText}>I invite you to interact with it!</Text>
            </Box>
        </Stack>
    )
}
export default SearchBarShowcase;