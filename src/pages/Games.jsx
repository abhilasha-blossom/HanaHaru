import React, { useState, useEffect } from 'react';
import styles from './Games.module.css';
import { hangulData } from '../data/hangulData';
import { useProgress } from '../context/ProgressContext';

const Games = () => {
    const [activeTab, setActiveTab] = useState('Quiz');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null); // null, true, false
    const [score, setScore] = useState(0);
    const { markBloomed } = useProgress();

    const allChars = [...hangulData.consonants, ...hangulData.vowels];

    // Initialize or Reset Question
    const generateQuestion = () => {
        const randomChar = allChars[Math.floor(Math.random() * allChars.length)];

        // Generate 3 distractors
        const distractors = [];
        while (distractors.length < 3) {
            const d = allChars[Math.floor(Math.random() * allChars.length)];
            if (d.id !== randomChar.id && !distractors.find(x => x.id === d.id)) {
                distractors.push(d);
            }
        }

        const newOptions = [...distractors, randomChar].sort(() => Math.random() - 0.5);

        setCurrentQuestion(randomChar);
        setOptions(newOptions);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const handleOptionClick = (option) => {
        if (selectedOption) return; // Prevent multiple clicks

        setSelectedOption(option);

        if (option.id === currentQuestion.id) {
            setIsCorrect(true);
            setScore(s => s + 10);
            markBloomed(currentQuestion.id);

            // Auto advance
            setTimeout(() => {
                generateQuestion();
            }, 1500);
        } else {
            setIsCorrect(false);
            // Allow retry or show correct? For calm app, maybe just shake and let them try or show correct.
            // Let's just wait and reset for now to keep flow steady.
            setTimeout(() => {
                generateQuestion();
            }, 1500);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={styles.subHeader}>LEARNING GAMES</span>
                <h1 className={styles.title}>Play & Learn</h1>
            </header>

            <div className={styles.tabs}>
                <button className={`${styles.tab} ${activeTab === 'Quiz' ? styles.active : ''}`}>Quiz</button>
                <button className={styles.tab}>Matching</button>
                <button className={styles.tab}>Sound It Out</button>
            </div>

            {activeTab === 'Quiz' && currentQuestion && (
                <div className={styles.quizContainer}>
                    <p className={styles.questionCount}>Question {score / 10 + 1}</p>

                    <div className={styles.questionCard}>
                        <p className={styles.instruction}>What is this character?</p>
                        <div className={styles.largeChar}>{currentQuestion.char}</div>
                    </div>

                    <div className={styles.optionsGrid}>
                        {options.map((opt) => {
                            let btnClass = styles.optionBtn;
                            if (selectedOption === opt) {
                                if (opt.id === currentQuestion.id) btnClass += ` ${styles.correct}`;
                                else btnClass += ` ${styles.incorrect}`;
                            }
                            // Show correct answer if wrong one selected
                            if (selectedOption && opt.id === currentQuestion.id && selectedOption.id !== opt.id) {
                                btnClass += ` ${styles.correct}`;
                            }

                            return (
                                <button
                                    key={opt.id}
                                    className={btnClass}
                                    onClick={() => handleOptionClick(opt)}
                                >
                                    {opt.name} ({opt.romanization})
                                </button>
                            );
                        })}
                    </div>

                    <div className={styles.scoreBoard}>Score: {score}</div>
                </div>
            )}
        </div>
    );
};

export default Games;
