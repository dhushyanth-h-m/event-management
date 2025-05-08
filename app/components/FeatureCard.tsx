import Link from 'next/link';

export default function FeatureCard({ title, description, link, icon }: { 
  title: string; 
  description: string; 
  link: string;
  icon: React.ReactNode;
}) {
  return (
    <Link 
      href={link}
      className="group card card-hover bg-slate-800/80 backdrop-blur-sm"
    >
      <div className="p-4 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 mb-4 inline-block">
        <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">{title}</h3>
      <p className="text-slate-300 mb-4">{description}</p>
      <div className="mt-auto text-primary-400 font-medium flex items-center group-hover:text-primary-300 transition-colors">
        Explore 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  )
} 