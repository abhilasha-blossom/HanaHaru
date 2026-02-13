import React from 'react';
import styles from './Garden.module.css';
import { hangulData } from '../data/hangulData';
import { useProgress } from '../context/ProgressContext';
import { Flower, Sprout, Lock } from 'lucide-react';

const Garden = () => {
    const { getStatus, getStats } = useProgress();
    const { bloomed, practiced } = getStats();
    const total = hangulData.consonants.length + hangulData.vowels.length;
    const remaining = total - bloomed;

    const renderGrid = (data) => (
        <div className={styles.grid}>
            {data.map((item) => {
                const status = getStatus(item.id); // locked, practiced, bloomed
                return (
                    <div key={item.id} className={`${styles.plantPot} ${styles[status]}`}>
                        <span className={styles.char}>{item.char}</span>
                        <div className={styles.statusIcon}>
                            {status === 'bloomed' && <Flower size={14} color="#E87070" />}
                            {status === 'practiced' && <Sprout size={14} color="#8DA875" />}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={styles.subHeader}>YOUR GARDEN</span>
                <h1 className={styles.title}>Watch It Bloom</h1>
                <p className={styles.subtitle}>{bloomed} of {total} characters learned • {Math.round((bloomed / total) * 100)}% bloomed</p>
            </header>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Consonants</h3>
                {renderGrid(hangulData.consonants)}
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Vowels</h3>
                {renderGrid(hangulData.vowels)}
            </div>

            <div className={styles.statsFooter}>
                <div className={styles.statCard}>
                    <Flower size={24} color="#E8A0A0" />
                    <span className={styles.statValue}>{bloomed}</span>
                    <span className={styles.statLabel}>Bloomed</span>
                </div>
                <div className={styles.statCard}>
                    <Sprout size={24} color="#E8A0A0" />
                    <span className={styles.statValue}>{practiced}</span>
                    <span className={styles.statLabel}>Practiced</span>
                </div>
                <div className={styles.statCard}>
                    <Sprout size={24} color="#8DA875" />
                    <span className={styles.statValue}>{remaining}</span>
                    <span className={styles.statLabel}>Remaining</span>
                </div>
            </div>

            <p className={styles.footerNote}>
                Start learning characters to watch your garden grow! <Sprout size={14} style={{ display: 'inline' }} />
            </p>
        </div>
    );
};

export default Garden;
