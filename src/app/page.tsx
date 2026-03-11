'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useScroll, useTransform, useInView, useSpring, Variants, AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Magnetic from './components/Magnetic'
import KineticText from './components/KineticText'
import ParallaxImage from './components/ParallaxImage'
import ScrollHighlightText from './components/ScrollHighlightText'
import TextReveal from './components/TextReveal'

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration * 60)
    const timer = () => {
      start += increment
      if (start >= target) {
        setCount(target)
        return
      }
      setCount(Math.floor(start))
      requestAnimationFrame(timer)
    }
    requestAnimationFrame(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

// ─── Preloader Component ───────────────────────────────────────────────────────
function Preloader({ onComplete, isDark }: { onComplete: () => void; isDark: boolean }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  const bg = isDark ? '#050505' : '#fafafa'
  const textColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
  const trackColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const logoSrc = isDark ? '/images/logos/logo-green.svg' : '/images/logos/logo-black.svg'

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: bg }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.85, 0, 0.15, 1] } }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <img src={logoSrc} alt="Md Afjal Khan" className="w-14 h-14" />
      </motion.div>

      {/* Name */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="text-[10px] tracking-[0.4em] uppercase mb-10 font-sans"
        style={{ color: textColor }}
      >
        Md Afjal Khan
      </motion.p>

      {/* Thin progress line */}
      <div className="w-32 h-[1px] relative overflow-hidden rounded-full" style={{ background: trackColor }}>
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: '#3CDA64' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [showMenu, setShowMenu] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [isDark, setIsDark] = useState(true)
  const [expandedExp, setExpandedExp] = useState<number | null>(null)

  // Scroll + Parallax
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    // Read saved theme preference or default to dark
    const saved = localStorage.getItem('theme')
    const prefersDark = saved ? saved === 'dark' : true
    setIsDark(prefersDark)
    document.documentElement.classList.toggle('dark', prefersDark)
    setMounted(true)
    emailjs.init('msBwFZssq8MrNjXhP')
  }, [])

  // Sync dark class and persist on change
  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark, mounted])

  // Intersection Observer for auto-updating active nav
  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) return null

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setShowMenu(false)
  }

  const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]
  const easeBrutal: [number, number, number, number] = [0.85, 0, 0.15, 1]

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
  }
  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  // Word-by-word reveal for hero
  const wordContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
  }
  const wordReveal: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: easePremium } },
  }
  // Skill reveal stagger
  const skillStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
  }
  const skillReveal: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easePremium } },
  }

  const navItems = [
    { id: 'work', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const projects = [
    {
      status: 'SHIPPED',
      title: 'Rasoi Pay',
      role: 'Founder & Product Lead',
      description: 'B2B SaaS for restaurant management',
      href: '/case-studies/rasoipay',
      public: true,
    },
    {
      status: 'SHIPPED',
      title: 'Iqra App',
      role: 'UX Lead & Co-Designer',
      description: 'Mobile product, 50,000+ active users',
      href: '/case-studies/iqra',
      public: true,
    },
    {
      status: 'CONFIDENTIAL',
      title: 'Danway EME',
      role: 'Lead Product Designer',
      description: 'Enterprise workforce & labor-cost dashboard',
      href: null,
      public: false,
    },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
      <AnimatePresence>
        {showPreloader && <Preloader key="preloader" isDark={isDark} onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>

      <CustomCursor />

      {/* Grain Texture */}
      <div className="grain-overlay" />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[1.5px] bg-gradient-to-r from-primary to-[#6aeaa4] z-[60]"
        style={{ width: progressWidth }}
      />

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          <a
            href="#"
            data-cursor=""
            className="text-sm font-display font-medium tracking-widest uppercase hover:text-primary transition-colors"
            onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
          >
            Md Afjal Khan
          </a>

          <div className="flex items-center gap-4">
            <Magnetic>
              <a
                href="#contact"
                data-cursor=""
                onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 border rounded-md text-xs uppercase tracking-widest hover:border-foreground transition-colors"
                style={{ borderColor: 'var(--border)' }}
              >
                <i className="bx bx-phone" /> Book a call
              </a>
            </Magnetic>
            {/* Theme Toggle */}
            <Magnetic pullRadius={40}>
              <button
                data-cursor=""
                onClick={() => setIsDark(!isDark)}
                className="w-9 h-9 flex items-center justify-center rounded-full border text-lg hover:text-primary transition-all"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <i className="bx bx-sun" />
                ) : (
                  <i className="bx bx-moon" />
                )}
              </button>
            </Magnetic>
            <Magnetic pullRadius={40}>
              <button
                className="text-3xl hover:opacity-70 transition-opacity flex items-center justify-center p-2"
                data-cursor=""
                onClick={() => setShowMenu(true)}
              >
                <i className="bx bx-menu" />
              </button>
            </Magnetic>
          </div>
        </nav>
      </header>

      {/* ── FULL SCREEN MENU ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easePremium }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Menu Header */}
            <header className="w-full">
              <nav className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center text-foreground">
                <a
                  href="#"
                  data-cursor=""
                  className="text-sm font-display tracking-widest uppercase hover:opacity-70 transition-opacity"
                  onClick={(e) => { e.preventDefault(); setShowMenu(false); scrollToSection('home'); }}
                >
                  Md Afjal Khan
                </a>

                <div className="flex items-center gap-6">
                  <Magnetic>
                    <a
                      href="#contact"
                      data-cursor=""
                      onClick={(e) => { e.preventDefault(); setShowMenu(false); scrollToSection('contact') }}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/20 rounded-md text-xs uppercase tracking-widest hover:border-white transition-colors"
                    >
                      <i className="bx bx-phone" /> Book a call
                    </a>
                  </Magnetic>
                  <Magnetic pullRadius={40}>
                    <button
                      className="text-3xl hover:opacity-70 transition-opacity flex items-center justify-center p-2"
                      data-cursor=""
                      onClick={() => setShowMenu(false)}
                    >
                      <i className="bx bx-x" />
                    </button>
                  </Magnetic>
                </div>
              </nav>
            </header>

            {/* Menu Links */}
            <div className="flex-grow flex items-center justify-center md:justify-end max-w-7xl mx-auto w-full px-6 pb-20 md:pr-32">
              <ul className="flex flex-col gap-2 text-center md:text-left items-center md:items-start" style={{ width: 'fit-content' }}>
                {[{ id: 'home', label: 'Home' }, ...navItems].map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: easePremium }}
                    className="group relative"
                  >
                    {/* Hover dot indicator (Dousan style) */}
                    <span className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block" />

                    <a
                      href={`#${item.id}`}
                      data-cursor=""
                      className="text-5xl md:text-7xl leading-[1.1] font-display font-medium text-foreground hover:text-white transition-colors inline-block"
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.id) }}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Menu Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-7xl mx-auto w-full px-6 pb-10 flex justify-between items-end text-xs text-secondary/60"
            >
              <div>
                <p>Dubai,</p>
                <p>United Arab Emirates</p>
              </div>
              <a
                href="https://www.linkedin.com/in/mdafjalkhan29/"
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                LinkedIn <i className="bx bx-link-external" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <motion.section
          id="home"
          className="min-h-screen flex flex-col justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 relative"
          initial="hidden"
          animate={!showPreloader ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Floating orbs with breathing animation */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="orb-breathing absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[130px]" />
            <div className="orb-breathing-reverse absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-900/5 blur-[100px]" />
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative">
            {/* Background Logo Watermark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5, x: "-50%", y: "-50%" }}
              animate={{ opacity: 0.06, scale: 1, rotate: 0, x: "-50%", y: "-50%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="absolute left-1/2 top-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] -z-10 pointer-events-none"
            >
              <img
                src="/images/logo-outline.svg"
                alt=""
                className="w-full h-full object-contain dark:invert"
              />
            </motion.div>

            <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.3em] text-secondary mb-10">
              Based in Dubai, UAE
            </motion.p>

            {/* Word-by-word reveal heading */}
            <motion.h1
              variants={wordContainer}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-display font-bold leading-[1.05] tracking-tight mb-8 sm:mb-10 max-w-4xl"
            >
              {['I', 'design', 'products'].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                  <motion.span variants={wordReveal} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
              <br />
              {['built', 'for'].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                  <motion.span variants={wordReveal} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span variants={wordReveal} className="inline-block">
                  <span className="text-gradient">impact</span>,
                </motion.span>
              </span>
              <br />
              <span className="whitespace-nowrap inline-block">
                {['designed', 'to'].map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span variants={wordReveal} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                ))}
                <span className="inline-block overflow-hidden">
                  <motion.span variants={wordReveal} className="inline-block">
                    <span className="text-gradient">scale</span>.
                  </motion.span>
                </span>
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-sm uppercase tracking-[0.2em] text-secondary">
              Product Designer at{' '}
              <span className="text-foreground font-semibold">Danway EME</span>
              {' '}·{' '}
              UX/UI Engineer at{' '}
              <span className="text-foreground font-semibold">Rasoi Pay</span>
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-6 mt-12">
              <a href="https://www.linkedin.com/in/mdafjalkhan29/" target="_blank" rel="noreferrer" data-cursor="Open" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                LinkedIn <i className="bx bx-link-external text-base" />
              </a>
              <a href="#contact" data-cursor="" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                Let&apos;s talk <i className="bx bx-right-arrow-alt text-base" />
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ── WORKS ──────────────────────────────────────────────────────────── */}
        <motion.section
          id="work"
          className="pt-16 sm:pt-20 pb-24 sm:pb-32 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.3em] text-secondary mb-2">
            Selected Works
          </motion.p>
          <motion.p variants={fadeInUp} className="text-xs text-secondary/50 mb-16">
            {`'21 — '25`}
          </motion.p>

          <div>
            {projects.map((project, i) => (
              <motion.div key={i} variants={fadeInUp}>
                {project.public ? (
                  <Link
                    href={project.href!}
                    data-cursor="View"
                    className="work-row group"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${project.status === 'SHIPPED' ? 'text-emerald-400' : 'text-secondary'}`}>
                        {project.status === 'SHIPPED' ? (
                          <><span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 align-middle" />SHIPPED</>
                        ) : (
                          <><i className="bx bx-lock-alt mr-1" />NDA</>
                        )}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-medium text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    </div>
                    <div className="work-meta">
                      <p className="text-sm text-secondary">{project.role}</p>
                      <p className="text-xs text-secondary/50 mt-0.5">{project.description}</p>
                    </div>
                    <div className="work-arrow">
                      <i className="bx bx-right-arrow-alt" />
                    </div>
                  </Link>
                ) : (
                  <div className="work-row group opacity-60">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                        <i className="bx bx-lock-alt mr-1" />NDA
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-medium text-foreground">{project.title}</h3>
                    </div>
                    <div className="work-meta">
                      <p className="text-sm text-secondary">{project.role}</p>
                      <p className="text-xs text-secondary/50 mt-0.5">{project.description}</p>
                    </div>
                    <div className="text-secondary/30 text-sm">—</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
        <motion.section
          id="about"
          className="pt-20 sm:pt-32 pb-32 sm:pb-40 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <div className="grid md:grid-cols-[minmax(200px,_1fr)_minmax(300px,_1.4fr)] gap-8 md:gap-24 items-start">
            {/* LEFT — Sticky heading */}
            <motion.div variants={fadeInUp} className="md:sticky md:top-32 self-start">
              <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                <h2 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9rem] font-display font-medium leading-[0.9] tracking-tight">
                  About
                </h2>
              </div>
            </motion.div>

            {/* RIGHT — Content */}
            <motion.div variants={fadeInUp} className="space-y-16 sm:space-y-24">
              {/* Bio */}
              <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl md:text-2xl leading-[1.65] text-secondary">
                <TextReveal delay={0}>
                  I&apos;m Afjal — a Strategic Product Designer and Founder based in Dubai, UAE. I specialize in architecting AI-driven SaaS solutions from 0 to 1, transforming complex business logic into <span className="text-primary font-medium">high-conversion user experiences</span> for B2B and B2C platforms.
                </TextReveal>
                <TextReveal delay={0.1}>
                  Currently at <span className="text-primary font-medium">Danway EME</span> leading the digitization of workforce management for a multi-million dollar industrial firm — transitioning 3,000+ field employees from paper-based tracking to a real-time analytics suite.
                </TextReveal>
                <TextReveal delay={0.2}>
                  I also co-founded <span className="text-primary font-medium">Rasoi Pay</span>, scaling a production-ready QR-ordering SaaS from concept to live — boosting average order value by 22% and achieving &lt;50ms menu load times. Expert in <span className="text-primary font-medium">Agentic AI</span>, scalable design systems, and full-stack UX/UI methodologies.
                </TextReveal>
                <TextReveal delay={0.3}>
                  In my downtime, I explore new destinations, shoot film, and push pixels on side projects.
                </TextReveal>
              </div>

              {/* Experience */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-8">Experience</p>
                <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                  {[
                    {
                      company: 'Danway EME',
                      role: 'Product Designer',
                      period: 'June 2025 — Present · Dubai, UAE',
                      description: 'Digitizing legacy workforce management for a multi-million dollar industrial firm. Engineered a proprietary automated dashboard prototype, reducing administrative man-hours by 35%. Conducted ethnographic user research with 3,000+ field employees to design a high-contrast, mobile-first UI for high-pressure industrial environments. Delivered a real-time analytics suite providing instant visibility into manpower allocation and labor cost-coding.'
                    },
                    {
                      company: 'Rasoi Pay',
                      role: 'UX/UI Engineer',
                      period: 'April 2025 — Present · Remote, India',
                      description: 'Disrupting the F&B market with a QR-ordering ecosystem. Scaled a production-ready SaaS platform (rasoipay.com) from concept to live — automating personalized menu recommendations and boosting average order value (AOV) by 22%. Owned the entire product lifecycle: UX research, Figma prototyping, and full-stack deployment using Next.js/Firebase. Optimized technical architecture to achieve <50ms menu load times, securing 5+ pilot partnerships.'
                    },
                    {
                      company: 'Webzspot Technologies',
                      role: 'Senior UX/UI Designer',
                      period: 'May 2023 — Feb 2024 · Remote, India',
                      description: 'Led the end-to-end redesign of the agency\'s corporate identity and client portals, driving a 50% increase in lead generation. Established a modular Figma design system that decreased front-end development time by 30%. Collaborated with cross-functional teams to deliver pixel-perfect, WCAG-compliant responsive prototypes for 12+ international clients.'
                    },
                    {
                      company: 'Independent Creative Strategist',
                      role: 'Digital Growth & Content Lead',
                      period: 'Jan 2021 — May 2023 · Global / Remote',
                      description: 'Engineered a digital brand strategy that generated over 400,000 organic engagements across YouTube and streaming platforms. Utilized audience retention analytics and A/B testing on content thumbnails to maximize user engagement and conversion.'
                    },
                  ].map((exp, i) => (
                    <div key={i} className="group">
                      <button
                        className="w-full flex items-start justify-between py-6 text-left"
                        data-cursor=""
                        onClick={() => setExpandedExp(expandedExp === i ? null : i)}
                      >
                        <div>
                          <p className="text-xl font-display font-medium text-foreground group-hover:text-primary transition-colors">{exp.company}</p>
                          <p className="text-base text-secondary/70 mt-1">{exp.role}</p>
                          <p className="text-sm text-secondary/40 mt-1.5">{exp.period}</p>
                        </div>
                        <span
                          className="text-2xl text-secondary/30 group-hover:text-primary transition-all mt-1 select-none inline-block"
                          style={{
                            transform: expandedExp === i ? 'rotate(45deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        >+</span>
                      </button>
                      <AnimatePresence>
                        {expandedExp === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-base leading-relaxed text-secondary/70 pb-6 pr-12">
                              {exp.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download CV */}
              <div className="flex justify-end">
                <a
                  href="/resume/Afjal_Khan_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors"
                >
                  <i className="bx bx-download text-base" /> Download full CV
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── PHOTO ─────────────────────────────────────────────────────── */}
          <div className="grid md:grid-cols-[minmax(200px,_1fr)_minmax(300px,_1.4fr)] gap-12 md:gap-24 items-start mt-24">
            <div />
            <div>
              <ParallaxImage
                src="/images/about.jpg"
                alt="Md Afjal Khan"
                className="w-full rounded-sm"
              />
              <p className="text-sm text-secondary/50 mt-4 italic">What I look like on a good day</p>
            </div>
          </div>

          {/* ── WHAT I'M KNOWN FOR (split layout) ───────────────────────── */}
          <div className="grid md:grid-cols-[minmax(200px,_1fr)_minmax(300px,_1.4fr)] gap-12 md:gap-24 items-start mt-32">
            <div className="md:sticky md:top-32 self-start">
              <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                <p className="text-sm text-secondary">What I&apos;m known for</p>
              </div>
            </div>

            {/* RIGHT — Large skill text with scroll highlight */}
            <div className="space-y-4 pb-32 pt-10">
              {[
                'Product Strategy',
                'Agentic AI Integration',
                'Design Systems',
                'UX Research',
                'High Fidelity Prototyping',
                'Motion Design',
                'Next.js Development',
                'CRO & Analytics',
                'WCAG Accessibility',
                'Visual Design',
              ].map((skill, i) => (
                <ScrollHighlightText key={i}>{skill}</ScrollHighlightText>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CONTACT ────────────────────────────────────────────────────────── */}
        <motion.section
          id="contact"
          className="pb-24 sm:pb-40 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-10">Contact</p>
            <div className="flex flex-col gap-2">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-[1.2] hover:text-white transition-colors w-fit"
              >
                Let talk
              </h2>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-[1.2] hover:text-white transition-colors w-fit"
              >
                Drop me a line <i className="material-icons align-top text-primary text-[0.8em] font-bold">arrow_outward</i>
              </h2>
            </div>
          </motion.div>

          <motion.form
            variants={fadeInUp}
            className="max-w-full sm:max-w-lg space-y-5"
            action={async (formData: FormData) => {
              setFormStatus('sending')
              try {
                // Dynamically import to ensure server action boundary is respected safely
                const { submitContactForm } = await import('./actions')
                await submitContactForm(formData)
                setFormStatus('sent')
                setFormData({ name: '', email: '', message: '' })
              } catch (e) {
                setFormStatus('error')
              }
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              data-cursor=""
              className="w-full bg-transparent border-b border-white/10 py-4 text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              data-cursor=""
              className="w-full bg-transparent border-b border-white/10 py-4 text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              name="message"
              placeholder="Your message"
              required
              rows={4}
              data-cursor=""
              className="w-full bg-transparent border-b border-white/10 py-4 text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors resize-none font-sans text-sm"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button
              type="submit"
              data-cursor=""
              disabled={formStatus === 'sending'}
              className="px-8 py-3 bg-primary text-background font-semibold rounded-full text-sm tracking-wide hover:bg-[#52e696] transition-all disabled:opacity-50"
            >
              {formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? '✓ Sent!' : 'Send message'}
            </button>
            {formStatus === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </motion.section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary/40">
          <img
            src={isDark ? "/images/logos/logo-white.svg" : "/images/logos/logo-black.svg"}
            alt="Md Afjal Khan"
            className="h-10 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
            onClick={() => scrollToSection('home')}
          />
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/mdafjalkhan29/" target="_blank" rel="noreferrer" data-cursor="Open" className="hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</a>
            <a href="https://github.com/wildzee" target="_blank" rel="noreferrer" data-cursor="Open" className="hover:text-primary transition-colors uppercase tracking-widest">GitHub</a>
            <a href="https://x.com/wild__zee" target="_blank" rel="noreferrer" data-cursor="Open" className="hover:text-primary transition-colors uppercase tracking-widest">X</a>
          </div>
          <span>Made with plenty of coffee · © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}