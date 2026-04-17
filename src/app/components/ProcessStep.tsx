'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easePremium } from '@/lib/motion'

interface StepData {
  number: string
  title: string
  description: string
  tags: string[]
}

interface Props {
  step: StepData
}

export default function ProcessStep({ step }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="group"
    >
      <button
        className="w-full flex items-start justify-between py-6 sm:py-8 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start gap-6 sm:gap-10">
          <span className="text-xs font-mono text-secondary/40 mt-1 w-6 shrink-0">{step.number}</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-medium text-foreground group-hover:text-primary transition-colors">
              {step.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest text-secondary/50 border px-2 py-0.5 rounded-sm"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: easePremium }}
          className="text-xl text-secondary group-hover:text-primary transition-all mt-1 shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easePremium }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-6 pl-16 text-sm sm:text-base text-secondary leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
