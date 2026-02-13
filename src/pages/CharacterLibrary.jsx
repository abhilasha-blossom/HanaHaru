import React, { useState } from 'react';
import styles from './CharacterLibrary.module.css';
import { hangulData } from '../data/hangulData';

const CharacterLibrary = () => {
    const [filter, setFilter] = useState('consonants'); // 'consonants' or 'vowels'

    const data = filter === 'consonants' ? hangulData.consonants : hangulData.vowels;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={styles.subHeader}>CHARACTER LIBRARY</span>
                <h1 className={styles.title}>Browse Hangul</h1>
            </header>

            <div className={styles.toggleContainer}>
                <button
                    className={`${styles.toggleBtn} ${filter === 'consonants' ? styles.active : ''}`}
                    onClick={() => setFilter('consonants')}
                >
                    Consonants ({hangulData.consonants.length})
                </button>
                <button
                    className={`${styles.toggleBtn} ${filter === 'vowels' ? styles.active : ''}`}
                    onClick={() => setFilter('vowels')}
                >
                    Vowels ({hangulData.vowels.length})
                </button>
            </div>

            <div className={styles.grid}>
                {data.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <span className={styles.char}>{item.char}</span>
                        {/* Hover details could go here, for now keeping it clean like the image */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterLibrary;
