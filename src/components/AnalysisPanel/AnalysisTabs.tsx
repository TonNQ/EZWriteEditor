'use client'

import { useState } from 'react'
import type { DetailedAnalysis } from '../../types/analysis.type'
import { BookOpen, CheckCircle, FileText, Target, Lightbulb, RefreshCw, Star, AlertCircle } from 'lucide-react'
import { SentenceContextDisplay } from './SentenceContextDisplay'

interface AnalysisTabsProps {
  originalSentence: string
  suggestedSentence: string
  context: string
  analysis: DetailedAnalysis
}

export function AnalysisTabs({ originalSentence, suggestedSentence, context, analysis }: AnalysisTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const getComplexityColor = (level: string) => {
    const lowerLevel = level.toLowerCase()
    if (lowerLevel.includes('basic') || lowerLevel.includes('cơ bản')) {
      return 'bg-green-100 text-green-800 border-green-200'
    }
    if (lowerLevel.includes('intermediate') || lowerLevel.includes('trung cấp')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    if (lowerLevel.includes('advanced') || lowerLevel.includes('nâng cao')) {
      return 'bg-red-100 text-red-800 border-red-200'
    }
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const renderStars = (rating: string) => {
    const numericRating = Number.parseInt(rating.split('/')[0])
    return (
      <div className='flex items-center'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= numericRating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='w-full'>
      {/* Tab Navigation */}
      <div className='inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500'>
        {['overview', 'paraphrase', 'vocab', 'grammar', 'content'].map((tab) => (
          <button
            key={tab}
            className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
              activeTab === tab ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='mt-4 text-left'>
        {/* Overview Tab */}
        {activeTab === 'overview' && analysis && (
          <SentenceContextDisplay
            originalSentence={originalSentence}
            suggestedSentence={suggestedSentence}
            context={context}
          />
        )}

        {/* Improvement Suggestions Tab */}
        {activeTab === 'paraphrase' && analysis && (
          <div className='space-y-4'>
            {/* Suggested Sentences */}
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <Lightbulb className='h-4 w-4' />
                  Improvement Suggestions
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                {analysis.improvement_suggestions.map((suggestion, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='rounded border-l-4 border-green-500 bg-green-50 p-3'>
                      <p className='mb-1 text-sm font-medium text-green-800'>Suggested Sentence:</p>
                      <p className='text-sm text-green-700'>"{suggestion.revised_sentence}"</p>
                    </div>
                    <div className='rounded bg-blue-50 p-3'>
                      <p className='mb-1 text-sm font-medium text-blue-800'>Analysis:</p>
                      <p className='text-sm text-blue-700'>{suggestion.explanation}</p>
                    </div>
                    {index < analysis.improvement_suggestions.length - 1 && (
                      <div className='my-3 h-px w-full shrink-0 bg-gray-200' />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Paraphrasing Options */}
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <RefreshCw className='h-4 w-4' />
                  Paraphrasing Options
                </h3>
              </div>
              <div className='space-y-3 px-6 pb-6'>
                {analysis.paraphrasing_options.map((option, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getComplexityColor(
                          option.complexity_level
                        )}`}
                      >
                        {option.complexity_level}
                      </span>
                    </div>
                    <div className='rounded border-l-4 border-purple-500 bg-purple-50 p-3'>
                      <p className='mb-1 text-sm font-medium text-purple-800'>Suggested Sentence:</p>
                      <p className='text-sm text-purple-700'>"{option.sentence}"</p>
                    </div>
                    <div className='rounded bg-gray-50 p-3'>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Analysis:</p>
                      <p className='text-sm text-gray-700'>{option.explanation}</p>
                    </div>
                    {index < analysis.paraphrasing_options.length - 1 && (
                      <div className='my-3 h-px w-full shrink-0 bg-gray-200' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Vocabulary Analysis Tab */}
        {activeTab === 'vocab' && analysis && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <BookOpen className='h-4 w-4' />
                  Vocabulary Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                <div className='space-y-3'>
                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Level Assessment:</p>
                    <span className='inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'>
                      {analysis.vocabulary_analysis.level_assessment}
                    </span>
                  </div>

                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Appropriateness:</p>
                    <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                      {analysis.vocabulary_analysis.appropriateness}
                    </div>
                  </div>

                  {analysis.vocabulary_analysis.improvements.length > 0 && (
                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Improvements:</p>
                      <ul className='space-y-2'>
                        {analysis.vocabulary_analysis.improvements.map((improvement, index) => (
                          <li key={index} className='flex items-start gap-2 text-sm text-gray-700'>
                            <AlertCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500' />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.vocabulary_analysis.differences.length > 0 && (
                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Key Differences:</p>
                      <ul className='space-y-2'>
                        {analysis.vocabulary_analysis.differences.map((difference, index) => (
                          <li key={index} className='flex items-start gap-2 text-sm text-gray-700'>
                            <Target className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                            {difference}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grammar Analysis Tab */}
        {activeTab === 'grammar' && analysis && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <CheckCircle className='h-4 w-4' />
                  Grammar Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Original Correctness:</p>
                    <div className='flex items-center gap-2 rounded bg-green-50 p-3 text-sm text-green-700'>
                      <CheckCircle className='h-4 w-4' />
                      {analysis.grammar_analysis.original_correctness}
                    </div>
                  </div>

                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Suggested Correctness:</p>
                    <div className='flex items-center gap-2 rounded bg-green-50 p-3 text-sm text-green-700'>
                      <CheckCircle className='h-4 w-4' />
                      {analysis.grammar_analysis.suggested_correctness}
                    </div>
                  </div>

                  {analysis.grammar_analysis.additional_suggestions.length > 0 && (
                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Additional Suggestions:</p>
                      <ul className='space-y-2'>
                        {analysis.grammar_analysis.additional_suggestions.map((suggestion, index) => (
                          <li key={index} className='flex items-start gap-2 text-sm text-gray-700'>
                            <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500' />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Analysis Tab */}
        {activeTab === 'content' && analysis && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <FileText className='h-4 w-4' />
                  Content & Coherence Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                <div className='space-y-4'>
                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Relevance:</p>
                    <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                      {analysis.content_analysis.relevance}
                    </div>
                  </div>

                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Logical Flow:</p>
                    <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                      {analysis.content_analysis.logical_flow}
                    </div>
                  </div>

                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Accuracy:</p>
                    <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                      {analysis.content_analysis.accuracy}
                    </div>
                  </div>

                  <div>
                    <p className='mb-1 text-sm font-medium text-gray-800'>Overall Rating:</p>
                    <div className='flex items-center gap-2'>
                      <span className='inline-flex items-center rounded-full border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                        {analysis.coherence_analysis.overall_rating}
                      </span>
                      {renderStars(analysis.coherence_analysis.overall_rating)}
                    </div>
                  </div>

                  {analysis.coherence_analysis.readability_improvements.length > 0 && (
                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Readability Improvements:</p>
                      <ul className='space-y-2'>
                        {analysis.coherence_analysis.readability_improvements.map((improvement, index) => (
                          <li key={index} className='flex items-start gap-2 text-sm text-gray-700'>
                            <Target className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
