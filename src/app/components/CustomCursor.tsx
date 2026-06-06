'use client'

import { useRef, useState, useEffect } from 'react'

const LERP = 0.35

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const [label, setLabel] = useState('')
    const [cursorType, setCursorType] = useState<'default' | 'hover' | 'text'>('default')
    const [dynamicSize, setDynamicSize] = useState({ width: 40, height: 40 })
    const [visible, setVisible] = useState(false)
    const posRef = useRef({ x: -100, y: -100 })
    const curPosRef = useRef({ x: -100, y: -100 })
    const rafRef = useRef<number>(0)
    const lastMoveRef = useRef(0)
    const visibleRef = useRef(false)
    const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return

        const tick = () => {
            const cp = curPosRef.current
            const { x, y } = posRef.current
            const dx = x - cp.x
            const dy = y - cp.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const idle = performance.now() - lastMoveRef.current > 100

            if (idle && dist < 0.5) {
                // cursor settled — stop the loop until next mousemove
                rafRef.current = 0
                return
            }

            if (dist > 80) {
                cp.x = x
                cp.y = y
            } else {
                cp.x += dx * LERP
                cp.y += dy * LERP
            }
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cp.x}px, ${cp.y}px)`
            }
            rafRef.current = requestAnimationFrame(tick)
        }

        const move = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY }
            lastMoveRef.current = performance.now()
            if (!visibleRef.current) {
                visibleRef.current = true
                setVisible(true)
            }
            // restart the loop if it self-paused
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        rafRef.current = requestAnimationFrame(tick)
        window.addEventListener('mousemove', move)

        const onMouseLeaveWindow = () => {
            visibleRef.current = false
            setVisible(false)
        }
        const onMouseEnterWindow = () => {
            visibleRef.current = true
            setVisible(true)
        }
        document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow)
        document.documentElement.addEventListener('mouseenter', onMouseEnterWindow)

        const onMouseOver = (e: MouseEvent) => {
            if (!(e.target instanceof Element)) return
            const target = e.target as HTMLElement

            // Fast path: data-cursor elements — synchronous, no layout queries
            const el = target.closest('[data-cursor]')
            if (el) {
                const tag = (el as HTMLElement).tagName
                if (tag === 'INPUT' || tag === 'TEXTAREA') {
                    const fontSize = parseFloat(window.getComputedStyle(el as HTMLElement).fontSize) || 16
                    const cursorHeight = Math.max(20, Math.min(120, fontSize * 1.4))
                    setLabel('')
                    setDynamicSize({ width: 2, height: cursorHeight })
                    setCursorType('text')
                    return
                }
                setLabel(el.getAttribute('data-cursor') || '')
                const rect = el.getBoundingClientRect()
                const size = Math.max(50, Math.min(90, Math.min(rect.width, rect.height) * 0.6))
                setDynamicSize({ width: size, height: size })
                setCursorType('hover')
                return
            }

            setLabel('')

            // Debounce the expensive text-detection path (caretPositionFromPoint forces layout)
            if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
            const capturedX = e.clientX
            const capturedY = e.clientY
            typeTimerRef.current = setTimeout(() => {
                const computedStyle = window.getComputedStyle(target)
                const isTextTag = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'LABEL'].includes(target.tagName)
                const hasTextCursorCss = computedStyle.cursor === 'text'

                if (!isTextTag && !hasTextCursorCss) {
                    setDynamicSize({ width: 30, height: 30 })
                    setCursorType('default')
                    return
                }

                let isOverText = false
                if (document.caretPositionFromPoint) {
                    const pos = document.caretPositionFromPoint(capturedX, capturedY)
                    if (pos?.offsetNode?.nodeType === Node.TEXT_NODE) {
                        const range = document.createRange()
                        range.selectNodeContents(pos.offsetNode)
                        const rects = Array.from(range.getClientRects())
                        isOverText = rects.some(r =>
                            capturedX >= r.left && capturedX <= r.right &&
                            capturedY >= r.top && capturedY <= r.bottom
                        )
                    }
                } else if (document.caretRangeFromPoint) {
                    const r = document.caretRangeFromPoint(capturedX, capturedY)
                    if (r?.startContainer?.nodeType === Node.TEXT_NODE) isOverText = true
                }

                if (isOverText) {
                    const fontSize = parseFloat(computedStyle.fontSize) || 16
                    const cursorHeight = Math.max(20, Math.min(120, fontSize * 1.4))
                    setDynamicSize({ width: 2, height: cursorHeight })
                    setCursorType('text')
                } else {
                    setDynamicSize({ width: 30, height: 30 })
                    setCursorType('default')
                }
            }, 50)
        }

        const onMouseOut = (e: MouseEvent) => {
            if (!e.relatedTarget) {
                if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
                setCursorType('default')
                setDynamicSize({ width: 30, height: 30 })
                setLabel('')
            }
        }

        document.addEventListener('mouseover', onMouseOver, true)
        document.addEventListener('mouseout', onMouseOut, true)

        return () => {
            window.removeEventListener('mousemove', move)
            cancelAnimationFrame(rafRef.current)
            if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
            document.removeEventListener('mouseover', onMouseOver, true)
            document.removeEventListener('mouseout', onMouseOut, true)
            document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow)
            document.documentElement.removeEventListener('mouseenter', onMouseEnterWindow)
        }
    }, [])

    return (
        <div ref={cursorRef} className={`custom-cursor${visible ? ' cursor-visible' : ''}`} style={{ transform: 'translate(-100px, -100px)' }}>
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
