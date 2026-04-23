'use client'

import { useRef, useState, useEffect } from 'react'

const LERP = 0.2

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

    useEffect(() => {
        const move = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY }
            setVisible(true)
        }
        const tick = () => {
            const cp = curPosRef.current
            const { x, y } = posRef.current
            cp.x += (x - cp.x) * LERP
            cp.y += (y - cp.y) * LERP
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cp.x}px, ${cp.y}px)`
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        window.addEventListener('mousemove', move)

        const onMouseLeaveWindow = () => setVisible(false)
        const onMouseEnterWindow = () => setVisible(true)
        document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow)
        document.documentElement.addEventListener('mouseenter', onMouseEnterWindow)

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

            const isTextTag = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'LABEL'].includes(target.tagName)
            const hasTextCursorCss = computedStyle.cursor === 'text'

            let isOverText = false

            if (isTextTag || hasTextCursorCss) {
                let textNode: Node | null = null
                if (document.caretPositionFromPoint) {
                    const pos = document.caretPositionFromPoint(e.clientX, e.clientY)
                    if (pos?.offsetNode?.nodeType === Node.TEXT_NODE) textNode = pos.offsetNode
                } else if (document.caretRangeFromPoint) {
                    const r = document.caretRangeFromPoint(e.clientX, e.clientY)
                    if (r?.startContainer?.nodeType === Node.TEXT_NODE) textNode = r.startContainer
                }

                if (textNode) {
                    const range = document.createRange()
                    range.selectNodeContents(textNode)
                    const rects = Array.from(range.getClientRects())
                    isOverText = rects.some(rect =>
                        e.clientX >= rect.left && e.clientX <= rect.right &&
                        e.clientY >= rect.top && e.clientY <= rect.bottom
                    )
                }
            }

            if (isOverText) {
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
