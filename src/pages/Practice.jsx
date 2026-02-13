import React, { useState } from 'react';
import styles from './Practice.module.css';
import { hangulData } from '../data/hangulData';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const Practice = () => {
    const [activeTab, setActiveTab] = useState('Flashcards');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const { markPracticed } = useProgress();

    const allChars = [...hangulData.consonants, ...hangulData.vowels];
    const currentChar = allChars[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % allChars.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + allChars.length) % allChars.length);
    };

    const handleFlip = () => {
        if (!isFlipped) {
            markPracticed(currentChar.id);
        }
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={styles.subHeader}>PRACTICE</span>
                <h1 className={styles.title}>Build Your Skills</h1>
            </header>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'Flashcards' ? styles.active : ''}`}
                    onClick={() => setActiveTab('Flashcards')}
                >
                    Flashcards
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'Writing' ? styles.active : ''}`}
                    onClick={() => setActiveTab('Writing')}
                >
                    Writing
                </button>
            </div>

            {activeTab === 'Flashcards' && (
                <div className={styles.flashcardContainer}>
                    <div className={styles.cardScene} onClick={handleFlip}>
                        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                            <div className={styles.cardFront}>
                                <span className={styles.char}>{currentChar.char}</span>
                                <span className={styles.hint}>tap to reveal</span>
                            </div>
                            <div className={styles.cardBack}>
                                <h2 className={styles.name}>{currentChar.name}</h2>
                                <p className={styles.roman}>({currentChar.romanization})</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <button className={styles.navBtn} onClick={handlePrev}>
                            <ArrowLeft size={16} /> Previous
                        </button>
                        <span className={styles.counter}>{currentIndex + 1} / {allChars.length}</span>
                        <button className={styles.navBtn} onClick={handleNext}>
                            Next <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Practice;
