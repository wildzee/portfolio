'use client'

import React, { useRef, useMemo, memo } from 'react'
import { motion, useInView } from 'framer-motion'

interface KineticTextProps {
    children: string | React.ReactNode
    className?: string
    as?: React.ElementType
}

const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]

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
        transition: { duration: 0.7, ease: easePremium },
    },
    hidden: {
        opacity: 0,
        y: '110%',
    },
}

const KineticText = memo(function KineticText({ children, className = '', as: Component = 'p' }: KineticTextProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-10%' })

    const content = useMemo(() =>
        React.Children.toArray(children).flatMap((child, childIndex) => {
            if (typeof child === 'string') {
                return child.split(/(\s+)/).map((segment, segmentIndex) => {
                    if (segment.trim() === '') {
                        return <span key={`${childIndex}-${segmentIndex}`}>{segment}</span>
                    }
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
        }),
    [children])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
})

export default KineticText
