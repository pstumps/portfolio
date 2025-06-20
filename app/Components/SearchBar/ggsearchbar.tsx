'use client';
// import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { TextInput, SegmentedControl } from '@mantine/core';
import { CiCircleAlert } from "react-icons/ci";
import floatingLabelClasses from './FloatingLabelInput.module.css';
import gradientSegmentClasses from './GradientSegmentedControl.module.css';
import { players, matches } from '@/app/MockData/MockData';

import styles from './ggsearchbar.module.css';
import SHMatchItem from "./SHMatchItem";
import SHPlayerItem from "./SHPlayerItem";

type PlaceHolderKey = 'player' | 'match';

interface SHMatch {
    deadlock_id: string;
    length: number;
    date: number;
    SF_team: string[];
    AH_team: string[];
    victor: string;
    average_rank: string;
}

interface SHPlayer {
    id: string;
    name: string;
    icon: string;
    region: string;
    lastMatchAverageRank: lastMatchAverageRank;
}

const GGSearchBar: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<PlaceHolderKey>('player');
    const [focused, setFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const placeHolderMap : { [key in PlaceHolderKey]: string } = {
        player: 'Search by Profile ID...',
        match: 'Search by Match ID...'
    };
    const [value, setValue] = useState('');
    const floating = value.trim().length !== 0 || focused || undefined;
    const [playerHistory, setPlayerHistory] = useState<string[]>([]);
    const [matchHistory, setMatchHistory] = useState<string[]>([]);

    useEffect(() => {
        const allPlayerIds = Object.keys(players);
        const allMatchIds = Object.keys(matches);
        setPlayerHistory(allPlayerIds);
        setMatchHistory(allMatchIds);
        // In the real app, searched players/matches would be put in local storage.
        // const storedPlayerHistory = localStorage.getItem('playerHistory');
        // const storedMatchHistory = localStorage.getItem('matchHistory');
        // if (storedPlayerHistory) setPlayerHistory(JSON.parse(storedPlayerHistory));
        // if (storedMatchHistory) setMatchHistory(JSON.parse(storedMatchHistory));
    }, []);

    const currentHistory = selectedValue === 'player' ? playerHistory : matchHistory;

    const handleFocus = () => {
        setIsVisible(true);
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && value.trim()) {
            let finalValue = value.trim();

            if (selectedValue === 'player') {
                const profileRegex = /\/profiles\/(\d+)/;
                const match = finalValue.match(profileRegex);
                if (match && match[1]) {
                    const steamId64 = BigInt(match[1]);
                    finalValue = (steamId64 - BigInt(76561197960265728)).toString();
                } else {
                    if (/^\d{17}$/.test(finalValue)) {
                        const steamId64 = BigInt(finalValue);
                        finalValue = (steamId64 - BigInt(76561197960265728)).toString();
                    }
                }

                // Update player history
                const updatedPlayerHistory = [finalValue, ...playerHistory.filter((item) => item !== finalValue)];
                setPlayerHistory(updatedPlayerHistory);
                localStorage.setItem('playerHistory', JSON.stringify(updatedPlayerHistory));
            } else {
                // Update match history
                const updatedMatchHistory = [finalValue, ...matchHistory.filter((item) => item !== finalValue)];
                setMatchHistory(updatedMatchHistory);
                localStorage.setItem('matchHistory', JSON.stringify(updatedMatchHistory));
            }

            // Navigate to the appropriate page, not necessary for showcase
            // router.push(`/${selectedValue}/${encodeURIComponent(finalValue)}`);
        }
    };

    const handleRemovePlayerHistoryItem = (id: string) => {
        const updatedPlayerHistory = playerHistory.filter((item) => item !== id);
        setPlayerHistory(updatedPlayerHistory);
        localStorage.setItem('playerHistory', JSON.stringify(updatedPlayerHistory));
    }

    const handleRemoveMatchHistoryItem = (id: string) => {
        const updatedMatchHistory = matchHistory.filter((item) => item !== id);
        setMatchHistory(updatedMatchHistory);
        localStorage.setItem('matchHistory', JSON.stringify(updatedMatchHistory));
    };


    const handleHistoryItemClick = (item: string) => {
        setValue(item);
        // removed for showcase
        //router.push(`/${selectedValue}/${encodeURIComponent(item)}`);
    };


    return (
        <div className={styles['layout-container']} onBlur={handleBlur} onFocus={handleFocus} tabIndex={-1}
             data-focused={focused}>
            {isVisible && (
                <div className={styles['other-stuff']} data-focused={focused}>
                    <div
                        className={`${styles['segmentedControl']} ${
                            focused ? styles['fadeIn'] : styles['fadeOut']
                        }`}
                    >
                        <SegmentedControl
                            data={[
                                {label: 'Profile', value: 'player'},
                                {label: 'Match', value: 'match'},
                            ]}
                            value={selectedValue}
                            onChange={(value: string) => setSelectedValue(value as PlaceHolderKey)}
                            classNames={gradientSegmentClasses}
                        />
                    </div>
                    <div
                        className={`${styles['proggText']} ${focused ? styles['fadeInRight'] : styles['fadeOutRight']}`}>
                        PROGG
                    </div>
                </div>
            )}
            <div className={styles['ti-wrapper']}>
                <TextInput
                    label={floating ? placeHolderMap[selectedValue] : "Search by Profile URL or Match ID..."}
                    placeholder={placeHolderMap[selectedValue]}
                    classNames={floatingLabelClasses}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    mt="md"
                    autoComplete="nope"
                    data-floating={floating}
                    labelProps={{'data-floating': floating}}
                    onKeyDown={handleKeyDown}
                />
                <div
                    className={`${styles['search-history-container']} ${
                        focused ? styles['visible'] : ''
                    }`}
                >
                    <h3 className={styles['search-history-title']}>
                        {selectedValue === 'player' ? 'Player Search History' : 'Match Search History'}
                    </h3>
                    {currentHistory.length > 0 ? (
                        <ul className={styles['search-history']}>
                            {currentHistory.map((item, idx) => (
                                <li
                                    key={idx}
                                    tabIndex={0}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                    onClick={() => handleHistoryItemClick(item)}
                                    className={styles['search-history-item']}
                                >
                                    {selectedValue === 'player' ? (
                                        <SHPlayerItem id={item} onRemove={handleRemovePlayerHistoryItem} playerData={players[item]}/>
                                    ) : (
                                        <SHMatchItem id={item} onRemove={handleRemoveMatchHistoryItem} matchData={matches[item]} />
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={styles['no-history-message']}>
                            <CiCircleAlert size={18} className={styles['icon-alert']}/>
                            No {selectedValue === 'player' ? 'Player' : 'Match'} Search History!
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default GGSearchBar