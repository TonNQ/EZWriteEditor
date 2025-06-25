export interface SentenceAnalysis {
  id: string
  text: string
  basicInfo: {
    wordCount: number
    complexity: 'Simple' | 'Medium' | 'Complex'
    readingLevel: string
  }
  grammar: {
    subject: string
    predicate: string
    object?: string
    type: string
  }
  wordAnalysis: {
    nouns: number
    verbs: number
    adjectives: number
    adverbs: number
  }
  styleMetrics: {
    readabilityScore: number
    sentenceVariety: 'Poor' | 'Good' | 'Excellent'
    passiveVoice: boolean
  }
  suggestions: string[]
}

export interface DetailedAnalysis {
  vocabulary_analysis: {
    level_assessment: string
    appropriateness: string
    improvements: string[]
    differences: string[]
  }
  grammar_analysis: {
    original_correctness: string
    suggested_correctness: string
    issues_identified: string[]
    improvements_made: string[]
    additional_suggestions: string[]
  }
  content_analysis: {
    relevance: string
    logical_flow: string
    clarity_improvements: string[]
    accuracy: string
  }
  coherence_analysis: {
    tone_consistency: string
    flow_connection: string
    readability_improvements: string[]
    overall_rating: string
  }
  improvement_suggestions: Array<{
    revised_sentence: string
    explanation: string
  }>
  paraphrasing_options: Array<{
    sentence: string
    complexity_level: string
    explanation: string
  }>
}

export interface MultiLanguageAnalysis {
  en: DetailedAnalysis
  vi: DetailedAnalysis
}

export type AnalysisLanguage = 'en' | 'vi'

export type SupportedModel = 'gpt-3.5-turbo' | 'gpt-4o' | 'gpt-4o-mini'

// Types for individual explain APIs
export interface VocabularySuggestion {
  explanation: string
  sentence: string
  complexity: 'basic' | 'intermediate' | 'advanced'
}

export interface VocabularyAnalysis {
  level_assessment: string
  appropriateness: string
  context_relevance: string[]
  word_choice_quality: string[]
  suggestions: VocabularySuggestion[]
}

export interface GrammarSuggestion {
  explanation: string
  sentence: string
  complexity: 'basic' | 'intermediate' | 'advanced'
}

export interface GrammarAnalysis {
  suggested_correctness: string
  context_flow: string
  sentence_structure: string[]
  tense_consistency: string[]
  suggestions: GrammarSuggestion[]
}

export interface ContentSuggestion {
  explanation: string
  sentence: string
  complexity: 'basic' | 'intermediate' | 'advanced'
}

export interface ContentAnalysis {
  context_continuity: string
  logical_progression: string
  topic_relevance: string[]
  meaning_clarity: string
  suggestions: ContentSuggestion[]
}

export interface StyleVariation {
  explanation: string
  sentence: string
  complexity: 'basic' | 'intermediate' | 'advanced'
}

export interface ParaphraseAnalysis {
  style_variations: StyleVariation[]
  paraphrase_quality: string
  diversity_assessment: string
  complexity_range: ('basic' | 'intermediate' | 'advanced')[]
}

// API Response types
export type VocabularyApiResponse = {
  analysis: {
    en: VocabularyAnalysis | null
    vi: VocabularyAnalysis | null
  }
  [key: string]: any
}

export type GrammarApiResponse = {
  analysis: {
    en: GrammarAnalysis | null
    vi: GrammarAnalysis | null
  }
  [key: string]: any
}

export type ContentApiResponse = {
  analysis: {
    en: ContentAnalysis | null
    vi: ContentAnalysis | null
  }
  [key: string]: any
}

export type ParaphraseApiResponse = {
  analysis: {
    en: ParaphraseAnalysis | null
    vi: ParaphraseAnalysis | null
  }
  [key: string]: any
}
