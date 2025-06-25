'use client'

import { AlertCircle, BookOpen, CheckCircle, FileText, Lightbulb, Target } from 'lucide-react'
import { useState } from 'react'
import type {
  ContentAnalysis,
  GrammarAnalysis,
  ParaphraseAnalysis,
  VocabularyAnalysis
} from '../../types/analysis.type'
import { SentenceContextDisplay } from './SentenceContextDisplay'

interface AnalysisTabsProps {
  suggestedSentence: string
  context: string
  vocabulary: VocabularyAnalysis | null
  grammar: GrammarAnalysis | null
  content: ContentAnalysis | null
  paraphrase: ParaphraseAnalysis | null
}

export function AnalysisTabs({
  suggestedSentence,
  context,
  vocabulary,
  grammar,
  content,
  paraphrase
}: AnalysisTabsProps) {
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

  return (
    <div className='w-full'>
      {/* Tab Navigation - giữ nguyên style gốc */}
      <div className='inline-flex h-10 w-fit items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500'>
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
        {activeTab === 'overview' && <SentenceContextDisplay suggestedSentence={suggestedSentence} context={context} />}

        {/* Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='border-b border-gray-100 px-6 py-4'>
                <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
                  <BookOpen className='h-4 w-4 text-gray-600' />
                  Vocabulary Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 py-4'>
                {vocabulary ? (
                  <div className='space-y-4'>
                    <div>
                      <p className='mb-3 text-sm font-medium text-gray-800'>Level Assessment:</p>
                      <div className='rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
                        <div className='mb-2 flex items-center gap-3'>
                          <span className='inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800'>
                            Assessment Result
                          </span>
                        </div>
                        <p className='text-sm leading-relaxed text-gray-700'>{vocabulary.level_assessment}</p>
                      </div>
                    </div>

                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Appropriateness:</p>
                      <div className='rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
                        {vocabulary.appropriateness}
                      </div>
                    </div>

                    {Array.isArray(vocabulary.context_relevance) && vocabulary.context_relevance.length > 0 && (
                      <div>
                        <p className='mb-2 text-sm font-medium text-gray-800'>Context Relevance:</p>
                        <ul className='space-y-2'>
                          {vocabulary.context_relevance.map((item: string, idx: number) => (
                            <li
                              key={idx}
                              className='flex items-start gap-2 rounded-md border border-blue-100 bg-blue-50 p-2 text-sm text-gray-700'
                            >
                              <Target className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(vocabulary.word_choice_quality) && vocabulary.word_choice_quality.length > 0 && (
                      <div>
                        <p className='mb-2 text-sm font-medium text-gray-800'>Word Choice Quality:</p>
                        <ul className='space-y-2'>
                          {vocabulary.word_choice_quality.map((item: string, idx: number) => (
                            <li
                              key={idx}
                              className='flex items-start gap-2 rounded-md border border-orange-100 bg-orange-50 p-2 text-sm text-gray-700'
                            >
                              <AlertCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(vocabulary.suggestions) && vocabulary.suggestions.length > 0 && (
                      <div>
                        <p className='mb-3 text-sm font-medium text-gray-800'>Suggestions:</p>
                        <div className='space-y-4'>
                          {vocabulary.suggestions.map((suggestion, idx: number) => (
                            <div
                              key={idx}
                              className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'
                            >
                              {/* Header với complexity badge */}
                              <div className='border-b border-gray-200 bg-gray-50 px-4 py-2'>
                                <span
                                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getComplexityColor(suggestion.complexity)}`}
                                >
                                  {suggestion.complexity}
                                </span>
                              </div>

                              {/* Suggested Sentence */}
                              <div className='border-b border-blue-100 bg-blue-50 px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-blue-800 uppercase'>
                                  Suggested Sentence
                                </p>
                                <blockquote className='border-l-4 border-blue-400 pl-3 text-sm font-medium text-gray-900 italic'>
                                  "{suggestion.sentence}"
                                </blockquote>
                              </div>

                              {/* Explanation */}
                              <div className='px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase'>
                                  Explanation
                                </p>
                                <p className='text-sm leading-relaxed text-gray-700'>{suggestion.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='py-4 text-sm text-gray-500'>No vocabulary analysis available.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Grammar Tab */}
        {activeTab === 'grammar' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='border-b border-gray-100 px-6 py-4'>
                <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
                  <CheckCircle className='h-4 w-4 text-gray-600' />
                  Grammar Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 py-4'>
                {grammar ? (
                  <div className='space-y-4'>
                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Suggested Correctness:</p>
                      <div className='flex items-center gap-2 rounded-md border border-green-100 bg-green-50 p-3 text-sm text-green-700'>
                        <CheckCircle className='h-4 w-4 text-green-600' />
                        <span>{grammar.suggested_correctness}</span>
                      </div>
                    </div>

                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Context Flow:</p>
                      <div className='rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
                        {grammar.context_flow}
                      </div>
                    </div>

                    {Array.isArray(grammar.sentence_structure) && grammar.sentence_structure.length > 0 && (
                      <div>
                        <p className='mb-2 text-sm font-medium text-gray-800'>Sentence Structure:</p>
                        <ul className='space-y-2'>
                          {grammar.sentence_structure.map((item: string, idx: number) => (
                            <li
                              key={idx}
                              className='flex items-start gap-2 rounded-md border border-yellow-100 bg-yellow-50 p-2 text-sm text-gray-700'
                            >
                              <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(grammar.tense_consistency) && grammar.tense_consistency.length > 0 && (
                      <div>
                        <p className='mb-2 text-sm font-medium text-gray-800'>Tense Consistency:</p>
                        <ul className='space-y-2'>
                          {grammar.tense_consistency.map((item: string, idx: number) => (
                            <li
                              key={idx}
                              className='flex items-start gap-2 rounded-md border border-yellow-100 bg-yellow-50 p-2 text-sm text-gray-700'
                            >
                              <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(grammar.suggestions) && grammar.suggestions.length > 0 && (
                      <div>
                        <p className='mb-3 text-sm font-medium text-gray-800'>Suggestions:</p>
                        <div className='space-y-4'>
                          {grammar.suggestions.map((suggestion, idx: number) => (
                            <div
                              key={idx}
                              className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'
                            >
                              <div className='border-b border-gray-200 bg-gray-50 px-4 py-2'>
                                <span
                                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getComplexityColor(suggestion.complexity)}`}
                                >
                                  {suggestion.complexity}
                                </span>
                              </div>
                              <div className='border-b border-green-100 bg-green-50 px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-green-800 uppercase'>
                                  Suggested Sentence
                                </p>
                                <blockquote className='border-l-4 border-green-400 pl-3 text-sm font-medium text-gray-900 italic'>
                                  "{suggestion.sentence}"
                                </blockquote>
                              </div>
                              <div className='px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase'>
                                  Explanation
                                </p>
                                <p className='text-sm leading-relaxed text-gray-700'>{suggestion.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='py-4 text-sm text-gray-500'>No grammar analysis available.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='border-b border-gray-100 px-6 py-4'>
                <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
                  <FileText className='h-4 w-4 text-gray-600' />
                  Content & Coherence Analysis
                </h3>
              </div>
              <div className='space-y-4 px-6 py-4'>
                {content ? (
                  <div className='space-y-4'>
                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Context Continuity:</p>
                      <div className='rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
                        {content.context_continuity}
                      </div>
                    </div>

                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Logical Progression:</p>
                      <div className='rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
                        {content.logical_progression}
                      </div>
                    </div>

                    {Array.isArray(content.topic_relevance) && content.topic_relevance.length > 0 && (
                      <div>
                        <p className='mb-2 text-sm font-medium text-gray-800'>Topic Relevance:</p>
                        <ul className='space-y-2'>
                          {content.topic_relevance.map((item: string, idx: number) => (
                            <li
                              key={idx}
                              className='flex items-start gap-2 rounded-md border border-blue-100 bg-blue-50 p-2 text-sm text-gray-700'
                            >
                              <Target className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Meaning Clarity:</p>
                      <div className='rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
                        {content.meaning_clarity}
                      </div>
                    </div>

                    {Array.isArray(content.suggestions) && content.suggestions.length > 0 && (
                      <div>
                        <p className='mb-3 text-sm font-medium text-gray-800'>Suggestions:</p>
                        <div className='space-y-4'>
                          {content.suggestions.map((suggestion, idx: number) => (
                            <div
                              key={idx}
                              className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'
                            >
                              <div className='border-b border-gray-200 bg-gray-50 px-4 py-2'>
                                <span
                                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getComplexityColor(suggestion.complexity)}`}
                                >
                                  {suggestion.complexity}
                                </span>
                              </div>
                              <div className='border-b border-purple-100 bg-purple-50 px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-purple-800 uppercase'>
                                  Suggested Sentence
                                </p>
                                <blockquote className='border-l-4 border-purple-400 pl-3 text-sm font-medium text-gray-900 italic'>
                                  "{suggestion.sentence}"
                                </blockquote>
                              </div>
                              <div className='px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase'>
                                  Explanation
                                </p>
                                <p className='text-sm leading-relaxed text-gray-700'>{suggestion.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='py-4 text-sm text-gray-500'>No content analysis available.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Paraphrase Tab */}
        {activeTab === 'paraphrase' && (
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
              <div className='border-b border-gray-100 px-6 py-4'>
                <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
                  <Lightbulb className='h-4 w-4 text-gray-600' />
                  Style Variations
                </h3>
              </div>
              <div className='space-y-4 px-6 py-4'>
                {paraphrase ? (
                  <div className='space-y-4'>
                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Paraphrase Quality:</p>
                      <div className='rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
                        {paraphrase.paraphrase_quality}
                      </div>
                    </div>

                    <div>
                      <p className='mb-2 text-sm font-medium text-gray-800'>Diversity Assessment:</p>
                      <div className='rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
                        {paraphrase.diversity_assessment}
                      </div>
                    </div>

                    {Array.isArray(paraphrase.style_variations) && paraphrase.style_variations.length > 0 && (
                      <div>
                        <p className='mb-3 text-sm font-medium text-gray-800'>Style Variations:</p>
                        <div className='space-y-4'>
                          {paraphrase.style_variations.map((variation, idx: number) => (
                            <div
                              key={idx}
                              className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'
                            >
                              <div className='border-b border-gray-200 bg-gray-50 px-4 py-2'>
                                <span
                                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getComplexityColor(variation.complexity)}`}
                                >
                                  {variation.complexity}
                                </span>
                              </div>
                              <div className='border-b border-orange-100 bg-orange-50 px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-orange-800 uppercase'>
                                  Suggested Sentence
                                </p>
                                <blockquote className='border-l-4 border-orange-400 pl-3 text-sm font-medium text-gray-900 italic'>
                                  "{variation.sentence}"
                                </blockquote>
                              </div>
                              <div className='px-4 py-3'>
                                <p className='mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase'>
                                  Explanation
                                </p>
                                <p className='text-sm leading-relaxed text-gray-700'>{variation.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='py-4 text-sm text-gray-500'>No paraphrase analysis available.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
