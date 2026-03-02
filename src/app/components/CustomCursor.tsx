'use client'

import { useRef, useState, useEffect } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const [label, setLabel] = useState('')
    const [cursorType, setCursorType] = useState<'default' | 'hover' | 'text'>('default')
    const [dynamicSize, setDynamicSize] = useState({ width: 40, height: 40 })
    const posRef = useRef({ x: -100, y: -100 })
    const rafRef = useRef<number>(0)

    useEffect(() => {
        const move = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY }
        }
        const tick = () => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        window.addEventListener('mousemove', move)

        const onMouseOver = (e: MouseEvent) => {
            if (!(e.target instanceof Element)) return
            const target = e.target as HTMLElement

            const el = target.closest('[data-cursor]')
            if (el) {
                setLabel(el.getAttribute('data-cursor') || '')
                const rect = el.getBoundingClientRect()
                const size = Math.max(50, Math.min(90, Math.min(rect.width, rect.height) * 0.6))
                setDynamicSize({ width: size, height: size })
                setCursorType('hover')
                return
            }

            setLabel('')
            const computedStyle = window.getComputedStyle(target)
            const isTextElement =
                computedStyle.cursor === 'text' ||
                ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'A', 'LABEL'].includes(target.tagName)

            if (isTextElement) {
                const fontSize = parseFloat(computedStyle.fontSize) || 16
                const cursorHeight = Math.max(20, Math.min(120, fontSize * 1.4))
                setDynamicSize({ width: 2, height: cursorHeight })
                setCursorType('text')
            } else {
                setDynamicSize({ width: 40, height: 40 })
                setCursorType('default')
            }
        }

        const onMouseOut = (e: MouseEvent) => {
            if (!e.relatedTarget) {
                setCursorType('default')
                setDynamicSize({ width: 40, height: 40 })
                setLabel('')
            }
        }

        document.addEventListener('mouseover', onMouseOver, true)
        document.addEventListener('mouseout', onMouseOut, true)

        return () => {
            window.removeEventListener('mousemove', move)
            cancelAnimationFrame(rafRef.current)
            document.removeEventListener('mouseover', onMouseOver, true)
            document.removeEventListener('mouseout', onMouseOut, true)
        }
    }, [])

    return (
        <div ref={cursorRef} className="custom-cursor" style={{ transform: 'translate(-100px, -100px)' }}>
            <div
                ref={circleRef}
                className={`cursor-circle ${cursorType === 'hover' ? 'cursor-hover' : ''} ${cursorType === 'text' ? 'cursor-text' : ''}`}
                style={{
                    width: `${dynamicSize.width}px`,
                    height: `${dynamicSize.height}px`,
                }}
            >
                <span className="cursor-label">{label}</span>
            </div>
        </div>
    )
}
