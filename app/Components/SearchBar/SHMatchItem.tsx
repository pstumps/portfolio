import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './SearchHistoryItem.module.css';
import { IoClose } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface SHMatchItemProps {
    id: string;
    onRemove: (id: string) => void;
    matchData: SHMatch;
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

const SHMatchItem: React.FC<SHMatchItemProps> = ({id, onRemove, matchData}) => {
    const [SHMatch, _] = useState<SHMatch | null>(matchData || null);
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [removePressed, setRemovePressed] = useState(false);

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
                    {hovered
                        ? <FaStar color='yellow' style={pressed ? {transform: 'scale(0.9)'} : {}}/>
                        : <FaRegStar color='yellow' style={pressed ? {transform: 'scale(0.9)'} : {}}/>
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
                            alt={id}
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