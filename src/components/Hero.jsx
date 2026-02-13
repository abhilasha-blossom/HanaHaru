import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
    const [petals, setPetals] = useState([]);
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Generate static petals on mount
        const newPetals = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal start
            delay: Math.random() * 15,  // Random delay
            duration: 12 + Math.random() * 10, // Slow duration
            size: 8 + Math.random() * 12, // Random size
            blur: Math.random() > 0.7 ? '2px' : '0px' // Some petals out of focus
        }));
        setPetals(newPetals);
    }, []);

    return (
        <section className={styles.hero}>
            {/* 1. Parallax Background Layer */}
            <div
                className={styles.backgroundLayer}
                style={{ transform: `translateY(${offsetY * 0.4}px)` }}
            />

            {/* 2. Paper Texture Overlay */}
            <div className={styles.noiseTexture}></div>

            {/* 3. Radial Glow (Behind Text) */}
            <div className={styles.radialGlow}></div>

            {/* 4. Floating Petals */}
            <div className={styles.petalsContainer}>
                {petals.map((petal) => (
                    <div
                        key={petal.id}
                        className={styles.petal}
                        style={{
                            left: `${petal.left}%`,
                            animationDelay: `${petal.delay}s`,
                            animationDuration: `${petal.duration}s`,
                            width: `${petal.size}px`,
                            height: `${petal.size}px`,
                            filter: `blur(${petal.blur})`
                        }}
                    />
                ))}
            </div>

            {/* 5. Content */}
            <div className={styles.content}>
                <p className={styles.subtitleSmall}>하루 한 글자</p>
                <h1 className={styles.titleKorean}>하나하루</h1>
                <h2 className={styles.titleEnglish}>Hanaharu</h2>

                <p className={styles.description}>
                    Learn Hangul at your own pace. Calm mastery, not rushed completion.
                </p>

                <div className={styles.actions}>
                    <button className={styles.btnPrimary}>Start Learning</button>
                    <button className={styles.btnSecondary}>View Garden</button>
                </div>
            </div>

            {/* 6. Seamless Bottom Transition */}
            <div className={styles.bottomFade}></div>
        </section>
    );
};

export default Hero;
