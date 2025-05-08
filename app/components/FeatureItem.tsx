export default function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start">
      <div className="mt-1 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full p-1 flex-shrink-0 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-slate-200">{text}</span>
    </li>
  )
} 