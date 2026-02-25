import { useState, useEffect } from 'react';
import { FiHome, FiUser, FiGrid, FiZap, FiMail, FiPhone, FiFileText } from 'react-icons/fi';
// jsPDF will be dynamically imported inside downloadResume to avoid bundling it
import { FaGithub, FaWhatsapp } from 'react-icons/fa';
import './App.css';
import logo from './assets/logo.jpg';
import last from './assets/last.jpg'

function App() {
  const currentYear = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      
      const cursor = document.querySelector('.cursor-glow');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
      
      
      if (Math.random() > 0.8) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 600);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const validateForm = (data) => {
    const errors = {};
    if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your name (2+ characters).';
    if (!data.email) errors.email = 'Please enter your email.';
    else {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(data.email)) errors.email = 'Please enter a valid email address.';
    }
    if (!data.message || data.message.trim().length < 5) errors.message = 'Please enter a message (5+ characters).';
    if (data.phone) {
    const phoneRe = /^\+?\d{7,15}$/;
      if (!phoneRe.test(data.phone.replace(/\s|-/g, ''))) errors.phone = 'Please enter a valid phone number (digits only, 7-15 chars).';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '', phone: '' });
    setFormErrors({});
  };

  const downloadResume = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const loadImageAsDataURL = async (url) => {
        const res = await fetch(url);
        const blob = await res.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      };

      const doc = new jsPDF();
      
      try {
        const imgData = await loadImageAsDataURL(last);
        doc.addImage(imgData, 'JPEG', 15, 15, 30, 30);
      } catch (e) {
      }

      doc.setFontSize(16);
      doc.text('Last Maisiri', 55, 25);
      doc.setFontSize(11);
      doc.text('React Developer • Frontend Enthusiast', 55, 33);
      doc.setFontSize(10);

      const bodyLines = [
        'Bindura, Zimbabwe',
        'Email: lastmaisiri0@gmail.com',
        'Phone: +263713508064',
        'X: @MaisiriLas22156',
        '',
        'Summary:',
        'Passionate frontend developer specializing in React, Vite, Tailwind, and modern JavaScript. Builds responsive, accessible, and high-performance web experiences.',
        '',
        'Skills: React, Vite, JavaScript (ES6+), TypeScript, Tailwind CSS, SASS, Git',
        '',
        'Selected Projects: Last-Maisiri, my-bio, ludo-game / react-ludo-game, Git-Hub Finder'
      ];

      let y = 55;
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      for (const line of bodyLines) {
        const split = doc.splitTextToSize(line, pageWidth - margin * 2);
        doc.text(split, margin, y);
        y += split.length * 7 + 2;
        if (y > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          y = 20;
        }
      }

      doc.save('Last-Maisiri-Resume.pdf');
    } catch (err) {
      
      const w = window.open('', '_blank');
      if (w) {
        w.document.write('<html><head><title>Resume</title></head><body>');
        w.document.write(document.querySelector('#resume')?.innerHTML || 'Resume');
        w.document.write('</body></html>');
        w.document.close();
        w.print();
      }
    }
  };

  return (
    <>
      <div className="cursor-glow"></div>
      
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
            {['home', 'about', 'projects', 'resume', 'skills', 'contact'].map((section) => {
              const label = section.charAt(0).toUpperCase() + section.slice(1);
              let Icon = FiZap;
              if (section === 'home') Icon = FiHome;
              if (section === 'about') Icon = FiUser;
              if (section === 'resume') Icon = FiFileText;
              if (section === 'projects') Icon = FiGrid;
              if (section === 'skills') Icon = FiZap;
              if (section === 'contact') Icon = FiMail;
              return (
                <a
                  key={section}
                  href={`#${section}`}
                  className={activeSection === section ? 'active' : ''}
                >
                  <Icon className="icon-inline" />{label}
                </a>
              );
            })}
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

        
        <section id="projects" className="py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title text-5xl font-bold mb-12">My Projects</h2>
            <div className="overflow-x-auto rounded-3xl border border-cyan-400/20">
              <table className="fancy-table w-full">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th className="text-center">View Code</th>
                    <th className="text-center">Live Demo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Last-Maisiri</td>
                    <td>this is my project</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/second-bio" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/responsive-website/" target="_blank" rel="noopener noreferrer" className="repo-link">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>my mentor</td>
                    <td>mentor project</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/Last-Maisiri" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/mentor/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>my-bio</td>
                    <td>my bio</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/my-bio" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/my-bio/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>box</td>
                    <td>box</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/box" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/box/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>mixins</td>
                    <td>my mixins</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/mixins" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/mixins-practice/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>bootstrap-and-sass</td>
                    <td>SASS + Bootstrap site</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/bootstrap-and-sass" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/sass-bootstrap/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>age-check</td>
                    <td>my age check</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/age-check" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/age-checker/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>tip-calculator</td>
                    <td>tip calculator</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/tip-calculator" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/tip-calculator/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>loops</td>
                    <td>loops</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/loops" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/array/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>ludo-game</td>
                    <td>my ludo game</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/ludo-game" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="http://lastmaisiri.sigmasystems.co.zw/projects/ludo-game/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Mark-Down Studio</td>
                    <td>Markdown editor app</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/mark-down" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="https://meek-malabi-2b1f6e.netlify.app/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>react-ludo-game</td>
                    <td>my react-ludo-game</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/ludo-react" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="https://velvety-gelato-43cfd4.netlify.app/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  
                  <tr>
                    <td>Git-Hub Finder</td>
                    <td>GitHub profile finder app</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/github-search" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="https://musical-frangollo-379e2b.netlify.app/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Ludo-game</td>
                    <td>Online Ludo game</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/ludo-game" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="https://velvety-gelato-43cfd4.netlify.app/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                  <tr>
                    <td>E-Commerce Project</td>
                    <td>Modern e-commerce web app</td>
                    <td className="text-center">
                      <a href="https://github.com/LastMaisiri/e-commerce" target="_blank" rel="noopener noreferrer" className="repo-link"><FaGithub className="icon-inline" />View Code</a>
                    </td>
                    <td className="text-center">
                      <a href="https://voluble-mermaid-b44a34.netlify.app/" target="_blank" rel="noopener noreferrer" className="repo-link live-demo">Live Demo</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="resume" className="resume-section">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title text-4xl font-bold mb-6">Resume</h2>
            <div className="resume-grid">
              <div className="resume-photo">
                <img src={last} alt="Last Maisiri" />
              </div>
              <div className="resume-body">
                <h3>Last Maisiri</h3>
                <p className="muted">React Developer • Frontend Enthusiast • Bindura, Zimbabwe</p>
                <div className="resume-contact">
                  <a href="mailto:lastmaisiri0@gmail.com">lastmaisiri0@gmail.com</a>
                  <a href="tel:+263713508064">+263 71 350 8064</a>
                  <a href="https://x.com/MaisiriLas22156" target="_blank" rel="noopener noreferrer">@MaisiriLas22156</a>
                </div>

                <h4>Summary</h4>
                <p>Passionate frontend developer focused on building responsive, accessible, and high-performance web applications using React, Vite, and modern tooling. Experienced with component-driven design, CSS systems and integrating third-party APIs.</p>

                <h4>Skills</h4>
                <div className="skills-list">
                  <span className="skill-pill">React</span>
                  <span className="skill-pill">Vite</span>
                  <span className="skill-pill">JavaScript</span>
                  <span className="skill-pill">TypeScript</span>
                  <span className="skill-pill">Tailwind CSS</span>
                  <span className="skill-pill">SASS</span>
                  <span className="skill-pill">Git</span>
                </div>

                <h4>Selected Projects</h4>
                <ul className="resume-projects">
                  <li>Last-Maisiri — personal portfolio</li>
                  <li>my-bio — bio website</li>
                  <li>ludo-game / react-ludo-game — online game projects</li>
                  <li>Git-Hub Finder — GitHub profile search app</li>
                </ul>

                <div className="resume-actions">
                  <button onClick={downloadResume} className="btn primary">Download Resume</button>
                  <a href="https://github.com/LastMaisiri" target="_blank" rel="noopener noreferrer" className="btn secondary"><FaGithub className="icon-inline" />View GitHub</a>
                </div>
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
          <div className="contact-details">
            <p>Phone: <a href="tel:+263713508064">+263 71 350 8064</a></p>
            <p>WhatsApp: <a href="https://wa.me/263713508064" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a></p>
            <p>cPanel: <a href="http://lastmaisiri.sigmasystems.co.zw/" target="_blank" rel="noopener noreferrer">lastmaisiri.sigmasystems.co.zw</a></p>
          </div>
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
              {formErrors.name && <p className="error-message">{formErrors.name}</p>}
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
              {formErrors.email && <p className="error-message">{formErrors.email}</p>}
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="phone" className="mb-1">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +263713508064"
                className="w-full p-2 border rounded"
              />
              {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
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
              {formErrors.message && <p className="error-message">{formErrors.message}</p>}
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