'use client'

import { AlertCircle, BookOpen, CheckCircle, FileText, Lightbulb, RefreshCw, Star, Target } from 'lucide-react'
import { useState } from 'react'
import { SentenceContextDisplay } from './SentenceContextDisplay'

interface AnalysisTabsProps {
  suggestedSentence: string
  context: string
  analysis: any // nhận đúng kiểu từ API mới
}

export function AnalysisTabs({ suggestedSentence, context, analysis }: AnalysisTabsProps) {
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
      <div className='inline-flex h-10 w-fit items-center justify-center rounded-md bg-gray-100 px-2 py-1 text-gray-500'>
        {['overview', 'vocabulary', 'grammar', 'content', 'paraphrase'].map((tab) => (
          <button
            key={tab}
            className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
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
        {activeTab === 'overview' && (
          <SentenceContextDisplay
            suggestedSentence={suggestedSentence}
            context={context}
          />
        )}

        {/* Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <BookOpen className='h-4 w-4' />
                  Vocabulary Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                {analysis?.vocabulary_analysis ? (
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
                    {Array.isArray(analysis.vocabulary_analysis.context_relevance) &&
                      analysis.vocabulary_analysis.context_relevance.length > 0 && (
                        <div>
                          <p className='mb-2 text-sm font-medium text-gray-800'>Context Relevance:</p>
                          <ul className='space-y-2'>
                            {analysis.vocabulary_analysis.context_relevance.map((item: string, idx: number) => (
                              <li key={idx} className='flex items-start gap-2 text-sm text-gray-700'>
                                <Target className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    {Array.isArray(analysis.vocabulary_analysis.word_choice_quality) &&
                      analysis.vocabulary_analysis.word_choice_quality.length > 0 && (
                        <div>
                          <p className='mb-2 text-sm font-medium text-gray-800'>Word Choice Quality:</p>
                          <ul className='space-y-2'>
                            {analysis.vocabulary_analysis.word_choice_quality.map((item: string, idx: number) => (
                              <li key={idx} className='flex items-start gap-2 text-sm text-gray-700'>
                                <AlertCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500' />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className='text-gray-500'>No vocabulary analysis available.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Grammar Tab */}
        {activeTab === 'grammar' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <CheckCircle className='h-4 w-4' />
                  Grammar Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                {analysis?.grammar_analysis ? (
                  <div className='space-y-3'>
                    <div>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Suggested Correctness:</p>
                      <div className='flex items-center gap-2 rounded bg-green-50 p-3 text-sm text-green-700'>
                        <CheckCircle className='h-4 w-4' />
                        {analysis.grammar_analysis.suggested_correctness}
                      </div>
                    </div>
                    {Array.isArray(analysis.grammar_analysis.sentence_structure) &&
                      analysis.grammar_analysis.sentence_structure.length > 0 && (
                        <div>
                          <p className='mb-2 text-sm font-medium text-gray-800'>Sentence Structure:</p>
                          <ul className='space-y-2'>
                            {analysis.grammar_analysis.sentence_structure.map((item: string, idx: number) => (
                              <li key={idx} className='flex items-start gap-2 text-sm text-gray-700'>
                                <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500' />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    {Array.isArray(analysis.grammar_analysis.tense_consistency) &&
                      analysis.grammar_analysis.tense_consistency.length > 0 && (
                        <div>
                          <p className='mb-2 text-sm font-medium text-gray-800'>Tense Consistency:</p>
                          <ul className='space-y-2'>
                            {analysis.grammar_analysis.tense_consistency.map((item: string, idx: number) => (
                              <li key={idx} className='flex items-start gap-2 text-sm text-gray-700'>
                                <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500' />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className='text-gray-500'>No grammar analysis available.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <FileText className='h-4 w-4' />
                  Content & Coherence Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                {analysis?.content_analysis ? (
                  <div className='space-y-3'>
                    <div>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Context Continuity:</p>
                      <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                        {analysis.content_analysis.context_continuity}
                      </div>
                    </div>
                    <div>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Logical Progression:</p>
                      <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                        {analysis.content_analysis.logical_progression}
                      </div>
                    </div>
                    {Array.isArray(analysis.content_analysis.topic_relevance) &&
                      analysis.content_analysis.topic_relevance.length > 0 && (
                        <div>
                          <p className='mb-2 text-sm font-medium text-gray-800'>Topic Relevance:</p>
                          <ul className='space-y-2'>
                            {analysis.content_analysis.topic_relevance.map((item: string, idx: number) => (
                              <li key={idx} className='flex items-start gap-2 text-sm text-gray-700'>
                                <Target className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    <div>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Meaning Clarity:</p>
                      <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                        {analysis.content_analysis.meaning_clarity}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='text-gray-500'>No content analysis available.</div>
                )}
                {analysis?.coherence_analysis && (
                  <div className='space-y-3'>
                    <div>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Tone Consistency:</p>
                      <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                        {analysis.coherence_analysis.tone_consistency}
                      </div>
                    </div>
                    <div>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Narrative Flow:</p>
                      <div className='rounded bg-gray-50 p-3 text-sm text-gray-700'>
                        {analysis.coherence_analysis.narrative_flow}
                      </div>
                    </div>
                    {Array.isArray(analysis.coherence_analysis.readability_assessment) &&
                      analysis.coherence_analysis.readability_assessment.length > 0 && (
                        <div>
                          <p className='mb-2 text-sm font-medium text-gray-800'>Readability Assessment:</p>
                          <ul className='space-y-2'>
                            {analysis.coherence_analysis.readability_assessment.map((item: string, idx: number) => (
                              <li key={idx} className='flex items-start gap-2 text-sm text-gray-700'>
                                <Target className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    <div>
                      <p className='mb-1 text-sm font-medium text-gray-800'>Overall Rating:</p>
                      <div className='flex items-center gap-2'>
                        <span className='inline-flex items-center rounded-full border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                          {analysis.coherence_analysis.overall_rating}
                        </span>
                        {renderStars(analysis.coherence_analysis.overall_rating)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Paraphrase Tab */}
        {activeTab === 'paraphrase' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <Lightbulb className='h-4 w-4' />
                  Contextual Suggestions
                </h3>
              </div>
              <div className='space-y-4 px-6 pb-6'>
                {Array.isArray(analysis?.contextual_suggestions) && analysis.contextual_suggestions.length > 0 ? (
                  analysis.contextual_suggestions.map((item: any, idx: number) => (
                    <div key={idx} className='mb-4'>
                      <div className='rounded border-l-4 border-green-500 bg-green-50 p-3'>
                        <p className='mb-1 text-sm font-medium text-green-800'>Suggested Sentence:</p>
                        <p className='text-sm text-green-700'>"{item.sentence}"</p>
                      </div>
                      <div className='rounded bg-blue-50 p-3'>
                        <p className='mb-1 text-sm font-medium text-blue-800'>Explanation:</p>
                        <p className='text-sm text-blue-700'>{item.explanation}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-gray-500'>No contextual suggestions available.</div>
                )}
              </div>
            </div>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='px-6 py-4 pb-3'>
                <h3 className='flex items-center gap-2 text-lg text-sm leading-none font-semibold tracking-tight'>
                  <RefreshCw className='h-4 w-4' />
                  Style Variations
                </h3>
              </div>
              <div className='space-y-3 px-6 pb-6'>
                {Array.isArray(analysis?.style_variations) && analysis.style_variations.length > 0 ? (
                  analysis.style_variations.map((item: any, idx: number) => (
                    <div key={idx} className='mb-4'>
                      <div className='rounded border-l-4 border-purple-500 bg-purple-50 p-3'>
                        <p className='mb-1 text-sm font-medium text-purple-800'>Suggested Sentence:</p>
                        <p className='text-sm text-purple-700'>"{item.sentence}"</p>
                      </div>
                      <div className='rounded bg-gray-50 p-3'>
                        <p className='mb-1 text-sm font-medium text-gray-800'>Explanation:</p>
                        <p className='text-sm text-gray-700'>{item.explanation}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-gray-500'>No style variations available.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
