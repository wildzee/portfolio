'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface KineticTextProps {
    children: string | React.ReactNode
    className?: string
    as?: React.ElementType
}

export default function KineticText({ children, className = '', as: Component = 'p' }: KineticTextProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-10%' })

    // Antigravity's core motion token
    const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]

    // Variants MUST be defined before they are used in the mapping below
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.015, delayChildren: 0.1 },
        },
    }

    const childVariant = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: easePremium,
            },
        },
        hidden: {
            opacity: 0,
            y: "110%", // Pushing it completely out of bounds for the "reveal" up effect
        },
    }

    // A robust split-text approach that handles both raw strings and JSX elements without losing them:
    const content = React.Children.toArray(children).flatMap((child, childIndex) => {
        if (typeof child === 'string') {
            // Split by words, but keep the spaces intact in the render
            return child.split(/(\s+)/).map((segment, segmentIndex) => {
                // If it's pure whitespace, just render it as is
                if (segment.trim() === '') {
                    return <span key={`${childIndex}-${segmentIndex}`}>{segment}</span>
                }
                // If it's a word, wrap it in the animation structure
                // Outer span is just for masking, inner motion.span receives the stagger
                return (
                    <span
                        key={`${childIndex}-${segmentIndex}`}
                        className="inline-flex overflow-hidden relative align-bottom"
                    >
                        <motion.span variants={childVariant} className="inline-block relative">
                            {segment}
                        </motion.span>
                    </span>
                )
            })
        }
        // If it's a JSX element (like <span> or <a>), wrap it as a single staggered block
        return (
            <span
                key={`node-${childIndex}`}
                className="inline-flex overflow-hidden relative align-bottom"
            >
                <motion.span variants={childVariant} className="inline-block relative">
                    {child}
                </motion.span>
            </span>
        )
    })

    const MotionComponent = motion(Component as any)

    return (
        <MotionComponent
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`${className} flex flex-wrap`}
        >
            {content}
        </MotionComponent>
    )
}
