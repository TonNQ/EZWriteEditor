import type { MultiLanguageAnalysis, SentenceAnalysis } from "../../../types/analysis.type"

export const sampleMultiLanguageAnalysis: MultiLanguageAnalysis = {
  vi: {
    vocabulary_analysis: {
      level_assessment: "Trung cấp",
      appropriateness: "Từ vựng trong cả hai câu đều phù hợp với ngữ cảnh về sức khỏe và thể dục.",
      improvements: [
        "Thay thế 'vital role' bằng 'crucial function' để tăng tính trang trọng.",
        "Thay thế 'reduces the risk' bằng 'mitigates the risk' để nâng cao tính chính xác.",
        "Sử dụng 'chronic diseases' thay vì 'chronic illnesses' để tăng tính chuyên môn.",
      ],
      differences: [
        "Câu gốc tập trung vào lợi ích thể chất của việc tập thể dục.",
        "Câu được đề xuất mở rộng thêm về lợi ích sức khỏe tổng thể, bao gồm cả hệ miễn dịch.",
      ],
    },
    grammar_analysis: {
      original_correctness: "Cả hai câu đều đúng ngữ pháp.",
      suggested_correctness: "Câu được đề xuất không có lỗi ngữ pháp.",
      issues_identified: [],
      improvements_made: [],
      additional_suggestions: [
        "Có thể chia câu dài thành hai câu ngắn hơn để tăng tính dễ hiểu.",
        "Sử dụng dấu phẩy để tách các phần trong câu phức tạp hơn.",
      ],
    },
    content_analysis: {
      relevance: "Cả hai câu đều liên quan chặt chẽ đến chủ đề sức khỏe và thể dục.",
      logical_flow: "Luồng logic từ câu gốc sang câu được đề xuất rất mạch lạc.",
      clarity_improvements: [
        "Thêm ví dụ cụ thể về các loại bệnh mãn tính để tăng tính rõ ràng.",
        "Sử dụng ngôn ngữ đơn giản hơn cho người đọc không chuyên.",
      ],
      accuracy: "Nội dung chính xác và phù hợp với các nghiên cứu về lợi ích của việc tập thể dục.",
    },
    coherence_analysis: {
      tone_consistency: "Giọng điệu nhất quán, chuyên nghiệp và nghiêm túc.",
      flow_connection: "Kết nối giữa hai câu rất tốt, tạo ra một bức tranh tổng thể về lợi ích của việc tập thể dục.",
      readability_improvements: [
        "Sử dụng câu ngắn hơn để tăng khả năng đọc hiểu.",
        "Thêm các từ nối để làm rõ mối quan hệ giữa các ý tưởng.",
      ],
      overall_rating: "9/10",
    },
    improvement_suggestions: [
      {
        revised_sentence:
          "Tập thể dục đóng vai trò thiết yếu trong việc duy trì lối sống lành mạnh, giúp tăng cường tim mạch, cơ bắp và xương khớp.",
        explanation: "Câu này sử dụng từ 'thiết yếu' để nhấn mạnh tầm quan trọng và cải thiện cấu trúc câu.",
      },
      {
        revised_sentence:
          "Hơn nữa, việc tập luyện thường xuyên còn tăng cường hệ miễn dịch và giảm nguy cơ mắc các bệnh mãn tính như tiểu đường, cao huyết áp và béo phì.",
        explanation: "Sử dụng 'cao huyết áp' thay vì 'huyết áp cao' để tăng tính chuyên môn trong tiếng Việt.",
      },
    ],
    paraphrasing_options: [
      {
        sentence: "Tập thể dục rất quan trọng cho sức khỏe.",
        complexity_level: "Cơ bản",
        explanation: "Câu này đơn giản hóa ý tưởng chính bằng tiếng Việt.",
      },
      {
        sentence: "Hoạt động thể chất thường xuyên là chìa khóa để duy trì sức khỏe tốt và phòng ngừa bệnh tật.",
        complexity_level: "Trung cấp",
        explanation: "Câu này sử dụng từ 'chìa khóa' để nhấn mạnh tầm quan trọng.",
      },
    ],
  },
  en: {
    vocabulary_analysis: {
      level_assessment: "Intermediate",
      appropriateness: "The vocabulary in both sentences is appropriate for the health and fitness context.",
      improvements: [
        "Replace 'vital role' with 'crucial function' to increase formality.",
        "Replace 'reduces the risk' with 'mitigates the risk' for enhanced precision.",
        "Use 'chronic diseases' instead of 'chronic illnesses' for more professional terminology.",
      ],
      differences: [
        "The original sentence focuses on the physical benefits of exercise.",
        "The suggested sentence expands to include overall health benefits, including immune system support.",
      ],
    },
    grammar_analysis: {
      original_correctness: "Both sentences are grammatically correct.",
      suggested_correctness: "The suggested sentence has no grammatical errors.",
      issues_identified: [],
      improvements_made: [],
      additional_suggestions: [
        "Consider breaking long sentences into shorter ones for better readability.",
        "Use commas to separate complex sentence parts more clearly.",
      ],
    },
    content_analysis: {
      relevance: "Both sentences are highly relevant to the topic of health and fitness.",
      logical_flow: "The logical flow from the original to the suggested sentence is very coherent.",
      clarity_improvements: [
        "Add specific examples of chronic diseases for better clarity.",
        "Use simpler language for non-expert readers.",
      ],
      accuracy: "The content is accurate and aligns with research on exercise benefits.",
    },
    coherence_analysis: {
      tone_consistency: "The tone is consistent, professional, and serious throughout.",
      flow_connection:
        "The connection between sentences is excellent, creating a comprehensive picture of exercise benefits.",
      readability_improvements: [
        "Use shorter sentences to improve readability.",
        "Add connecting words to clarify relationships between ideas.",
      ],
      overall_rating: "9/10",
    },
    improvement_suggestions: [
      {
        revised_sentence:
          "Physical activity is essential for a healthy lifestyle, as it strengthens the heart, muscles, and bones while also enhancing flexibility and coordination.",
        explanation: "This sentence maintains the main idea but uses 'essential' to increase impact.",
      },
      {
        revised_sentence:
          "Moreover, it significantly boosts the immune system and lowers the risk of chronic diseases such as diabetes, hypertension, and obesity.",
        explanation: "Uses 'hypertension' instead of 'high blood pressure' for increased professionalism.",
      },
    ],
    paraphrasing_options: [
      {
        sentence: "Exercise is crucial for a healthy lifestyle.",
        complexity_level: "Basic",
        explanation: "This sentence simplifies the main idea.",
      },
      {
        sentence: "Regular physical activity is key to maintaining good health and preventing diseases.",
        complexity_level: "Intermediate",
        explanation: "This sentence uses 'key' to emphasize importance.",
      },
      {
        sentence:
          "Engaging in consistent exercise not only promotes physical strength but also enhances overall well-being by mitigating health risks.",
        complexity_level: "Advanced",
        explanation: "This sentence uses 'mitigating' for higher precision and more complex structure.",
      },
    ],
  },
}

