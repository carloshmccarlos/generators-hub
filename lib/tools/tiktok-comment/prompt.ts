import { GOAL_OPTIONS, LANGUAGE_OPTIONS, REQUEST_COUNTS, TONE_OPTIONS } from "./constants";
import type { GenerateCommentInput } from "./types";

const FEW_SHOT_EXAMPLES: Record<GenerateCommentInput["language"], string[]> = {
  en: ["Style anchor: 'not me replaying this three times' / 'the comment section understood the assignment'"],
  cn: ["风格示例：'这条我真的会反复看' / '评论区这波有点整活'"],
  tw: ["風格示例：'這個看了根本停不下來' / '留言區的人都懂欸'"],
  ja: ["スタイル例：'これ何回も見てしまう' / 'コメント欄が正解しかない'"],
  ko: ["스타일 예시: '이거 몇 번째 보는 거야ㅋㅋㅋ' / '댓글이 다 공감 됨'"],
  es: ["Ejemplo de estilo: 'esto me tiene en un loop' / 'los comentarios entendieron todo'"],
  pt: ["Exemplo de estilo: 'não consigo parar de rever isso' / 'a seção de comentários acertou em cheio'"],
  fr: ["Exemple de style: 'j'ai regardé ça 5 fois d'affilée' / 'les commentaires ont tout compris'"],
  de: ["Stilbeispiel: 'das hab ich schon dreimal angeschaut' / 'die Kommentarspalte hat es voll gecheckt'"],
  id: ["Contoh gaya: 'ini udah berapa kali ditonton sih' / 'kolom komentar pada ngerti banget'"],
  th: ["ตัวอย่างสไตล์: 'ดูซ้ำไม่รู้กี่รอบแล้ว' / 'คอมเมนต์ในนี้เข้าใจกันหมดเลย'"],
  vi: ["Ví dụ phong cách: 'xem đi xem lại mấy lần rồi' / 'cả phần bình luận đều hiểu ý'"],
  ar: ["مثال على الأسلوب: 'شفت هذا أكثر من مرة' / 'التعليقات فاهمة كل شي'"],
  hi: ["शैली उदाहरण: 'यह कई बार देख चुका हूँ' / 'कमेंट सेक्शन ने सब समझ लिया'"],
  ru: ["Пример стиля: 'пересматриваю это снова и снова' / 'комментарии всё поняли правильно'"],
  tr: ["Stil örneği: 'bunu kaç kez izledim bilmiyorum' / 'yorum bölümü her şeyi anlamış'"],
  it: ["Esempio di stile: 'l'ho guardato almeno cinque volte' / 'i commenti hanno centrato tutto'"],
  ms: ["Contoh gaya: 'dah tengok banyak kali pun tak bosan' / 'bahagian komen semua faham je'"],
};

function labelFor<T extends { id: string; label: string }>(items: T[], id: string): string {
  return items.find((item) => item.id === id)?.label ?? id;
}

export function buildSystemPrompt(): string {
  return [
    "You are a TikTok comment strategist.",
    "Write comments that sound like real people, not AI.",
    "Never use hate speech, slurs, personal attacks, or unsafe content.",
    "For debate starters, be contrarian but respectful.",
    "Avoid openers like 'Absolutely!', 'As an AI', and similar filler.",
    "Keep comments native to the requested language and tone.",
    "Use culturally appropriate slang and expressions for the specified language.",
  ].join(" ");
}

export function buildUserPrompt(input: GenerateCommentInput): string {
  const goalLabels = input.goals.map((goal) => labelFor(GOAL_OPTIONS, goal));
  const toneLabel = labelFor(TONE_OPTIONS, input.tone);
  const languageLabel = labelFor(LANGUAGE_OPTIONS, input.language);
  const keywords = input.keywords.length > 0 ? input.keywords.join(", ") : "None";
  const examples = FEW_SHOT_EXAMPLES[input.language].join("\n");

  return [
    "Generate TikTok comments for this video context.",
    `Caption: ${input.caption}`,
    `Keywords: ${keywords}`,
    `Language: ${languageLabel}`,
    `Goals: ${goalLabels.join(", ")}`,
    `Tone: ${toneLabel}`,
    "",
    "Return valid JSON only with these exact keys:",
    "{",
    `  "high_like": [...],`,
    `  "high_reply": [...],`,
    `  "debate_starter": [...],`,
    `  "safe": [...]`,
    "}",
    "",
    "Requested counts before filtering:",
    `- high_like: ${REQUEST_COUNTS.high_like}`,
    `- high_reply: ${REQUEST_COUNTS.high_reply}`,
    `- debate_starter: ${REQUEST_COUNTS.debate_starter}`,
    `- safe: ${REQUEST_COUNTS.safe}`,
    "",
    "Rules:",
    "- No markdown, numbering, or explanations.",
    "- Use plain strings only.",
    "- Do not repeat the same comment across groups.",
    "- ALL comments must be written in the specified language only.",
    "",
    "Style anchors:",
    examples,
  ].join("\n");
}

export function buildGenerationMessages(input: GenerateCommentInput) {
  return [
    { role: "system" as const, content: buildSystemPrompt() },
    { role: "user" as const, content: buildUserPrompt(input) },
  ];
}
