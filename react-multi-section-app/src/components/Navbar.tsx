import React from 'react';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="home" smooth={true} duration={500}>Home</Link>
                </li>
                <li>
                    <Link to="about" smooth={true} duration={500}>About</Link>
                </li>
                <li>
                    <Link to="services" smooth={true} duration={500}>Services</Link>
                </li>
                <li>
                    <Link to="portfolio" smooth={true} duration={500}>Portfolio</Link>
                </li>
                <li>
                    <Link to="blog" smooth={true} duration={500}>Blog</Link>
                </li>
                <li>
                    <Link to="contact" smooth={true} duration={500}>Contact</Link>
                </li>
                <li>
                    <Link to="faq" smooth={true} duration={500}>FAQ</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;