'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Antigravity's core motion tokens
    const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]
    const easeBrutal: [number, number, number, number] = [0.85, 0, 0.15, 1]

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: easePremium } }}
                exit={{ y: 20, opacity: 0, transition: { duration: 0.3, ease: easeBrutal } }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
