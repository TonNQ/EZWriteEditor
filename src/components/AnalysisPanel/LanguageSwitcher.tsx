import type { AnalysisLanguage } from '../../types/analysis.type'
import { Globe } from 'lucide-react'

interface LanguageSwitcherProps {
  currentLanguage: AnalysisLanguage
  onLanguageChange: (language: AnalysisLanguage) => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className='flex items-center gap-2 rounded-lg'>
      <Globe className='h-4 w-4 text-gray-500' />
      <span className='text-xs text-gray-600'>Language</span>
      <div className='flex rounded border border-gray-200 bg-white'>
        <button
          className={`h-6 rounded-l px-3 py-1 text-xs transition-colors ${
            currentLanguage === 'en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onLanguageChange('en')}
        >
          EN
        </button>
        <button
          className={`h-6 rounded-r border-l border-gray-200 px-3 py-1 text-xs transition-colors ${
            currentLanguage === 'vi' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onLanguageChange('vi')}
        >
          VI
        </button>
      </div>
    </div>
  )
}
