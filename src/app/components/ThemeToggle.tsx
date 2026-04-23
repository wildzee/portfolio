'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        const prefersDark = saved ? saved === 'dark' : true
        setIsDark(prefersDark)
        document.documentElement.classList.toggle('dark', prefersDark)
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        document.documentElement.classList.toggle('dark', isDark)
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark, mounted])

    if (!mounted) return null

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 flex items-center justify-center rounded-full border text-lg hover:text-primary transition-all"
            style={{ borderColor: 'var(--border)' }}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <i className="bx bx-sun" />
            ) : (
                <i className="bx bx-moon" />
            )}
        </button>
    )
}
