import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // 1. Block unauthorized HTTP methods (MEGA Security Audit fix)
    // Only allow typical frontend rendering and form submission methods
    const allowedMethods = ['GET', 'POST', 'HEAD', 'OPTIONS']
    if (!allowedMethods.includes(request.method)) {
        return new NextResponse(`Method ${request.method} Not Allowed`, {
            status: 405,
            headers: {
                'Allow': allowedMethods.join(', ')
            }
        })
    }

    // 2. Generate a random nonce for the Content Security Policy
    // This acts as a single-use token to guarantee that only scripts/styles authorized 
    // by this server run, completely neutralizing XSS attacks using inline vectors.
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    // 3. Construct a strictly-scoped Content Security Policy (No 'unsafe-inline', No 'unsafe-eval')
    // We authorize EmailJS API connections and Stripe iframes explicitly.
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.stripe.com;
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com https://cdn.jsdelivr.net;
    font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net;
    img-src 'self' data: https:;
    connect-src 'self' https://api.emailjs.com;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    worker-src 'self' blob:;
    upgrade-insecure-requests;
  `

    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, ' ')
        .trim()

    // Clone the request headers and set the internal x-nonce 
    // so layout.tsx can read it via headers().get('x-nonce')
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

    // Pass control to Next.js routing with the updated headers
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    // Set the CSP on the actual browser response
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

    return response
}

// Ensure the middleware runs on all paths except static assets
export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}
