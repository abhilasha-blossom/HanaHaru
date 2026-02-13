import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const location = useLocation();
    const navItems = ['Home', 'Characters', 'Practice', 'Games', 'Garden'];

    return (
        <nav className={styles.navbar}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className={styles.logo}>하나하루</div>
            </Link>
            <div className={styles.links}>
                {navItems.map((item) => {
                    // Determine path: Home -> /, others -> /lowercase
                    const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                    const isActive = location.pathname === path;

                    return (
                        <Link
                            key={item}
                            to={path}
                            className={`${styles.link} ${isActive ? styles.active : ''}`}
                        >
                            {item}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
