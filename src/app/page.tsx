'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showMenu, setShowMenu] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    setMounted(true)
    emailjs.init('msBwFZssq8MrNjXhP')
  }, [])

  if (!mounted) {
    return null
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setShowMenu(false)
    }
  }

  return (
    <div className="font-poppins text-second-color">
      {/* Header */}
      <header className="l-header">
        <nav className="nav bd-grid">
          <div>
            <a href="#" className="nav__logo">Md Afjal Khan</a>
          </div>

          <div className={`nav__menu ${showMenu ? 'show' : ''}`} id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a 
                  href="#home" 
                  className={`nav__link ${activeSection === 'home' ? 'active-link' : ''}`}
                  onClick={() => scrollToSection('home')}
                >
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a 
                  href="#about" 
                  className={`nav__link ${activeSection === 'about' ? 'active-link' : ''}`}
                  onClick={() => scrollToSection('about')}
                >
                  About
                </a>
              </li>
              <li className="nav__item">
                <a 
                  href="#skills" 
                  className={`nav__link ${activeSection === 'skills' ? 'active-link' : ''}`}
                  onClick={() => scrollToSection('skills')}
                >
                  Skills
                </a>
              </li>
              <li className="nav__item">
                <a 
                  href="#work" 
                  className={`nav__link ${activeSection === 'work' ? 'active-link' : ''}`}
                  onClick={() => scrollToSection('work')}
                >
                  Work
                </a>
              </li>
              <li className="nav__item">
                <a 
                  href="#resume" 
                  className={`nav__link ${activeSection === 'resume' ? 'active-link' : ''}`}
                  onClick={() => scrollToSection('resume')}
                >
                  Resume
                </a>
              </li>
              <li className="nav__item">
                <a 
                  href="#contact" 
                  className={`nav__link ${activeSection === 'contact' ? 'active-link' : ''}`}
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="nav__toggle" onClick={() => setShowMenu(!showMenu)}>
            <i className='bx bx-menu'></i>
          </div>
        </nav>
      </header>

      <main className="l-main">
        {/* Home Section */}
        <section className="home bd-grid" id="home">
          <div className="home__data">
            <h1 className="home__title">
              <span className="home__title-color">Senior Product Designer</span><br />AI-SaaS Architect
            </h1>
            <p className="home__subtitle">Architecting high-performance digital ecosystems for enterprise scale and AI-driven startups.</p>
            <a href="#contact" className="button" onClick={() => scrollToSection('contact')}>Consult for your Project</a>
          </div>

          <div className="home__social">
            <a href="https://www.linkedin.com/in/mdafjalkhan29/" className="home__social-icon">
              <i className='bx bxl-linkedin'></i>
            </a>
            <a href="https://github.com/wildzee" className="home__social-icon">
              <i className='bx bxl-github'></i>
            </a>
            <a href="https://x.com/wild__zee" className="home__social-icon">
              <i className='bx bxl-twitter'></i>
            </a>
          </div>

          <div className="home__img">
            <svg className="home__blob" viewBox="0 0 479 467" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <mask id="mask0">
                <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" fill="white"/>
              </mask>
              <g mask="url(#mask0)">
                <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
                <image className="home__blob-img" x="50" y="40" xlinkHref="/images/perfil.png"/>
              </g>
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section className="about section" id="about">
          <h2 className="section-title">About</h2>
          <div className="about__container bd-grid">
            <div className="about__img">
              <Image src="/images/about.jpg" alt="About" width={200} height={200} priority />
            </div>
            <div>
              <h2 className="about__subtitle">I&apos;am Md Afjal Khan</h2>
              <p className="about__text">
                I am a Product Architect focused on bridging the gap between complex business logic and high-conversion user experiences. Currently, I am leading the digital transformation of enterprise ecosystems at Danway EME, migrating legacy industrial workflows into automated, high-performance dashboards.
              </p>
              <p className="about__text">
                As the Founder of Rasoi Pay, I&apos;ve pioneered the integration of Agentic AI in the B2B SaaS space, optimizing user retention and order-flow efficiency. I don&apos;t just design interfaces; I build ROI-driven products that scale. I&apos;m currently based in Dubai, helping companies solve high-stakes design challenges with data and engineering-led UX.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills section" id="skills">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills__container bd-grid">
            <div>
              <h3 className="skills__category">Product Strategy</h3>
              <p className="skills__list">
                Service Design, Design Systems Governance, Conversion Rate Optimization (CRO), Heuristic Evaluation, Stakeholder Management
              </p>
              
              <h3 className="skills__category">Design & UX</h3>
              <p className="skills__list">
                Atomic Design Systems, Advanced Prototyping, User Journey Mapping, Accessibility (WCAG 2.2), Interaction Design
              </p>
              
              <h3 className="skills__category">Technical Stack</h3>
              <p className="skills__list">
                Next.js, Firebase, Agentic AI Integration, AI/ML Logic Implementation, Cursor AI, Front-end Architecture
              </p>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section className="work section" id="work">
          <h2 className="section-title">Work</h2>
          <div className="work__container bd-grid">
            <div className="work__project">
              <div className="work__img">
                <Image src="/Rasoi_Pay/rasoipay_mochup.jpg" alt="Rasoi Pay Platform" width={400} height={250} style={{objectFit: 'cover', width: '100%', height: '100%', display: 'block'}} />
              </div>
              <div className="work__content">
                <h3 className="work__title">Rasoi Pay — Founder & Product Lead</h3>
                <p className="work__description">An AI-powered B2B SaaS platform for restaurant management. Built from concept to production, integrating Agentic AI for menu optimization and real-time payment architectures.</p>
                <Link href="/case-studies/rasoipay" className="work__button button">View Case Study</Link>
              </div>
            </div>
            
            <div className="work__project">
              <div className="work__img">
                <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: '100%', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold'}}>
                  Confidential Project
                </div>
              </div>
              <div className="work__content">
                <h3 className="work__title">Danway EME — Lead Product Designer</h3>
                <p className="work__description">Designing a proprietary enterprise resource dashboard for a multi-million dollar engineering firm. Automating workforce tracking and labor-cost analytics for 5,000+ employees.</p>
                <Link href="/case-studies/danway" className="work__button button">View Case Study</Link>
              </div>
            </div>

            <div className="work__project">
              <div className="work__img">
                <Image src="/Iqra/Iqra_mockup.png" alt="Iqra App" width={400} height={250} style={{objectFit: 'cover', width: '100%', height: '100%', display: 'block'}} />
              </div>
              <div className="work__content">
                <h3 className="work__title">Iqra App — UX Lead & Co-Designer</h3>
                <p className="work__description">Scaling a live mobile product to 50,000+ users. Focused on high-accessibility design and Roman-Hindi localized user flows.</p>
                <Link href="/case-studies/iqra" className="work__button button">View Case Study</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section className="resume section" id="resume">
          <h2 className="section-title">Resume</h2>
          <div className="resume__container bd-grid">
            <div className="resume__content">
              <p className="resume__text">
                Download my Technical Resume for Senior Product & Strategy roles.
              </p>
              <div className="resume__buttons">
                <a 
                  href="/resume/MdAfjalKhan_Resume_2026.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button resume__button"
                >
                  <i className='bx bx-download'></i>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact section" id="contact">
          <h2 className="section-title">Partnership & Consultations</h2>
          <div className="contact__container bd-grid">
            <form className="contact__form" onSubmit={async (e) => {
              e.preventDefault()
              try {
                await emailjs.send(
                  'service_g9tmvkw',
                  'template_npjrat5',
                  {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                  }
                )
                alert('Thank you for your message! I will get back to you soon.')
                setFormData({ name: '', email: '', message: '' })
              } catch (error) {
                console.error('Failed to send email:', error)
                alert('Failed to send message. Please try again.')
              }
            }}>
              <input 
                type="text" 
                placeholder="Name" 
                className="contact__input" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="Business Email" 
                className="contact__input" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
              <textarea 
                cols={0} 
                rows={10} 
                placeholder="Tell me about your project/product challenges"
                className="contact__input"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
              <button type="submit" className="contact__button button">Send</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer__title">MD Afjal Khan</p>
        <div className="footer__social">
          <a href="https://www.linkedin.com/in/mdafjalkhan29/" className="footer__icon">
            <i className='bx bxl-linkedin'></i>
          </a>
          <a href="https://github.com/wildzee" className="footer__icon">
            <i className='bx bxl-github'></i>
          </a>
          <a href="https://x.com/wild__zee" className="footer__icon">
            <i className='bx bxl-twitter'></i>
          </a>
        </div>
        <p className="footer__copy">© 2025 MD Afjal Khan. All rights reserved</p>
      </footer>
    </div>
  )
}