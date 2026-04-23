'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import CustomCursor from '../../components/CustomCursor'
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

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration * 60)
    const tick = () => {
      start += increment
      if (start >= target) { setCount(target); return }
      setCount(Math.floor(start))
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function RasoiPayCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const metrics = [
    { value: 22, suffix: '%', label: 'Boost in AOV' },
    { value: 50, suffix: 'ms', label: 'Load Times', isFloat: true, prefix: '<' },
    { value: 5, suffix: '+', label: 'Pilot Partners' },
    { value: 100, suffix: '%', label: 'Cashless Workflow' },
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Market Research & Validation',
      description: `Analyzed operational inefficiencies in local restaurants. Identified table turnover time, static menus, and manual ordering as primary friction points impacting revenue.`,
      tags: ['Market Analysis', 'Pain Point Mapping', 'Competitive Audit'],
    },
    {
      number: '02',
      title: 'Product Strategy & Next.js Architecture',
      description: `Architected a scalable B2B SaaS solution. Designed a real-time dashboard for restaurant owners and a seamless, commission-free QR ordering flow for their dine-in customers.`,
      tags: ['SaaS Architecture', 'Next.js', 'Firebase Auth'],
    },
    {
      number: '03',
      title: 'UX/UI & Design System',
      description: `Built an intuitive, consumer-grade enterprise interface. Focused on high contrast, clear typography, and blazing-fast interactions to ensure operational efficiency during peak hours.`,
      tags: ['Design System', 'Dashboard Design', 'Mobile-First'],
    },
    {
      number: '04',
      title: 'AI Integration & Analytics',
      description: `Integrated AI-driven insights to predict peak hours and recommend dynamic menu adjustments. Built analytics dashboards giving owners real-time visibility into sales metrics.`,
      tags: ['AI/ML', 'Data Visualization', 'Analytics'],
    },
    {
      number: '05',
      title: 'Deployment & Pilot Programs',
      description: `Successfully onboarded 5+ pilot partners. Monitored session recordings and analytics to continuously iterate the checkout flow, ultimately achieving sub-50ms load times.`,
      tags: ['Deployment', 'Iteration', 'Pilot Testing'],
    },
  ]

  const features = [
    {
      icon: 'bx bx-qr-scan',
      title: 'Commission-Free QR Ordering',
      description: 'Lightning-fast digital menus that allow customers to order directly from their table without waiting for staff.',
    },
    {
      icon: 'bx bx-bar-chart-alt-2',
      title: 'Real-Time Insights',
      description: 'Comprehensive analytics dashboard tracking daily sales, average order value, and peak operational hours.',
    },
    {
      icon: 'bx bx-brain',
      title: 'AI Revenue Predictor',
      description: 'Machine learning models integrated to project daily revenue patterns and optimize staffing requirements.',
    },
    {
      icon: 'bx bx-wallet',
      title: 'Seamless Payments',
      description: 'Frictionless, secure payment gateway integrations designed for instant zero-touch checkout experiences.',
    },
    {
      icon: 'bx bx-category',
      title: 'Dynamic Menu Management',
      description: 'Owners can update items, prices, and availability in real-time without reprinting physical menus.',
    },
    {
      icon: 'bx bx-timer',
      title: '<50ms Performance',
      description: 'Optimized Next.js frontend ensuring immediate load times even on spotty restaurant 4G connections.',
    },
  ]

  return (
    <div
      className="min-h-screen text-foreground selection:bg-primary/20 selection:text-primary"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <CustomCursor />
      {/* Grain Texture */}
      <div className="grain-overlay" />

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
          <span className="text-sm font-display font-medium tracking-widest uppercase">Rasoi Pay</span>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://rasoipay.com/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 border rounded-md text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <i className="bx bx-link-external" /> Live Site
            </a>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-end pb-20 pt-32 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[130px]" style={{ background: 'rgba(61,220,132,0.04)' }} />
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'rgba(61,162,255,0.04)' }} />
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
                LIVE · B2B SAAS
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.0] tracking-tight mb-6"
            >
              Rasoi Pay — The Modern
              <br />
              <span className="text-gradient">Restaurant OS</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl text-secondary leading-relaxed max-w-2xl mb-10"
            >
              An AI-powered B2B platform transforming legacy restaurant management into blazing-fast digital operations.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {['B2B SaaS', 'Next.js', 'AI/ML', 'UX/UI Engineering', 'Payment Systems'].map((tag) => (
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
            src="/Rasoi_Pay/rasoipay_mochup.jpg"
            alt="Rasoi Pay — Hero Overview"
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
                  {m.prefix && <span>{m.prefix}</span>}
                  {m.isFloat ? (
                    <span>{m.value}</span>
                  ) : (
                    <CountUp target={m.value as number} />
                  )}
                  <span>{m.suffix}</span>
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
              Legacy systems stalling growth
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              Managing a local restaurant is <span className="text-foreground font-medium">chaotic and fragmented</span>. Owners juggle physical menus, disorganized order tickets, blind analytics, and slow payment turnarounds.
            </p>
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              High commission rates from aggregator apps eat heavily into already razor-thin margins. Furthermore, <span className="text-foreground font-medium">dine-in table turnover times</span> are artificially inflated simply by waiting for servers to take orders or bring bills.
            </p>
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              The opportunity: build a <span className="text-primary font-medium">lean, lightning-fast operating system</span> designed specifically to automate dine-in ordering, reduce overhead costs, and increase Average Order Value (AOV).
            </p>

            {/* Problem callout */}
            <div
              className="rounded-xl p-6 mt-4 border-l-2"
              style={{ background: 'var(--surface)', borderLeftColor: 'var(--primary)' }}
            >
              <p className="text-sm uppercase tracking-widest text-primary mb-2 font-bold">The Core Insight</p>
              <p className="text-base text-secondary leading-relaxed">
                By removing friction in the ordering phase, customers naturally order more. Providing zero-touch QR ordering immediately drove a 22% bump in revenue for pilot partners.
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
              Founder &<br />UX/UI Engineer
            </h2>
            <div className="mt-8 space-y-2 text-sm text-secondary">
              <p className="flex items-center gap-2"><i className="bx bx-buildings text-primary" /> Start-up</p>
              <p className="flex items-center gap-2"><i className="bx bx-world text-primary" /> Remote, India</p>
              <p className="flex items-center gap-2"><i className="bx bx-calendar text-primary" /> Apr 2025 — Present</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              As the sole founder and product owner, I engineered Rasoi Pay completely <span className="text-foreground font-medium">from 0 to 1</span>, bridging the gap between rigorous enterprise needs and consumer-friendly aesthetics.
            </p>
            <p className="text-xl md:text-2xl leading-[1.65] text-secondary">
              My responsibilities span both deep technical architecture and granular pixel-pushing. I designed the modular design system, developed the Next.js frontend, integrated real-time Firebase backend systems, and built the AI revenue prediction pipeline.
            </p>
          </motion.div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── FEATURES GRID ── */}
        <motion.section
          className="py-24 sm:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16 md:text-center md:max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">03 — Features</p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1] mb-6">
              Engineered for speed and revenue
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
                <p className="text-sm text-secondary leading-relaxed">
                  {feature.description}
                </p>
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
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-10">Application Interface</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { src: '/Rasoi_Pay/rp_desktop_2.png', label: 'Advance Analytics' },
              { src: '/Rasoi_Pay/rp_desktop_3.png', label: 'Dashboard' },
              { src: '/Rasoi_Pay/rp_desktop_4.png', label: 'Order Management' },
              { src: '/Rasoi_Pay/rp_desktop_5.png', label: 'Landing page' },
            ].map((screen, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col items-center ${i === 4 ? 'sm:col-span-2 max-w-3xl mx-auto w-full' : ''}`}
              >
                <div
                  className="w-full rounded-xl overflow-hidden border transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl"
                  style={{
                    borderColor: 'var(--border)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                    background: 'var(--glass-bg)',
                  }}
                >
                  <Image
                    src={screen.src}
                    alt={screen.label}
                    width={1400}
                    height={900}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-secondary group-hover:text-foreground mt-5 mb-2 text-center tracking-wide transition-colors">{screen.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── MOCKUP IMAGE ── */}
        <motion.section
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pb-24 flex flex-col items-center"
        >
          <div
            className="rounded-2xl overflow-hidden border max-w-sm mx-auto w-full"
            style={{ borderColor: 'var(--border)' }}
          >
            <Image
              src="/Rasoi_Pay/Screenshot_2026-03-02-15-36-19-59_40deb401b9ffe8e1df2f1cc5ba480b12.jpg"
              alt="Rasoi Pay — Mobile Interface"
              width={600}
              height={1200}
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-xs text-secondary/50 mt-6 text-center italic">Rasoi Pay — Customer-facing mobile ordering experience</p>
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
              Architecting the system
            </h2>
          </motion.div>

          <div className="space-y-4">
            {processSteps.map((step, i) => (
              <ProcessStep key={i} step={step} />
            ))}
          </div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="animated-divider" />

        {/* ── RESULTS ── */}
        <motion.section
          className="py-24 sm:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <motion.div variants={fadeUp}>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">05 — Results</p>
              <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1] mb-6">
                Operational speed that scales
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                By deeply aligning technical architecture with real-world restaurant operations, Rasoi Pay has successfully modernized its pilot partners&apos; workflows. Table turnover is faster, menus can pivot dynamically without print costs, and AI predictions empower owners with unprecedented foresight.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 items-center">
              {[
                { label: 'Pilot Retention', val: '100%' },
                { label: 'Reduced Admin', val: '-40%' },
              ].map((res, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-6 rounded-2xl border flex flex-col justify-center items-center text-center aspect-square"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <p className="text-4xl font-display font-bold text-primary mb-2">{res.val}</p>
                  <p className="text-sm font-medium text-foreground">{res.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      {/* ── FOOTER CTA ── */}
      <footer className="mt-12 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="w-full px-[5vw] py-24 sm:py-32 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl sm:text-5xl font-display font-medium mb-8"
          >
            Ready to upgrade your restaurant?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://rasoipay.com"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <i className="bx bx-link-external" /> View Live Platform
            </a>
          </motion.div>
        </div>

        <div className="border-t flex" style={{ borderColor: 'var(--border)' }}>
          <Link
            href="/case-studies/iqra"
            className="flex-1 p-8 sm:p-12 hover:bg-secondary/5 transition-colors group flex flex-col"
          >
            <span className="text-xs uppercase tracking-widest text-secondary mb-2 group-hover:text-primary transition-colors">← Previous</span>
            <span className="text-xl sm:text-3xl font-display font-medium text-foreground">Iqra App</span>
          </Link>
          <div className="w-[1px]" style={{ backgroundColor: 'var(--border)' }} />
          <div className="flex-1 p-8 sm:p-12 flex flex-col items-end justify-center opacity-40">
            <span className="text-xs uppercase tracking-widest text-secondary mb-2">Next →</span>
            <span className="text-xl sm:text-3xl font-display font-medium text-foreground/40">—</span>
          </div>
        </div>
      </footer>
    </div>
  )
}