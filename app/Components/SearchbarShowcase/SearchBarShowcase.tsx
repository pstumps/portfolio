import React from "react";
import {Box, Text, Stack} from "@mantine/core";
import styles from "./SearchBarShowcase.module.css";
import GGSearchBar from "@/app/Components/SearchBar/ggsearchbar";

const SearchBarShowcase = () => {


    return (
        <Stack className={styles.searchBarShowcase} gap="xs" justify="center" align="center">
            <Box>
                <Text className={styles.searchBarHeaderText}>Here&#39;s a search bar I made for one of my personal projects.</Text>
                <Text className={styles.searchBarHeaderText}>I invite you to interact with it!</Text>
            </Box>
            <div className={styles.searchBarContainer}>
                <GGSearchBar />
            </div>
        </Stack>
    )
}
export default SearchBarShowcase;