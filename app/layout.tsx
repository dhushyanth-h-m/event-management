import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Event Management Platform',
  description: 'Real-time event management platform built with Next.js, React, MongoDB, WebSockets, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-b from-slate-900 to-slate-950 text-white min-h-screen`}>
        <div className="flex flex-col min-h-screen relative z-0">
          <header className="border-b border-slate-800/60 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-bold text-xl text-white">EventHub</span>
                  </Link>
                </div>
                <nav>
                  <ul className="flex space-x-1 sm:space-x-6">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <NavLink href="/events">Events</NavLink>
                    <NavLink href="/admin">Admin</NavLink>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-grow relative z-10">
            {children}
          </main>
          
          <footer className="border-t border-slate-800/60 py-8 mt-12 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <Link href="/" className="flex items-center space-x-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-600/80 to-slate-700/80 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-lg text-white">EventHub</span>
                  </Link>
                </div>
                <div className="text-center md:text-right text-slate-400 text-sm">
                  <p className="mb-1">© 2025 Event Management Platform</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-800/50 hover:text-slate-300 relative group"
      >
        {children}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-slate-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
      </Link>
    </li>
  )
} 