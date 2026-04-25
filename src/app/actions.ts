'use server'

import { cookies } from 'next/headers'

// Next.js Server Actions automatically verify the 'Origin' and 'Host' headers 
// for POST requests, providing built-in cross-site request forgery (CSRF) protection.

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    if (!name || !email || !message) {
        throw new Error('Missing fields')
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: { name, email, message }
        })
    })

    if (!response.ok) {
        const errText = await response.text()
        throw new Error(`EmailJS error ${response.status}: ${errText}`)
    }

    return { success: true }
}

// =========================================================================
// Example demonstrating how to make cookies Secure & HttpOnly in Next.js Server Actions
// =========================================================================
export async function setSecureSessionCookie() {
    const cookieStore = await cookies()
    cookieStore.set({
        name: 'my_secure_session',
        value: 'encrypted-token-value',
        httpOnly: true, // Prevents JavaScript from reading the cookie (protects against XSS)
        secure: process.env.NODE_ENV === 'production', // Cookie is only sent over HTTPS in production
        sameSite: 'strict', // Prevents CSRF by ensuring the cookie isn't sent cross-origin
        path: '/',
        maxAge: 86400 * 7 // 1 week
    })
}
