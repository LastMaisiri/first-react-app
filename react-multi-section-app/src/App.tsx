import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './sections/Home';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import FAQ from './sections/FAQ';
import Projects from './sections/Projects';

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <main>
                <Home />
                <About />
                <Services />
                <Portfolio />
                <Projects />
                <Blog />
                <Contact />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
};

export default App;