'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showMenu, setShowMenu] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const { scrollY } = useScroll();
  const titleWeight = useTransform(scrollY, [0, 300], [800, 300]);
  const subtitleWeight = useTransform(scrollY, [0, 300], [300, 600]);

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

  const navItems = ['home', 'about', 'skills', 'work', 'resume', 'contact'];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-white pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)]">
        <nav className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div>
            <a href="#" className="text-xl font-display font-bold tracking-wider text-foreground hover:text-primary transition-colors">MD AFJAL KHAN</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`text-sm uppercase tracking-widest font-medium transition-all hover:text-primary ${activeSection === item ? 'text-primary' : 'text-gray-400'}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden cursor-pointer text-2xl text-foreground" onClick={() => setShowMenu(!showMenu)}>
            <i className={showMenu ? 'bx bx-x' : 'bx bx-menu'}></i>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-[rgba(255,255,255,0.05)] p-6 z-40"
          >
            <ul className="flex flex-col space-y-6 text-center">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`text-lg uppercase tracking-widest font-medium ${activeSection === item ? 'text-primary' : 'text-gray-400'}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </header>

      <main className="pt-32 max-w-6xl mx-auto px-6 space-y-40">

        {/* Home Section */}
        <motion.section
          id="home"
          className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="flex-1 space-y-8 z-10" variants={fadeInUp}>
            <motion.div style={{ fontWeight: subtitleWeight }} className="text-primary font-display text-xl tracking-widest uppercase">
              Product Designer &middot; AI-SaaS Architect
            </motion.div>

            {/* Variable Font Animation based on scroll */}
            <motion.h1
              style={{ fontWeight: titleWeight }}
              className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] text-foreground"
            >
              Architecting<br />
              <span className="text-gradient">Digital</span><br />
              Ecosystems.
            </motion.h1>

            <p className="text-lg text-gray-400 max-w-xl font-sans leading-relaxed">
              Leading the digital transformation of enterprise ecosystems and pioneering Agentic AI integrations for high-performance scale.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                Consult for your Project
              </a>
              <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }} className="px-8 py-4 bg-surface backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-white font-medium rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-all">
                View Work
              </a>
            </div>

            <div className="flex gap-6 pt-8">
              <a href="https://www.linkedin.com/in/mdafjalkhan29/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl"><i className='bx bxl-linkedin'></i></a>
              <a href="https://github.com/wildzee" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl"><i className='bx bxl-github'></i></a>
              <a href="https://x.com/wild__zee" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl"><i className='bx bxl-twitter'></i></a>
            </div>
          </motion.div>

          <motion.div className="flex-1 relative w-full max-w-md mx-auto aspect-square" variants={fadeInUp}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl mix-blend-screen -z-10"></div>
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-[rgba(255,255,255,0.1)] glass-card">
              <Image src="/images/perfil.png" alt="Profile" fill className="object-cover opacity-90 saturate-50 hover:saturate-100 transition-all duration-700" priority />
            </div>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="scroll-mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-sm font-bold tracking-widest text-primary uppercase mb-12">01. About Strategy</motion.h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeInUp} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card group">
              <Image src="/images/about.jpg" alt="About" fill className="object-cover saturate-0 group-hover:saturate-100 transition-all duration-500" />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8">
              <h3 className="text-3xl md:text-5xl font-display font-medium leading-tight">Bridging complex logic with high-conversion experiences.</h3>

              <div className="space-y-6 text-gray-400 text-lg leading-relaxed mix-blend-lighten">
                <p>
                  I am a Product Architect currently leading the digital transformation of enterprise ecosystems at a prestigious engineering firm, migrating legacy industrial workflows into automated, high-performance dashboards.
                </p>
                <p>
                  As the Founder of Rasoi Pay, I&apos;ve pioneered the integration of Agentic AI in the B2B SaaS space, optimizing user retention and order-flow efficiency. I don&apos;t just design interfaces; I build ROI-driven products that scale.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="scroll-mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-sm font-bold tracking-widest text-primary uppercase mb-12">02. Core Expertise</motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Product Strategy", items: "Service Design, Design Systems Governance, CRO, Heuristic Evaluation, Stakeholder Management", icon: "bx-bulb" },
              { title: "Design & UX", items: "Atomic Design Systems, Advanced Prototyping, Journey Mapping, Accessibility (WCAG 2.2), Interaction", icon: "bx-layout" },
              { title: "Technical Stack", items: "Next.js, Firebase, Agentic AI Integration, Framer Motion, Tailwind CSS, Front-end Architecture", icon: "bx-code-alt" }
            ].map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-card p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300"
              >
                <i className={`bx ${skill.icon} text-4xl text-primary mb-6 block`}></i>
                <h3 className="text-2xl font-display font-medium mb-4">{skill.title}</h3>
                <p className="text-gray-400 leading-relaxed">{skill.items}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Work Section */}
        <motion.section
          id="work"
          className="scroll-mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-sm font-bold tracking-widest text-primary uppercase mb-12">03. Selected Works</motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="glass-card rounded-[2rem] overflow-hidden group flex flex-col cursor-pointer">
              <div className="relative h-64 md:h-80 overflow-hidden bg-gray-900 border-b border-[rgba(255,255,255,0.05)]">
                <Image src="/Rasoi_Pay/rasoipay_mochup.jpg" alt="Rasoi Pay" fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-display font-medium mb-3 group-hover:text-primary transition-colors">Rasoi Pay</h3>
                <h4 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Founder & Product Lead</h4>
                <p className="text-gray-400 mb-8 leading-relaxed">An AI-powered B2B SaaS platform for restaurants, integrating Agentic AI for menu optimization.</p>
                <Link href="/case-studies/rasoipay" className="mt-auto inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  View Case Study <i className='bx bx-right-arrow-alt text-xl ml-1'></i>
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-card rounded-[2rem] overflow-hidden group flex flex-col cursor-pointer">
              <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-[#1a1c29] to-[#0f111a] border-b border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                <div className="text-gray-500 font-display tracking-widest font-bold text-xl uppercase z-10">Restricted</div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-display font-medium mb-3">Danway EME</h3>
                <h4 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Lead Product Designer</h4>
                <p className="text-gray-400 mb-8 leading-relaxed">Proprietary workforce tracking and labor-cost analytics dashboard for 5,000+ employees.</p>
                <span className="mt-auto inline-flex items-center text-gray-500 font-medium">
                  Confidential Project <i className='bx bx-lock-alt text-xl ml-1'></i>
                </span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact form and Resume */}
        <motion.section
          id="contact"
          className="scroll-mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="glass-card rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>

            {/* Interaction Variable Font simulation class */}
            <div className="overflow-hidden py-4">
              <h2 className="text-5xl md:text-8xl font-display mb-6 tracking-tight hover-variable-font variable-font-light cursor-default text-foreground inline-block">
                let&apos;s talk
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Ready to architect your next high-performance digital product? Download my resume or drop a message below.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 mb-16" id="resume">
              <a href="/resume/MdAfjalKhan_Resume_2026.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 bg-surface backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-white font-medium rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-all flex items-center justify-center gap-2 group-hover:border-[rgba(255,255,255,0.2)]">
                <i className='bx bx-download text-xl'></i> Download Resume
              </a>
            </div>

            <form className="max-w-xl mx-auto space-y-6 text-left" onSubmit={async (e) => {
              e.preventDefault()
              try {
                await emailjs.send('service_g9tmvkw', 'template_npjrat5', formData)
                alert('Thank you for your message! I will get back to you soon.')
                setFormData({ name: '', email: '', message: '' })
              } catch (error) {
                console.error('Failed to send email:', error)
                alert('Failed to send message. Please try again.')
              }
            }}>
              <input type="text" placeholder="Name" required
                className="w-full bg-black/50 border border-[rgba(255,255,255,0.1)] rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors font-sans"
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input type="email" placeholder="Business Email" required
                className="w-full bg-black/50 border border-[rgba(255,255,255,0.1)] rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors font-sans"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea placeholder="Tell me about your project/challenges" required rows={5}
                className="w-full bg-black/50 border border-[rgba(255,255,255,0.1)] rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none font-sans"
                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
              <button type="submit" className="w-full px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] font-sans">
                Send Message
              </button>
            </form>

          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-[rgba(255,255,255,0.05)] pt-12 text-center text-gray-500 text-sm pb-8 font-sans">
        <p className="font-display tracking-widest uppercase mb-4 text-gray-400">Md Afjal Khan</p>
        <p>© {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  )
}