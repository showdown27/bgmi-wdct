import { useState } from 'react';
import React from 'react';
import arhn from '../../assets/imgs/arhn-logo-2026.jpeg';
import navcss from './Navbar.module.css';

export const Navbar = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);

    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    };

    return (
        <nav className={navcss.nav}>
            <div className={navcss.container}>
                <div className={navcss.logo}>
                    <a href="https://arhn.co.in/" target='_blank' rel="noreferrer"><img src={arhn} alt="Aarohan 2026 Logo" /></a>
                   
                </div>
                <div className={`${navcss.hamburger} ${showNavLinks ? navcss.active : ''}`} onClick={toggleNavLinks}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`${navcss.main_list} ${showNavLinks ? navcss.active : ''}`}>
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="Prizes">PRIZES</a></li>
                        <li><a href="FAQ">FAQS</a></li>
                        <li><a href="Contact">CONTACT US</a></li>
                    </ul>

                </div>
            </div>

        </nav>
    )
}
