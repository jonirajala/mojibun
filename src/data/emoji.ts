/**
 * Visual associations for Japanese words.
 *
 * Current strategy:
 * - Support first-class image visuals
 * - Keep emoji as a resilient fallback
 * - Allow future local overrides if needed
 * - Use OpenMoji image URLs for full coverage right now
 */

export interface VisualAsset {
  type: 'image';
  src: string;
  fallback: string;
  source: 'openmoji';
}

const emojiMap: Record<string, string> = {
  // Greetings & phrases
  'こんにちは': '👋',
  'おはようございます': '🌅',
  'おはよう': '🌄',
  'こんばんは': '🌃',
  'さようなら': '🛫',
  'おやすみなさい': '😴',
  'いただきます': '🍽️',
  'ごちそうさまでした': '🍴',
  'ありがとうございます': '🙏',
  'すみません': '🙇',
  'はい': '✅',
  'いいえ': '❌',
  'おねがいします': '🤲',
  'はじめまして': '🤝',
  'どうぞよろしく': '🌸',
  'どうも': '👍',
  'じゃないです': '🚫',

  // People
  'わたし': '🙋',
  'がくせい': '🎓',
  'せんせい': '👩‍🏫',
  'ともだち': '🧑‍🤝‍🧑',
  'いしゃ': '👨‍⚕️',
  'ひと': '👤',
  'にほんじん': '🗾',
  'アメリカじん': '🗽',
  'たなか': '🧔',
  'たなかさん': '👨‍💼',
  'やまださん': '👩‍💼',
  'なまえ': '📛',

  // Countries
  'にほん': '🇯🇵',
  'アメリカ': '🇺🇸',

  // Demonstratives
  'これ': '👇',
  'それ': '👉',
  'あれ': '👆',
  'この': '👈',
  'その': '➡️',
  'あの': '☝️',

  // Question words
  'なん': '❓',
  'だれ': '🤷',
  'どれ': '🤔',
  'どの': '🧐',

  // Location words
  'ここ': '📍',
  'そこ': '📌',
  'あそこ': '🏔️',
  'どこ': '🗺️',

  // Family
  'おかあさん': '🤱',
  'おとうさん': '👨‍🦰',
  'おにいさん': '👦',
  'おねえさん': '👧',
  'おとうと': '🧒',
  'いもうと': '🧑',

  // Objects
  'ほん': '📖',
  'ペン': '🖊️',
  'かばん': '👜',
  'でんわ': '📱',
  'とけい': '⌚',
  'くるま': '🚗',
  'かさ': '☂️',
  'テーブル': '🪑',
  'いす': '💺',

  // Places
  'がっこう': '🏫',
  'えき': '🚉',
  'トイレ': '🚻',
  'いえ': '🏠',
  'うち': '🏡',
  'びょういん': '🏥',
  'レストラン': '🍝',

  // Food & Drink
  'みず': '💧',
  'おちゃ': '🍵',
  'ごはん': '🍚',
  'たべもの': '🍱',
  'にく': '🥩',
  'さかな': '🐟',
  'やさい': '🥬',
  'パン': '🍞',
  'たまご': '🥚',
  'くだもの': '🍎',

  // Nature & animals
  'ねこ': '🐱',
  'いぬ': '🐕',

  // Adjectives
  'おおきい': '⬆️',
  'ちいさい': '⬇️',
  'あたらしい': '✨',
  'ふるい': '🏚️',
  'たかい': '💰',
  'やすい': '🏷️',
  'おいしい': '😋',
  'きれい': '💎',
  'げんき': '💪',

  // Verbs
  'たべる': '🥢',
  'のむ': '🥤',
  'いく': '🚶',
  'くる': '🚶‍♂️',
  'みる': '👀',
  'する': '✋',
  'ある': '📦',
  'いる': '👥',

  // Transport
  'でんしゃ': '🚃',
  'バス': '🚌',
  'じてんしゃ': '🚲',
  'タクシー': '🚕',

  // Time
  'あさ': '🌤️',
  'ひる': '☀️',
  'よる': '🌌',
  'きょう': '📅',
  'あした': '📆',
};

function emojiToCodepoint(emoji: string): string {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)?.toString(16).toUpperCase())
    .filter((value): value is string => !!value)
    .join('-');
}

function getOpenMojiUrl(emoji: string): string {
  const codepoint = emojiToCodepoint(emoji);
  return `https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/${codepoint}.svg`;
}

export function getEmoji(japanese: string): string | undefined {
  return emojiMap[japanese];
}

export function hasVisual(japanese: string): boolean {
  return !!emojiMap[japanese];
}

export function getVisual(japanese: string): VisualAsset | undefined {
  const fallback = emojiMap[japanese];

  if (!fallback) return undefined;

  return {
    type: 'image',
    src: getOpenMojiUrl(fallback),
    fallback,
    source: 'openmoji',
  };
}
