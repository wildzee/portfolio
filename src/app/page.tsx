'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, Variants, AnimatePresence } from 'framer-motion'
import CursorBlurOriginal from './components/cursors/CursorBlurOriginal'
import Magnetic from './components/Magnetic'
import ParallaxImage from './components/ParallaxImage'
import ScrollHighlightText from './components/ScrollHighlightText'
import SplitLines from './components/SplitLines'

// ─── Preloader Component ───────────────────────────────────────────────────────
function Preloader({ onComplete, isDark }: { onComplete: () => void; isDark: boolean }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  const bg = isDark ? '#050505' : '#fafafa'
  const textColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
  const logoFill = isDark ? '#fff' : '#000'

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: bg }}
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0, transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Logo — draw-on SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.01 }}
        className="mb-8 w-28 h-28"
      >
        <svg viewBox="0 0 462 462" fill="none" xmlns="http://www.w3.org/2000/svg" width="112" height="112">
          {/* stroke draws on, then fill fades in */}
          <motion.path
            d="M217.992 66.0088C244.654 66.5522 271.334 66.1748 298.007 66.1934C310.144 66.2018 312.85 68.8525 312.854 80.7178C312.868 117.317 312.835 153.917 312.854 190.517C312.867 214.453 324.162 225.631 348.346 225.655C373.627 225.681 398.908 225.641 424.189 225.67C435.004 225.682 437.934 228.533 437.939 239.127C437.965 286.845 437.97 334.564 437.938 382.282C437.93 392.895 434.801 396.027 424.37 396.036C396.074 396.062 367.777 396.112 339.481 396.027C303.792 395.921 273.357 365.481 273.268 329.89C273.223 312.053 273.301 294.216 273.249 276.38C273.219 266.075 268.774 259.443 260.153 256.516C252.007 253.749 244.321 256.157 238.041 263.98C204.678 305.54 171.33 347.113 138.181 388.843C134.022 394.078 129.481 396.23 122.798 396.162C94.2727 395.874 65.7429 396.028 37.2148 396.042C33.7125 396.044 30.2039 396.201 27.4385 393.47C24.1591 390.143 24.0421 386.935 24.0449 383.635C24.0689 355.374 24.1088 327.113 24.001 298.854C23.9841 294.442 25.2479 290.872 28.0146 287.416C84.3415 217.064 140.668 146.71 196.747 76.1611C202.475 68.9548 208.661 65.8187 217.992 66.0088Z"
            stroke={logoFill}
            strokeWidth="18"
            fill="transparent"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{
              pathLength: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
              fillOpacity: { duration: 0.4, ease: 'easeIn', delay: 1.0 },
            }}
            style={{ fill: logoFill }}
          />
        </svg>
      </motion.div>

      {/* Name */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="text-[10px] tracking-[0.4em] uppercase font-sans"
        style={{ color: textColor }}
      >
        Md Afjal Khan
      </motion.p>
    </motion.div>
  )
}

// ─── Image Marquee ─────────────────────────────────────────────────────────────
const GALLERY = [
  '/images/gallery/img1.jpg',
  '/images/gallery/img2.jpg',
  '/images/gallery/img3.jpg',
  '/images/gallery/img4.jpg',
  '/images/gallery/img5.jpg',
]

function ImageMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const tick = () => {
      if (track) {
        const halfWidth = track.scrollWidth / 2
        xRef.current -= 0.6
        if (xRef.current <= -halfWidth) xRef.current = 0
        track.style.transform = `translateX(${xRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section className="py-24 sm:py-32">
      <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 w-max"
        >
          {[...GALLERY, ...GALLERY].map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden shrink-0 rounded-sm"
              style={{ width: 'clamp(160px, 38vw, 360px)', height: 'clamp(220px, 50vw, 520px)' }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="360px"
                className="object-cover"
                style={{ filter: 'grayscale(25%) contrast(1.05) brightness(0.9)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [isDark, setIsDark] = useState(true)
  const [expandedExp, setExpandedExp] = useState<number | null>(null)

  // Scroll + Parallax
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.88])
  const heroCtaY = useTransform(scrollYProgress, [0, 0.18], [0, -20])
  const orbScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2])
  const logoGlowOpacity = useTransform(scrollYProgress, [0, 0.18], [0.06, 0.22])
  const logoGlowScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.12])
  const logoGlowBlur1 = useTransform(scrollYProgress, [0, 0.18], [0, 55])
  const logoGlowBlur2 = useTransform(scrollYProgress, [0, 0.18], [0, 110])
  const logoGlowFilter = useMotionTemplate`drop-shadow(0 0 ${logoGlowBlur1}px #3CDA6466) drop-shadow(0 0 ${logoGlowBlur2}px #3CDA6422)`

  useEffect(() => {
    // Read saved theme preference or default to dark
    const saved = localStorage.getItem('theme')
    const prefersDark = saved ? saved === 'dark' : true
    setIsDark(prefersDark)
    document.documentElement.classList.toggle('dark', prefersDark)

    // Only show preloader on first visit per session
    if (!sessionStorage.getItem('preloader-shown')) {
      sessionStorage.setItem('preloader-shown', '1')
      setShowPreloader(true)
    }

    setMounted(true)
  }, [])

  // Sync dark class and persist on change
  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark, mounted])

  if (!mounted) return null

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setShowMenu(false)
  }

  const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
  }
  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const workRowVariant = {
    hidden: { opacity: 0, x: -24 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easePremium, delay: i * 0.08 },
    }),
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
      image: '/Rasoi_Pay/rp_desktop_1.png',
    },
    {
      status: 'SHIPPED',
      title: 'Iqra App',
      role: 'UX Lead & Co-Designer',
      description: 'Mobile product, 50,000+ active users',
      href: '/case-studies/iqra',
      public: true,
      image: '/Iqra/Iqra_mockup.png',
    },
    {
      status: 'CONFIDENTIAL',
      title: 'Danway EME',
      role: 'Lead Product Designer',
      description: 'Enterprise workforce & labor-cost dashboard',
      href: null,
      public: false,
      image: '',
    },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
      <AnimatePresence>
        {showPreloader && <Preloader key="preloader" isDark={isDark} onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>

      <CursorBlurOriginal />


      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[1.5px] bg-gradient-to-r from-primary to-[#6aeaa4] z-[60]"
        style={{ width: progressWidth }}
      />

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0)' }}>
        <nav className="w-full px-[5vw] h-16 sm:h-20 flex justify-between items-center">
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
                className="hidden md:flex items-center gap-2 px-4 py-2 border rounded-md text-xs uppercase tracking-widest hover:border-foreground transition-colors"
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
              <nav className="w-full px-[5vw] h-24 flex justify-between items-center text-foreground">
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
            <div className="flex-grow flex items-center justify-center md:justify-end max-w-[1440px] mx-auto w-full px-6 pb-16 md:pb-20 md:pr-32">
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
                      className="text-4xl sm:text-5xl md:text-7xl leading-[1.1] font-display font-medium text-foreground hover:text-white transition-colors inline-block"
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.id) }}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); setShowMenu(false); scrollToSection('contact') }}
                  className="inline-flex items-center gap-2 px-6 py-3 border rounded-full text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <i className="bx bx-phone" /> Book a call
                </a>
              </motion.div>
            </div>

            {/* Menu Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-[1440px] mx-auto w-full px-6 pb-10 flex justify-between items-end text-xs text-secondary/60"
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

      <main className="w-full px-[5vw]">

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <motion.section
          id="home"
          className="min-h-screen flex flex-col justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 relative"
          initial="hidden"
          animate={!showPreloader ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Floating orbs with breathing animation */}
          <motion.div style={{ scale: orbScale }} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="orb-breathing absolute top-[-5%] left-[-10%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] rounded-full bg-primary/5 blur-[130px]" />
            <div className="orb-breathing-reverse absolute bottom-[10%] right-[-10%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-amber-900/5 blur-[100px]" />
          </motion.div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative">
            {/* Background Logo Watermark — glow intensifies on scroll */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: "-50%", y: "-50%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="absolute left-1/2 top-1/2 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] -z-10 pointer-events-none"
              style={{ opacity: logoGlowOpacity, scale: logoGlowScale, filter: logoGlowFilter }}
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
            <motion.div style={{ scale: heroScale }}>
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
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm uppercase tracking-[0.2em] text-secondary">
              Product Designer at{' '}
              <span className="text-foreground font-semibold">Danway EME</span>
              {' '}·{' '}
              UX/UI Engineer at{' '}
              <span className="text-foreground font-semibold">Rasoi Pay</span>
            </motion.p>

            <motion.div variants={fadeInUp} style={{ y: heroCtaY }} className="flex gap-4 sm:gap-6 mt-10 sm:mt-12">
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

          <div data-cursor-small>
            {projects.map((project, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={workRowVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
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
                    <div className="work-arrow hidden sm:block">
                      <i className="bx bx-right-arrow-alt" />
                    </div>
                    <div className="sm:hidden text-secondary/50 text-sm">
                      →
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
              <div className="border-t pt-8" style={{ borderColor: 'var(--border)' }}>
                <motion.h2
                  className="font-display font-normal tracking-[-0.02em] leading-[1.1]"
                  style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
                >
                  About
                </motion.h2>
              </div>
            </motion.div>

            {/* RIGHT — Content */}
            <motion.div variants={fadeInUp} className="space-y-16 sm:space-y-24">
              {/* Bio */}
              <div className="space-y-5 sm:space-y-8 text-base sm:text-lg md:text-xl leading-[1.65] text-secondary">
                <SplitLines delay={0} className="text-base sm:text-lg md:text-xl leading-[1.65] text-secondary">
                  I&apos;m Afjal — a Strategic Product Designer and Founder based in Dubai, UAE. I specialize in architecting AI-driven SaaS solutions from 0 to 1, transforming complex business logic into <span className="text-primary font-medium">high-conversion user experiences</span> for B2B and B2C platforms.
                </SplitLines>
                <SplitLines delay={0.1} className="text-base sm:text-lg md:text-xl leading-[1.65] text-secondary">
                  Currently at <span className="text-primary font-medium">Danway EME</span> leading the digitization of workforce management for a multi-million dollar industrial firm — transitioning 3,000+ field employees from paper-based tracking to a real-time analytics suite.
                </SplitLines>
                <SplitLines delay={0.2} className="text-base sm:text-lg md:text-xl leading-[1.65] text-secondary">
                  I also co-founded <span className="text-primary font-medium">Rasoi Pay</span>, scaling a production-ready QR-ordering SaaS from concept to live — boosting average order value by 22% and achieving &lt;50ms menu load times. Expert in <span className="text-primary font-medium">Agentic AI</span>, scalable design systems, and full-stack UX/UI methodologies.
                </SplitLines>
                <SplitLines delay={0.3} className="text-base sm:text-lg md:text-xl leading-[1.65] text-secondary">
                  In my downtime, I explore new destinations, shoot film, and push pixels on side projects.
                </SplitLines>
              </div>

              {/* Experience */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-8">Experience</p>
                <div className="divide-y" style={{ borderColor: 'var(--border)' }} data-cursor-small>
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
                        <div className="space-y-1">
                          <p className="text-xl font-sans font-normal text-foreground">{exp.company}</p>
                          <p className="text-base text-secondary italic">{exp.role}</p>
                          <p className="text-xs text-secondary/40 tracking-wide mt-0.5">{exp.period}</p>
                        </div>
                        <span className="text-lg text-secondary/50 flex-shrink-0 mt-1 leading-none">
                          {expandedExp === i ? '×' : '+'}
                        </span>
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

              {/* ── PHOTO — inside right column so sticky About tracks to here */}
              <div className="mt-16 sm:mt-24">
              <ParallaxImage
                src="/images/gallery/my-image.jpg"
                alt="Md Afjal Khan"
                className="w-full rounded-sm"
              />
              <p className="text-sm text-secondary/50 mt-4 italic">What I look like on a good day</p>
              </div>
            </motion.div>
          </div>

          {/* ── WHAT I'M KNOWN FOR (split layout) ───────────────────────── */}
          <div className="grid md:grid-cols-[minmax(200px,_1fr)_minmax(300px,_1.4fr)] gap-12 md:gap-24 items-start mt-32" data-cursor-ignore-text>
            <div className="md:sticky md:top-32 self-start">
              <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
                <p className="text-sm text-secondary">What I&apos;m known for</p>
              </div>
            </div>

            {/* RIGHT — Large skill text with scroll highlight */}
            <div className="space-y-4 pt-10 pb-0">
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

        {/* ── EDITORIAL IMAGE MARQUEE ────────────────────────────────────────── */}
        <ImageMarquee />

        {/* ── CONTACT ────────────────────────────────────────────────────────── */}
        <motion.section
          id="contact"
          className="min-h-screen flex flex-col justify-end pb-24 sm:pb-32 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-10">Contact</p>
            <div className="flex flex-col gap-2">
              <h2
                className="text-2xl sm:text-3xl md:text-5xl font-display font-medium leading-[1.2] hover:text-primary transition-colors w-fit"
              >
                Let talk
              </h2>
              <h2
                className="text-2xl sm:text-3xl md:text-5xl font-display font-medium leading-[1.2] hover:text-primary transition-colors w-fit"
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
              } catch {
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
              className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              data-cursor=""
              className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              name="message"
              placeholder="Your message"
              required
              rows={4}
              data-cursor=""
              className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors resize-none font-sans text-sm"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <button
                type="submit"
                data-cursor=""
                disabled={formStatus === 'sending'}
                className="px-8 py-3 bg-primary text-background font-semibold rounded-full text-sm tracking-wide hover:bg-[#52e696] transition-all disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? '✓ Sent!' : 'Send message'}
              </button>
            </motion.div>
            {formStatus === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </motion.section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="w-full px-[5vw] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary/40">
          <Image
            src={isDark ? "/images/logos/logo-white.svg" : "/images/logos/logo-black.svg"}
            alt="Md Afjal Khan"
            width={40} height={40}
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