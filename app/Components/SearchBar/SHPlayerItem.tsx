import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import styles from './SearchHistoryItem.module.css';
import { IoClose } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface SHPlayerItemProps {
    id: string;
    onRemove: (id: string) => void;
    onSuccessfulFetch?: (id: string) => void;
    playerData?: SHPlayer;
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

const SHPlayerItem: React.FC<SHPlayerItemProps> = ({id, onRemove, onSuccessfulFetch, playerData}) => {
    const [shPlayer, _] = useState<SHPlayer | null>(playerData || null);
    const [removePressed, setRemovePressed] = useState(false);

    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    // Note: Hooks and constants removed for showcase.

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