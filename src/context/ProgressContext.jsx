import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('hanaharu_progress');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('hanaharu_progress', JSON.stringify(progress));
    }, [progress]);

    // Status: null (locked) -> 'practiced' -> 'bloomed'

    const markPracticed = (charId) => {
        setProgress(prev => {
            // Don't downgrade 'bloomed' to 'practiced'
            if (prev[charId] === 'bloomed') return prev;
            return { ...prev, [charId]: 'practiced' };
        });
    };

    const markBloomed = (charId) => {
        setProgress(prev => ({ ...prev, [charId]: 'bloomed' }));
    };

    const getStatus = (charId) => progress[charId] || 'locked';

    const getStats = () => {
        const values = Object.values(progress);
        const bloomed = values.filter(s => s === 'bloomed').length;
        const practiced = values.filter(s => s === 'practiced').length;
        return { bloomed, practiced };
    };

    return (
        <ProgressContext.Provider value={{ progress, markPracticed, markBloomed, getStatus, getStats }}>
            {children}
        </ProgressContext.Provider>
    );
};
