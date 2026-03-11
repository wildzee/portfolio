'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Magnetic({
    children,
    strength = 15,
    pullRadius = 50,
}: {
    children: React.ReactNode
    strength?: number
    pullRadius?: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring physics: stiffness dictates snap back speed, damping prevents oscillation
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const element = ref.current
            if (!element) return

            const { left, top, width, height } = element.getBoundingClientRect()
            const centerX = left + width / 2
            const centerY = top + height / 2

            const distX = e.clientX - centerX
            const distY = e.clientY - centerY
            const distance = Math.sqrt(distX * distX + distY * distY)

            if (distance < pullRadius + Math.max(width, height) / 2) {
                setIsHovered(true)
                // Calculate the pull strength based on distance
                x.set((distX / width) * strength)
                y.set((distY / height) * strength)
            } else if (isHovered) {
                // Snap back
                setIsHovered(false)
                x.set(0)
                y.set(0)
            }
        }

        const handleMouseLeave = () => {
            setIsHovered(false)
            x.set(0)
            y.set(0)
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove)
            document.body.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('mousemove', handleMouseMove)
                document.body.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [strength, pullRadius, isHovered, x, y])

    return (
        <motion.div
            ref={ref}
            style={{
                x: springX,
                y: springY,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {children}
        </motion.div>
    )
}
