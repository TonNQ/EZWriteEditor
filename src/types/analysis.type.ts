export interface SentenceAnalysis {
  id: string
  text: string
  basicInfo: {
    wordCount: number
    complexity: "Simple" | "Medium" | "Complex"
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
    sentenceVariety: "Poor" | "Good" | "Excellent"
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

export type AnalysisLanguage = "en" | "vi"

export type SupportedModel = "gpt-3.5-turbo" | "gpt-4o" | "gpt-4o-mini"
