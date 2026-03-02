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

    // To send emails using EmailJS safely from the server instead of exposing it to the browser, 
    // you must use their REST API and store your Public Key inside an Environment Variable (.env)

    /*
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_g9tmvkw',
        template_id: 'template_npjrat5',
        user_id: process.env.EMAILJS_PUBLIC_KEY, 
        template_params: { name, email, message }
      })
    })
  
    if (!response.ok) {
       throw new Error('Failed to send message')
    }
    */

    // Using a mock return for now, replacing the client-side EmailJS wrapper with a secure POST action
    return { success: true, message: 'Message sent securely via Server Actions!' }
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
