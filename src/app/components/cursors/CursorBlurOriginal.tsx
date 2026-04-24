'use client'

import { useRef, useState, useEffect } from 'react'

const LERP = 0.35

export default function CursorBlurOriginal() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [label, setLabel] = useState('')
    const [cursorType, setCursorType] = useState<'default' | 'hover' | 'text'>('default')
    const [dynamicSize, setDynamicSize] = useState({ width: 28, height: 28 })
    const [visible, setVisible] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const posRef = useRef({ x: -100, y: -100 })
    const curPosRef = useRef({ x: -100, y: -100 })
    const rafRef = useRef<number>(0)
    const lastMoveRef = useRef(0)

    useEffect(() => {
        const html = document.documentElement
        setIsDark(html.classList.contains('dark'))
        const observer = new MutationObserver(() => {
            setIsDark(html.classList.contains('dark'))
        })
        observer.observe(html, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return

        const move = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY }
            lastMoveRef.current = performance.now()
            setVisible(true)
        }

        const tick = () => {
            const cp = curPosRef.current
            const { x, y } = posRef.current
            const idle = performance.now() - lastMoveRef.current > 16
            if (idle) { cp.x = x; cp.y = y }
            else { cp.x += (x - cp.x) * LERP; cp.y += (y - cp.y) * LERP }
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cp.x}px, ${cp.y}px)`
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        window.addEventListener('mousemove', move)

        const onLeave = () => setVisible(false)
        const onEnter = () => setVisible(true)
        document.documentElement.addEventListener('mouseleave', onLeave)
        document.documentElement.addEventListener('mouseenter', onEnter)

        const onMouseOver = (e: MouseEvent) => {
            if (!(e.target instanceof Element)) return
            const target = e.target as HTMLElement

            if (target.closest('[data-cursor-small]')) {
                setLabel('')
                setDynamicSize({ width: 52, height: 52 })
                setCursorType('default')
                return
            }

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

            if (target.closest('[data-cursor-ignore-text]')) {
                setDynamicSize({ width: 28, height: 28 })
                setCursorType('default')
                return
            }

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
                    isOverText = Array.from(range.getClientRects()).some(rect =>
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
                setDynamicSize({ width: 28, height: 28 })
                setCursorType('default')
            }
        }

        const onMouseOut = (e: MouseEvent) => {
            if (!e.relatedTarget) {
                setCursorType('default')
                setDynamicSize({ width: 28, height: 28 })
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
            document.documentElement.removeEventListener('mouseleave', onLeave)
            document.documentElement.removeEventListener('mouseenter', onEnter)
        }
    }, [])

    const isText = cursorType === 'text'
    const isHover = cursorType === 'hover'

    const glassBase = isDark
        ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)'
        : 'linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)'

    const glassHover = isDark
        ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)'
        : 'linear-gradient(135deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 100%)'

    const borderBase = isDark
        ? '1px solid rgba(255,255,255,0.25)'
        : '1px solid rgba(0,0,0,0.15)'

    const borderHover = isDark
        ? '1px solid rgba(255,255,255,0.35)'
        : '1px solid rgba(0,0,0,0.22)'

    const insetShine = isDark
        ? 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 12px rgba(0,0,0,0.08)'
        : 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 12px rgba(0,0,0,0.06)'

    return (
        <div
            ref={cursorRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 99999,
                opacity: visible ? 1 : 0,
                transform: 'translate(-100px, -100px)',
                transition: 'opacity 0.3s ease',
            }}
        >
            <div
                style={{
                    width: `${dynamicSize.width}px`,
                    height: `${dynamicSize.height}px`,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: isText ? '3px' : '50%',
                    transition: 'width 0.3s cubic-bezier(0.2,1,0.3,1), height 0.3s cubic-bezier(0.2,1,0.3,1), border-radius 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                    border: isText ? 'none' : isHover ? borderHover : borderBase,
                    background: isText ? 'var(--primary)' : isHover ? glassHover : glassBase,
                    backdropFilter: isText ? 'none' : 'blur(3px) saturate(1.4)',
                    WebkitBackdropFilter: isText ? 'none' : 'blur(3px) saturate(1.4)',
                    boxShadow: isText ? 'none' : insetShine,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--background)',
                    opacity: isHover && label ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                    fontFamily: 'var(--font-syne, sans-serif)',
                }}>
                    {label}
                </span>
            </div>
        </div>
    )
}
