import Link from 'next/link'
import FeatureCard from './components/FeatureCard'
import FeatureItem from './components/FeatureItem'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient animate-pulse-subtle">
              Event Management Platform
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              A powerful platform for planning, managing, and executing successful events with real-time insights and collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events" className="btn-primary">
                Create Event
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/dashboard" className="btn-outline">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center text-gradient-alt">Manage Your Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              title="Live Dashboard" 
              description="Real-time metrics and event monitoring with interactive charts and notifications."
              link="/dashboard"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <FeatureCard 
              title="Event Management" 
              description="Create and manage your events with comprehensive tools for planning, scheduling, and execution."
              link="/events"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
            <FeatureCard 
              title="Admin Panel" 
              description="System administration and user management with role-based access control and detailed audit logs."
              link="/admin"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800/50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="md:w-1/2">
              <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-1 overflow-hidden shadow-xl">
                <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-opacity-80 text-sm animate-pulse">
                      Dashboard Preview
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold mb-6 text-gradient-alt">Platform Features</h2>
              <ul className="space-y-4">
                <FeatureItem text="Real-time updates using WebSockets" />
                <FeatureItem text="Comprehensive event management" />
                <FeatureItem text="Live dashboard with real-time metrics" />
                <FeatureItem text="Notification system with priority queuing" />
                <FeatureItem text="User and permission management" />
                <FeatureItem text="Advanced analytics and reporting" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to get started?</h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of event organizers who are already using our platform to create memorable experiences.
            </p>
            <Link href="/events" className="btn-primary">
              Start Managing Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 