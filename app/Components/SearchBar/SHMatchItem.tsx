import React, { useEffect, useState } from 'react';
// import { useUser, ggUser } from '@/app/context/UserContext';
// import { useCsrfToken } from '@/app/context/security/CSRFContext';
import Image from 'next/image';

import styles from './SearchHistoryItem.module.css';
import { IoClose } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface SHMatchItemProps {
    id: string;
    onRemove: (id: string) => void;
    onSuccessfulFetch?: (id: string) => void;
}


interface SHMatch {
    deadlock_id: string;
    length: number;
    date: number;
    SF_team: string[];
    AH_team: string[];
    victor: string;
    average_rank: string;
}

const SHMatchItem: React.FC<SHMatchItemProps> = ({id, onRemove, onSuccessfulFetch}) => {
    const { user, setUser } = useUser();
    const { csrfToken } = useCsrfToken();
    const [SHMatch, setSHMatch] = useState<SHMatch | null>(null);
    const isFavorite = user?.matchFavorites?.includes(id) ?? false;
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [removePressed, setRemovePressed] = useState(false);

    /* Not necessary in showcase, but kept for reference
    useEffect(() => {
        const cachedData = localStorage.getItem(`match_${id}`);
        if (cachedData) {
            setSHMatch(JSON.parse(cachedData));
        } else {
            fetchSHMatch();
        }
        async function fetchSHMatch()  {
            try {
                const res = await fetch(`http://127.0.0.1:8080/matches/${id}/search-item/`);
                if (!res.ok) throw new Error('Failed to fetch player data');
                const data: SHMatch = await res.json();
                localStorage.setItem(`match_${id}`, JSON.stringify(data));
                setSHMatch(data);
                onSuccessfulFetch?.(id);
            } catch (err) {
                setSHMatch(null);
            }
        }
    }, [id, onSuccessfulFetch]);
    */


    const handleFavoriteToggle = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!user) {
            return;
        }
        const method = isFavorite ? 'DELETE' : 'POST';
        const fetchOptions = {
            method,
            credentials: 'include' as const,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken ?? '',
            },
            body: JSON.stringify({ data: id }),
        };

        try {
            const res = await fetch(`http://127.0.0.1:8080/user_mgmt/match-favorites/${id}/`,  fetchOptions);
            if (res.ok) {
                setUser((prevUser: ggUser) => {
                    const currentFavorites = prevUser?.matchFavorites ?? [];
                    return {
                        ...prevUser,
                        matchFavorites: isFavorite
                            ? currentFavorites.filter((favId: string) => favId !== id)
                            : [...currentFavorites, id],
                    };
                });
            } else {
                console.error('Failed to update favorites');
            }
        } catch (err) {
            console.error('Error updating favorite:', err);
        }
    };

    if (!SHMatch) {
        return (
            <div className={styles['player-item']}>
                <div className={styles['match-item__left']}>
                    <span>{id}</span>
                </div>
                <div className={styles['player-item__right']}>
                    <IoClose
                        onMouseDown={(e) => {
                            setRemovePressed(true);
                            e.stopPropagation()
                        }}
                        onMouseUp={() => setRemovePressed(false)}
                        className={styles['close-icon']}
                        style={removePressed ? {transform: 'scale(0.9)'} : {}}
                        onClick={() => onRemove(id)}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles['player-item']}>
            <div className={styles['match-item__left']}>
                <div
                    className={styles['favorite']}
                    onClick={handleFavoriteToggle}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => {
                        setHovered(false);
                        setPressed(false);
                    }}
                    onMouseDown={(e) => {
                        setPressed(true);
                        e.stopPropagation()
                    }}
                    onMouseUp={() => setPressed(false)}
                >
                    {isFavorite
                        ? (hovered
                            ? <FaRegStar color='yellow' style={pressed ? {transform: 'scale(0.9)'} : {}}/>
                            : <FaStar color='yellow' style={pressed ? {transform: 'scale(0.9)'} : {}}/>)
                        : (hovered
                            ? <FaStar color='yellow' style={pressed ? {transform: 'scale(0.9)'} : {}}/>
                            : <FaRegStar color='yellow' style={pressed ? {transform: 'scale(0.9)'} : {}}/>)
                    }
                </div>
                <Image src={SHMatch?.average_rank ?? ''} alt="" width={30} height={30}/>
                <span style={{fontSize: '11px'}}>
                    {new Date(SHMatch.date * 1000).toLocaleDateString('en-US',
                        {year: '2-digit', month: '2-digit', day: '2-digit'})}
                </span>
            </div>
            <div className={styles['player-item__mid']}>
                <div className={styles['player-item__id']} style={{fontSize: '12px'}}>{id}</div>
                <div className={styles['team']}>
                    {SHMatch?.AH_team.map((id, index) => (
                        <Image
                            src={'/images/heroes/' + id + '_sm.webp'}
                            alt={id}
                            width={20}
                            height={20}
                            key={index}
                            style={{
                                borderRadius: '50%',
                                border: '1.25px solid',
                                borderColor: '#ffbf00',
                            }}
                        />
                    ))}
                    {SHMatch?.victor === '0' && <span className={styles['green-circle']}/>}
                </div>
                <div className={styles['team']}>
                    {SHMatch?.SF_team.map((id, index) => (
                        <Image
                            src={'/images/heroes/' + id + '_sm.webp'}
                            alt={heroIDToIcons['jeff']}
                            width={20}
                            height={20}
                            key={index}
                            style={{
                                borderRadius: '50%',
                                border: '1.25px solid',
                                borderColor: '#1351c9',
                            }}
                        />
                    ))}
                    {SHMatch?.victor === '1' && <span className={styles['green-circle']}/>}
                </div>
            </div>
            <div className={styles['player-item__right']}>
                <IoClose
                    onMouseDown={(e) => {
                        setRemovePressed(true);
                        e.stopPropagation()
                    }}
                    onMouseUp={() => setRemovePressed(false)}
                    className={styles['close-icon']}
                    style={removePressed ? {transform: 'scale(0.9)'} : {}}
                    onClick={() => onRemove(id)}
                />
            </div>
        </div>
    );
}
export default SHMatchItem;