export const sampleText = `Exercise plays a vital role in maintaining a healthy lifestyle. Regular physical activity helps strengthen the heart, muscles, and bones while improving flexibility and coordination. It also boosts the immune system and reduces the risk of chronic illnesses such as diabetes, high blood pressure, and obesity.`

export const sentences = sampleText.split(/(?<=[.!?])\s+/).filter((s) => s.trim())

export const sampleAnalyses: SentenceAnalysis[] = sentences.map((sentence, index) => ({
  id: `sentence-${index}`,
  text: sentence,
  basicInfo: {
    wordCount: sentence.split(" ").length,
    complexity: index % 3 === 0 ? "Simple" : index % 3 === 1 ? "Medium" : "Complex",
    readingLevel: `Grade ${6 + (index % 4)}`,
  },
  grammar: {
    subject: sentence.split(" ")[0],
    predicate: sentence.split(" ").slice(1, 4).join(" "),
    object: sentence.includes("the") ? sentence.split("the ")[1]?.split(" ")[0] : undefined,
    type: "Declarative",
  },
  wordAnalysis: {
    nouns: Math.floor(sentence.split(" ").length * 0.3),
    verbs: Math.floor(sentence.split(" ").length * 0.2),
    adjectives: Math.floor(sentence.split(" ").length * 0.15),
    adverbs: Math.floor(sentence.split(" ").length * 0.1),
  },
  styleMetrics: {
    readabilityScore: 6 + Math.random() * 3,
    sentenceVariety: ["Poor", "Good", "Excellent"][index % 3] as any,
    passiveVoice: index % 4 === 0,
  },
  suggestions: ["Consider breaking into shorter sentences", "Strong vocabulary usage", "Good sentence structure"].slice(
    0,
    Math.floor(Math.random() * 3) + 1,
  ),
}))
