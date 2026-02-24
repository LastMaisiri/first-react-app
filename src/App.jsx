import { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.jpg';
import last from './assets/last.jpg'

function App() {
  const currentYear = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could integrate with a backend like EmailJS or Formspree
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <header>
        <div className="nav-container">
          <div className="logo">
            <img
              src={logo}
              alt="Last Maisiri Logo"
              width={48}
              height={48}
            />
          </div>

          <nav className="nav-links">
            {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={activeSection === section ? 'active' : ''}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-content">
            <h1>
              Hi, I'm <span className="highlight">Last Maisiri</span>
            </h1>
            <h2>React Developer & Frontend Enthusiast</h2>
            <p className="tagline">
              Building modern, responsive, and performant web experiences with React, Vite, and clean code — from Bindura, Zimbabwe.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn primary">
                View My Projects
              </a>
              <a href="#contact" className="btn secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-container">
            <div className="about-photo">
              <img
                src={last}
                alt="Last Maisiri - React Developer from Bindura, Zimbabwe"
                className="profile-img"
              />
            </div>

            <div className="about-text">
              <h1>About Me</h1>
              <p className="intro">
                Hi! I'm Last Maisiri (@MaisiriLas22156), a passionate frontend developer based in Bindura, Zimbabwe.
              </p>
              <p>
                I specialize in React and the modern JavaScript ecosystem, building clean, responsive, and high-performance web applications.
                My focus is on creating user-friendly interfaces that work beautifully on any device — from mobile to desktop.
              </p>
              <p>
                Living in Bindura gives me a unique perspective — I love combining local energy with global tech trends.
                I'm always learning: currently diving deeper into TypeScript, Tailwind CSS, Vite, and component libraries.
              </p>
              <p className="closing">
                Open to collaborations, freelance work, or just chatting about web development — let's connect!
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <h2>Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <img
                src="https://s3.amazonaws.com/creativetim_bucket/products/581/original/vision-ui-dashboard-free-react.png?1641889248"
                alt="Project Alpha screenshot"
                className="project-image"
              />
              <h3>Project Alpha</h3>
              <p className="description">A cool React App</p>
              <div className="tags">
                <span>React</span>
                <span>Vite</span>
                <span>Tailwind</span>
              </div>
            </div>

            <div className="project-card">
              <img
                src="https://i.ytimg.com/vi/wYpCWwD1oz0/maxresdefault.jpg"
                alt="Project Beta screenshot"
                className="project-image"
              />
              <h3>Project Beta</h3>
              <p className="description">An interactive Dashboard</p>
              <div className="tags">
                <span>React</span>
                <span>Chart.js</span>
                <span>Redux</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section">
          <h2>Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-pill">React</div>
            <div className="skill-pill">JavaScript (ES6+)</div>
            <div className="skill-pill">TypeScript</div>
            <div className="skill-pill">CSS / SCSS</div>
            <div className="skill-pill">Tailwind CSS</div>
            <div className="skill-pill">Vite</div>
            <div className="skill-pill">Git & GitHub</div>
            <div className="skill-pill">REST / GraphQL</div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Me</h2>
          <p className="email-line">
            Email:{' '}
            <a href="mailto:lastmaisiri0@gmail.com" className="email-link">
              lastmaisiri0@gmail.com
            </a>
          </p>
          <p className="social-hint">
            X: <a href="https://x.com/MaisiriLas22156" target="_blank" rel="noopener noreferrer">@MaisiriLas22156</a>
          </p>
          <form onSubmit={handleSubmit} className="contact-form max-w-md mx-auto flex flex-col gap-4">
            <div className="form-group flex flex-col">
              <label htmlFor="name" className="mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="email" className="mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="message" className="mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded h-32"
              ></textarea>
            </div>
            <button type="submit" className="btn primary w-full md:w-auto">
              Send Message
            </button>
            {formSubmitted && <p className="success-message text-center">Message sent successfully!</p>}
          </form>
        </section>
      </main>

      <footer>
        <p>© {currentYear} Last Maisiri • Bindura, Zimbabwe • Built with coffee and code</p>
      </footer>
    </>
  );
}

export default App;