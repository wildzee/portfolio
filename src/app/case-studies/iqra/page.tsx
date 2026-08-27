'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { useRef } from 'react'
import CursorBlurOriginal from '../../components/cursors/CursorBlurOriginal'
import ProcessStep from '@/app/components/ProcessStep'
import ThemeToggle from '../../components/ThemeToggle'

const easeExpressive = [0.16, 1, 0.3, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeExpressive } },
}
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

export default function IqraCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const metrics = [
    { value: '100,000+', label: 'Active Users' },
    { value: '4.9★', label: 'Rating on Google Play' },
    { value: '600+', label: 'Reviews' },
    { value: '2', label: 'Platforms — iOS & Android' },
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Research',
      description: `Conducted in-depth user interviews with Roman Urdu readers across multiple regions to understand their pain points with existing Quran apps. Mapped existing journeys to identify accessibility gaps and authenticity concerns.`,
      tags: ['User Interviews', 'Competitive Audit', 'Journey Mapping'],
    },
    {
      number: '02',
      title: 'Information Architecture',
      description: `Restructured the app's content hierarchy around three primary user needs: reading, learning, and daily utilities. Designed a bottom-tab navigation system for frictionless wayfinding across 5 main areas.`,
      tags: ['Card Sorting', 'IA Design', 'Navigation Design'],
    },
    {
      number: '03',
      title: 'UI Design System',
      description: `Built a calm, high-contrast design language with adjustable typography at its core — individual font sliders for Arabic, transliteration, and translation. Full dark mode designed for night-time reading comfort.`,
      tags: ['Design System', 'Typography', 'Dark Mode', 'Accessibility'],
    },
    {
      number: '04',
      title: 'Prototyping & Testing',
      description: `Produced high-fidelity Figma prototypes and ran 3 rounds of usability tests with target users. Iterated on reading flow, text toggle interactions, and the Hadith library navigation based on session recordings.`,
      tags: ['Figma', 'Usability Testing', 'Iteration'],
    },
    {
      number: '05',
      title: 'Launch & Growth',
      description: `Collaborated with developer Aman Maqsood on final handoff and QA. Post-launch, iterated on user feedback to introduce the favorites system and "continue reading" feature that drove retention.`,
      tags: ['Handoff', 'QA', 'Post-launch Iteration'],
    },
  ]

  const features = [
    {
      icon: 'bx bx-font',
      title: 'Roman Urdu Transliteration',
      description: 'First-class support for Roman script readers — the primary gap in the market that Iqra was built to solve.',
    },
    {
      icon: 'bx bx-moon',
      title: 'High-Contrast Dark Mode',
      description: 'Purpose-built for comfortable night-time reading, a primary use case identified through user research.',
    },
    {
      icon: 'bx bx-slider-alt',
      title: 'Granular Text Control',
      description: 'Individual font sliders for Arabic, transliteration, and translation — giving users full control over their reading experience.',
    },
    {
      icon: 'bx bx-compass',
      title: 'Prayer Times & Qibla',
      description: 'Integrated daily utilities to make Iqra the single spiritual companion users reach for every day.',
    },
    {
      icon: 'bx bx-book-open',
      title: 'Authentic Hadith Library',
      description: 'Curated, source-verified Hadith and Duas from authenticated Salaf sources — the authenticity signal users were missing.',
    },
    {
      icon: 'bx bx-bookmark',
      title: 'Personalized Reading',
      description: 'Favorites, reading history, and "continue reading" — the retention features that drove daily active engagement.',
    },
  ]

  return (
    <div
      className="min-h-screen text-foreground selection:bg-primary/20 selection:text-primary"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <CursorBlurOriginal />

      {/* ── SCROLL PROGRESS ── */}
      <motion.div
        className="fixed top-0 left-0 h-[1.5px] bg-gradient-to-r from-primary to-[#6aeaa4] z-[60]"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      {/* ── STICKY NAV ── */}
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0)' }}
      >
        <nav className="w-full px-[5vw] h-16 sm:h-20 flex justify-between items-center">
          <Link
            href="/"
            data-cursor=""
            className="flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors"
          >
            <i className="bx bx-arrow-back text-base" />
            <span className="tracking-widest uppercase text-xs font-medium">Back</span>
          </Link>
          <span className="text-sm font-display font-medium tracking-widest uppercase">Iqra App</span>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://play.google.com/store/apps/details?id=com.quran.iqra"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 border rounded-md text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <i className="bx bxl-play-store" /> Get it
            </a>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-end pb-20 pt-32 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[130px]" style={{ background: 'rgba(61,220,132,0.04)' }} />
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'rgba(139,92,246,0.04)' }} />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full px-[5vw] w-full"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                SHIPPED · iOS & Android
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.0] tracking-tight mb-6"
            >
              Iqra — Roman Urdu
              <br />
              <span className="text-gradient">Quran App</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl text-secondary leading-relaxed max-w-2xl mb-10"
            >
              Making the Quran accessible to Roman Urdu readers who were underserved by every existing app on the market.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {['UX Research', 'Product Design', 'Information Architecture', 'Design System', 'iOS & Android'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium tracking-wide"
                  style={{ borderColor: 'var(--border)', color: 'var(--secondary)' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="w-full px-[5vw] pb-24">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden border"
          style={{ borderColor: 'var(--border)' }}
        >
          <Image
            src="/Iqra/Iqra_casestuide.png"
            alt="Iqra App — Case Study Overview"
            width={1400}
            height={800}
            priority
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* ── METRICS ── */}
      <section className="border-y py-16 sm:py-20" style={{ borderColor: 'var(--border)' }}>
        <div className="w-full px-[5vw]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-1">
                  {m.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-secondary">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="w-full px-[5vw]">

        {/* ── THE PROBLEM ── */}
        <motion.section
          className="py-24 sm:py-32 grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="md:sticky md:top-32 self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">01 — Problem</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1]">
              A major accessibility gap
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              Millions of Urdu speakers can speak and understand the language but cannot read Arabic script, and in many cases cannot read Urdu script either. They read Urdu written in Roman letters. <span className="text-foreground font-medium">Every major Quran app was Arabic-first</span> or treated Roman Urdu as a bolt-on.
            </p>
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              Beyond the script barrier, users reported deep concerns about the <span className="text-foreground font-medium">authenticity of sources</span> — many apps failed to cite their Hadith and Duas from verified Salaf references, creating a trust gap for devout users.
            </p>
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              The opportunity: build the <span className="text-primary font-medium">definitive Roman Urdu Quran app</span> — one that is accessible, deeply customizable, authenticated, and beautifully designed from first launch to daily use.
            </p>

            {/* Problem callout */}
            <div
              className="rounded-xl p-6 mt-4 border-l-2"
              style={{ background: 'var(--surface)', borderLeftColor: 'var(--primary)' }}
            >
              <p className="text-sm uppercase tracking-widest text-primary mb-2 font-bold">The Core Insight</p>
              <p className="text-base text-secondary leading-relaxed">
                Existing apps treated Roman Urdu as a secondary feature. We designed Iqra to treat it as the primary experience.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── MY ROLE ── */}
        <motion.section
          className="py-24 sm:py-32 grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="md:sticky md:top-32 self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">02 — Role</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1]">
              UX Lead &<br />Co-Designer
            </h2>
            <div className="mt-8 space-y-2 text-sm text-secondary">
              <p className="flex items-center gap-2"><i className="bx bx-user text-primary" /> With Aman Maqsood (Dev)</p>
              <p className="flex items-center gap-2"><i className="bx bx-devices text-primary" /> iOS & Android</p>
              <p className="flex items-center gap-2"><i className="bx bx-calendar text-primary" /> 2023 — Present</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              I led the complete <span className="text-foreground font-medium">end-to-end UX design process</span> — from initial user research and information architecture through to high-fidelity prototyping, design system creation, and developer handoff.
            </p>
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              Working in close collaboration with developer Aman Maqsood, I owned every design decision: the reading experience, the navigation system, the customization model, and the visual language that today serves <span className="text-primary font-medium">100,000+ active users</span>.
            </p>
          </motion.div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── FEATURE DESIGN ── */}
        <motion.section
          className="py-24 sm:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">03 — Features</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1] max-w-xl">
              Designed for depth, built for daily use
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl p-6 border group hover:border-primary/30 transition-colors"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <i className={`${feature.icon} text-xl text-primary mb-4 block`} />
                <h3 className="text-base font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── APP SCREENSHOTS ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pb-24"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-10">App Screens</p>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible scrollbar-none"
            style={{ scrollbarWidth: 'none' }}>
            {[
              { src: '/Iqra/Screenshot_2026-03-02-15-35-06-09_73330e35353761989ca239cd8915befb.jpg', label: 'Home — Surah List' },
              { src: '/Iqra/Screenshot_2026-03-02-15-35-09-41_73330e35353761989ca239cd8915befb.jpg', label: 'Reading — Al-Fatiha' },
              { src: '/Iqra/Screenshot_2026-03-02-15-35-14-77_73330e35353761989ca239cd8915befb.jpg', label: 'Dhikr & Dua Library' },
              { src: '/Iqra/Screenshot_2026-03-02-15-35-17-92_73330e35353761989ca239cd8915befb.jpg', label: 'Prayer Times' },
              { src: '/Iqra/Screenshot_2026-03-02-15-35-23-40_73330e35353761989ca239cd8915befb.jpg', label: 'Surah Detail View' },
            ].map((screen, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-auto group"
              >
                <div
                  className="rounded-[2rem] overflow-hidden border transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl"
                  style={{
                    borderColor: 'var(--border)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                  }}
                >
                  <Image
                    src={screen.src}
                    alt={screen.label}
                    width={400}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-[11px] text-secondary/50 mt-3 text-center tracking-wide">{screen.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>


        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── PROCESS ── */}
        <motion.section
          className="py-24 sm:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">04 — Process</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1] max-w-xl">
              How we took it from gap to market
            </h2>
          </motion.div>

          <div className="space-y-0 divide-y" style={{ borderColor: 'var(--border)' }}>
            {processSteps.map((step, i) => (
              <ProcessStep key={i} step={step} />
            ))}
          </div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── RESULTS ── */}
        <motion.section
          className="py-24 sm:py-32 grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="md:sticky md:top-32 self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">05 — Results</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1]">
              A trusted, community-embraced product
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-8">
            {[
              {
                metric: '100,000+',
                label: 'Active Users',
                description: 'Significant market penetration validating product-market fit within the Roman Urdu Quran reader segment — a category with virtually no competition at launch.',
              },
              {
                metric: '4.9★',
                label: 'Rating on Google Play (600+ Reviews)',
                description: 'Exceptional user satisfaction driven by the reading customization system and content authenticity — the two pillars of our initial research.',
              },
              {
                metric: '2',
                label: 'Platforms Shipped',
                description: 'Successfully launched on both iOS and Android, with identical UX quality across both platforms, from a core two-person team.',
              },
            ].map((result, i) => (
              <div
                key={i}
                className="rounded-xl p-6 sm:p-8 border"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-start gap-4">
                  <div>
                    <p className="text-3xl sm:text-4xl font-display font-bold text-primary mb-1">{result.metric}</p>
                    <p className="text-xs uppercase tracking-widest text-secondary mb-3">{result.label}</p>
                    <p className="text-sm leading-relaxed text-secondary">{result.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── REDESIGN 2026 ── */}
        <motion.section
          className="py-24 sm:py-32 grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="md:sticky md:top-32 self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">06 — Redesign, 2026</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1]">
              Rebuilding for the next 100,000
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              Three years of daily-use data surfaced where the original IA was straining — navigation depth for the Hadith library, inconsistent spacing across the reading and dashboard surfaces, and a component set that had grown ad hoc as features shipped.
            </p>
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              I&apos;m leading a full redesign now shipping in staged releases: a rebuilt design system underneath the entire app, a flattened navigation model, and a refined reading surface that carries the font-slider and dark-mode customization further than the original version could support.
            </p>
          </motion.div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── DESIGN SYSTEM ── */}
        <motion.section
          className="py-24 sm:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">07 — Design System</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1] mb-6">
              The system behind the screens
            </h2>
            <p className="text-lg text-secondary leading-relaxed">
              Identical quality across iOS and Android from a two-person team doesn&apos;t happen by eye. Every screen in Iqra is assembled from one shared system of type, color, and components — the same system the font-slider and high-contrast dark mode are built on top of, not bolted onto.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: 'bx bx-text',
                title: 'Type Scale',
                description: 'A modular scale spanning Arabic script, Roman Urdu transliteration, and English translation — each with independent size steps so the three reading layers stay legible and balanced at every font-slider setting.',
              },
              {
                icon: 'bx bx-palette',
                title: 'Color Tokens',
                description: 'Light and dark mode are derived from one token set, not maintained as two separate palettes — surface, border, and text tokens remap together so contrast ratios hold in both modes.',
              },
              {
                icon: 'bx bx-shapes',
                title: 'Component Set',
                description: 'A shared library of reading surfaces, cards, navigation, and controls used identically on iOS and Android, so parity between platforms is a property of the system rather than a QA checklist.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl p-6 border group hover:border-primary/30 transition-colors"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <i className={`${item.icon} text-xl text-primary mb-4 block`} />
                <h3 className="text-base font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border rounded-full text-sm tracking-wide hover:border-primary hover:text-primary transition-all"
              style={{ borderColor: 'var(--border)' }}
            >
              <i className="bx bxl-figma text-lg" /> View the system on Figma
            </a>
          </motion.div>
        </motion.section>

      </main>

      {/* ── CTA ── */}
      <section
        className="border-t py-20 sm:py-28"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="w-full px-[5vw]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-3">Live on both stores</p>
              <h2 className="text-3xl sm:text-4xl font-display font-medium">Try Iqra yourself</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.quran.iqra&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-background font-semibold rounded-full text-sm tracking-wide hover:bg-[#52e696] transition-all"
              >
                <i className="bx bxl-play-store text-lg" /> Google Play
              </a>
              <a
                href="https://apps.apple.com/gb/app/iqra-roman-urdu-quran-duas/id6749045940"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border font-semibold rounded-full text-sm tracking-wide hover:border-primary hover:text-primary transition-all"
                style={{ borderColor: 'var(--border)' }}
              >
                <i className="bx bxl-apple text-lg" /> App Store
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t py-0" style={{ borderColor: 'var(--border)' }}>
        <div className="flex">
          <Link
            href="/"
            className="flex-1 p-8 sm:p-12 hover:bg-secondary/5 transition-colors group flex flex-col"
          >
            <span className="text-xs uppercase tracking-widest text-secondary mb-2 group-hover:text-primary transition-colors">← Previous</span>
            <span className="text-xl sm:text-3xl font-display font-medium text-foreground">Portfolio</span>
          </Link>
          <div className="w-[1px]" style={{ backgroundColor: 'var(--border)' }} />
          <Link
            href="/case-studies/rasoipay"
            className="flex-1 p-8 sm:p-12 hover:bg-secondary/5 transition-colors group flex flex-col items-end"
          >
            <span className="text-xs uppercase tracking-widest text-secondary mb-2 group-hover:text-primary transition-colors">Next →</span>
            <span className="text-xl sm:text-3xl font-display font-medium text-foreground">Rasoi Pay</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}
