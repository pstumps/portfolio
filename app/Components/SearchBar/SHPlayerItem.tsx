import React, { useEffect, useState } from 'react';
// import { useUser, ggUser } from '@/app/context/UserContext';
// import { useCsrfToken } from '@/app/context/security/CSRFContext';
import Image from 'next/image';

import styles from './SearchHistoryItem.module.css';
import { IoClose } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface SHPlayerItemProps {
    id: string;
    onRemove: (id: string) => void;
    onSuccessfulFetch?: (id: string) => void;
}

interface lastMatchAverageRank {
    name: string;
    image: string;
}

interface SHPlayer {
    id: string;
    name: string;
    icon: string;
    region: string;
    lastMatchAverageRank: lastMatchAverageRank;
}

const SHPlayerItem: React.FC<SHPlayerItemProps> = ({id, onRemove, onSuccessfulFetch}) => {
    // const { user, setUser } = useUser();
    // const { csrfToken } = useCsrfToken();
    const [shPlayer, setSHPlayer] = useState<SHPlayer | null>(null);
    // const isFavorite = user?.favorites?.includes(id) ?? false;
    const [removePressed, setRemovePressed] = useState(false);

    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    /* Not necessary in showcase, but kept for reference
    useEffect(() => {
        const cachedData = localStorage.getItem(`player_${id}`);
        if (cachedData) {
            setSHPlayer(JSON.parse(cachedData));
        } else {
            fetchSHPlayer();
        }

        async function fetchSHPlayer () {
            try {
                const res = await fetch(`http://127.0.0.1:8080/players/${id}/search-item/`);
                if (!res.ok) throw new Error('Failed to fetch player data');
                const data: SHPlayer = await res.json();
                localStorage.setItem(`player_${id}`, JSON.stringify(data));
                setSHPlayer(data);
            } catch (err) {
                setSHPlayer(null);
            }
        }
    }, [id, onSuccessfulFetch]);


    const handleFavoriteToggle = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!user) {
            return;
        }

        try {
            const method = isFavorite ? 'DELETE' : 'POST';
            const res = await fetch(`http://127.0.0.1:8080/user_mgmt/player-favorites/${id}/`, {
                method,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken ?? ''
                },
            });

            if (res.ok) {
                setUser((prevUser: ggUser) => {
                    const currentFavorites = prevUser?.favorites ?? [];
                    return {
                        ...prevUser,
                        favorites: isFavorite
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
    */

    if (!shPlayer) {
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
            <div className={styles['player-item__left']}>
                <div
                    className={styles['favorite']}

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
                    {(hovered
                        ? <FaStar color='yellow' style={pressed ? {transform: 'scale(0.9)'} : {}} />
                        : <FaRegStar color='yellow' />)}
                </div>
                {shPlayer.region ? (<span>{shPlayer?.region}</span>) : null}
            </div>
            <div className={styles['player-item__mid']}>
                <Image src={shPlayer?.icon ?? ''} alt="" width={30} height={30}/>
                <div className={styles['player-item__name']}>{shPlayer?.name}</div>
                <div className={styles['player-item__id']}>{id}</div>
            </div>
            <div className={styles['player-item__right']}>
                {shPlayer?.lastMatchAverageRank && (
                    <div className={styles['rank']}>
                        <Image src={shPlayer?.lastMatchAverageRank?.image ?? ''} alt="" width={30} height={30}/>
                        <span>{shPlayer?.lastMatchAverageRank?.name}</span>
                    </div>
                )}
                <IoClose
                    onMouseDown={(e) => { setRemovePressed(true); e.stopPropagation()}}
                    onMouseUp={() => setRemovePressed(false)}
                    className={styles['close-icon']}
                    style={removePressed ? {transform: 'scale(0.9)'} : {}}
                    onClick={() => onRemove(id)}
                />
            </div>
        </div>
    );
}
export default SHPlayerItem;