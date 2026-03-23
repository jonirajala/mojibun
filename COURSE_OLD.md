# Yappari - Japanese Learning Course

## Course Philosophy

A free, LLM-powered Japanese learning app inspired by LingoDeer and Duolingo.
Target: Learners who already know hiragana and katakana, progressing through JLPT N5.

### Core Principles
- **Explicit grammar** - Brief, clear explanations before drilling (LingoDeer style)
- **Small chunks** - 2-3 new items per lesson, heavy review
- **80/20 rule** - Each lesson is 80% known material, 20% new
- **Recognition before production** - See it, then build it
- **Polite form first** - です/ます before plain form
- **Functional contexts** - Real situations (ordering food, introductions)
- **Kanji in context** - Introduce kanji alongside known vocabulary, not separately

### Kanji Introduction Strategy

**Units 1-2: Pure kana.** Build vocabulary foundation without kanji distraction.

**Unit 3 onward: Kanji + furigana.** When we introduce words the user already
knows in kana, we start showing the kanji form with furigana (small kana above).
This follows Genki's approach (kanji from Lesson 3) and expert consensus that
kanji should start immediately after kana mastery.

**Progression (themed, ~15 kanji per unit):**
| Unit | Kanji Theme | Examples |
|------|-------------|---------|
| 3 | People | 人 男 女 子 友 先 生 学 |
| 4 | Numbers & time | 一〜十 百 千 万 円 日 月 時 年 今 |
| 5 | Places & directions | 大 小 中 上 下 右 左 山 川 国 |
| 6 | Actions | 食 飲 見 行 来 出 入 読 書 聞 |
| 7 | Food & shopping | 買 店 高 安 水 魚 肉 |
| 8-10 | Mixed review | 話 新 古 長 白 天 気 etc. |

**Furigana (reading aid above kanji):**
- On by default when kanji first appears
- User can toggle: kana-only / kanji+furigana / kanji-only (in settings)
- Auto-hides for "mastered" kanji in future versions

**Total: ~100 kanji (JLPT N5 target)**

---

## Course Structure Overview

```
Course
├── Unit 1: Greetings & Basics (8 lessons)
├── Unit 2: This & That (8 lessons)
├── Unit 3: People & Description (8 lessons)
├── Unit 4: Numbers & Time (8 lessons)
├── Unit 5: Places & Existence (8 lessons)
├── Unit 6: Daily Actions (8 lessons)
├── Unit 7: Food & Ordering (8 lessons)
├── Unit 8: Connecting Ideas (8 lessons)
├── Unit 9: Making Requests (8 lessons)
└── Unit 10: Review & Beyond (8 lessons)
```

Total: 10 units, ~80 lessons, targeting ~50-80 hours of study.

---

## Exercise Types

Each lesson uses a mix of these exercise types:

| Type | Description | When Used |
|------|-------------|-----------|
| `multiple_choice` | Pick correct answer from 4 options | Recognition, vocab intro |
| `matching` | Pair Japanese with English (tap pairs) | Vocab review, rapid recall |
| `fill_blank` | Complete sentence with missing word | Particles, grammar |
| `word_order` | Arrange scrambled words into sentence | Sentence building, grammar |
| `kana_build` | Build a word/sentence from individual kana/kanji characters | Spelling, kana reinforcement, production |
| `listening` | Hear audio, select correct text/meaning | Pronunciation, comprehension |
| `translation` | Translate English to Japanese | Production, advanced |

### kana_build Exercise Details
The user sees an English word/meaning (+ optional emoji) and must tap individual
hiragana/katakana/kanji characters in the correct order to spell the Japanese word
or build a short sentence. Distractor characters are included to increase difficulty.

**Examples:**
- Prompt: "hello" (👋) → User taps: こ → ん → に → ち → は
- Prompt: "teacher" (👩‍🏫) → User taps: せ → ん → せ → い
- Prompt: "I am a student" → User taps: わ → た → し → は → が → く → せ → い → で → す

**When to use:**
- After vocab_intro and matching (user has seen the word)
- Before word_order (character-level before word-level)
- Especially useful for longer words that are hard to memorize as a chunk
- Great for reinforcing kana reading since our learners just learned kana

### Lesson Flow Template
1. **Intro** - Vocab cards (emoji + audio) & grammar explanation
2. **Recognition** - Multiple choice & matching (easy)
3. **Spelling** - Kana build exercises (character-level production)
4. **Application** - Fill-in-blank & word ordering (medium)
5. **Production** - Translation & mixed review (hard)

Each lesson: ~10-15 exercises, ~5-8 minutes.

---

## Grammar Progression

The following table maps every grammar point to the exact lesson where it is first introduced
via a `grammar_intro`. No exercise may use a grammar point before the lesson that teaches it.

| Lesson | Grammar Point | Pattern / Rule |
|--------|--------------|----------------|
| 1.1 | *(none)* | Greetings vocabulary only |
| 1.2 | *(none)* | Set phrases / expressions only |
| 1.3 | は (topic particle), です (copula) | X は Y です ("X is Y") |
| 1.4 | *(none — set phrase lesson)* | おなまえは？ taught as a fixed phrase; uses は/です from 1.3 |
| 1.5 | か (question particle) | Statement + か = question |
| 1.6 | じゃないです (negative copula) | X は Y じゃないです ("X is not Y") |
| 1.7 | から + きました (origin) | Place + から + きました ("came from Place") |
| 2.1 | これ/それ/あれ (demonstrative pronouns) | これはYです ("This is Y") |
| 2.2 | この/その/あの + noun (demonstrative adjectives) | このN ("this N") vs これ (standalone) |
| 2.3 | の (possession particle) | X の Y ("X's Y") |
| 2.4 | も (also particle) | X も Y です ("X is also Y"; も replaces は) |
| 2.5 | ここ/そこ/あそこ/どこ + は...です (location pattern) | Place は どこ です か ("Where is Place?") |
| 2.6 | どれ (standalone) vs どの + noun (which) | どれ stands alone; どの requires a noun |
| 3.2 | い-adjectives | い-adj + noun (おおきいいえ) |
| 3.3 | な-adjectives | な-adj + な + noun (きれいなひと) |
| 3.4 | Adjective negation | い→くない, な→じゃない |
| 3.5 | Adjective past tense | い→かった, な→だった |
| 3.6 | が好き / が嫌い | N が すき です |
| 4.3 | ～じ / ～ふん (telling time) | Number + じ, Number + ふん/ぷん |
| 4.6 | ～から～まで (from...to) | Time から Time まで |
| 4.7 | Numbers + えん / いくら (price) | Number + えん, いくら です か |
| 5.2 | ～がある (existence, non-living) | Place に N が あります |
| 5.3 | ～がいる (existence, living) | Place に N が います |
| 5.5 | で (action location) | Place で Verb ます |
| 6.1 | Verb groups overview | る-verbs, う-verbs, irregular |
| 6.2 | ～ます (polite present), を (object) | N を V ます |
| 6.3 | に/へ (direction) | Place に/へ いきます |
| 6.4 | ～ません, ～ました, ～ませんでした | Verb tense/polarity |
| 6.5 | で (means of transport) | Means で いきます |
| 7.3 | ～をください | N を ください |
| 7.4 | ～たい (want to) | V-stem + たい です |
| 8.2 | から (because) | Reason から, Result |
| 8.3 | けど / でも (but) | S1 けど S2 |
| 8.4 | と / や (and) | N1 と N2, N1 や N2 |
| 9.1 | て-form (る-verbs) | る → て |
| 9.2 | て-form (う-verbs) | Pattern-based rules |
| 9.3 | てください | て + ください ("please do") |
| 9.4 | てもいい / てはいけない | Permission / prohibition |
| 9.5 | ている | Ongoing action / state |
| 9.6 | てから | Sequencing ("after doing") |
| 10.1 | たことがある | Experience ("have done before") |
| 10.2 | ましょう | Suggestion ("let's") |
| 10.3 | より～のほうが / いちばん | Comparison |
| 10.4 | ほうがいい | Advice ("should / had better") |

---

## Unit 1: Greetings & Basics

**Theme:** First words, self-introduction, basic sentence structure
**Grammar:** は, です (1.3), か (1.5), じゃないです (1.6), から+きました (1.7)
**Vocabulary:** 24 words

### Lesson 1.1: Hello!
**Grammar:** None (vocabulary only)
**Lesson flow:** vocab_intro → recognition → spelling

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| こんにちは | konnichiwa | hello |
| おはようございます | ohayou gozaimasu | good morning |
| こんばんは | konbanwa | good evening |
| さようなら | sayounara | goodbye |

**Exercises:**
1. `multiple_choice` - "Which means 'hello'?" → こんにちは / おはよう / こんばんは / さようなら
2. `multiple_choice` - "What does おはようございます mean?" → Good morning / Good evening / Hello / Goodbye
3. `matching` - Match all 4 words to meanings
4. `multiple_choice` - "You arrive at school at 8am. What do you say?" → おはようございます
5. `multiple_choice` - "You meet a friend at 3pm. What do you say?" → こんにちは
6. `multiple_choice` - "It's 8pm. You greet someone. What do you say?" → こんばんは
7. `listening` - Hear こんにちは, pick correct text from options
8. `listening` - Hear おはようございます, pick correct text from options

### Lesson 1.2: Please & Thank You
**Grammar:** None (set phrases / expressions only)
**Lesson flow:** vocab_intro → recognition → spelling

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| ありがとうございます | arigatou gozaimasu | thank you |
| すみません | sumimasen | excuse me / sorry |
| はい | hai | yes |
| いいえ | iie | no |
| おねがいします | onegaishimasu | please |

**Exercises:**
1. `multiple_choice` - "Which means 'thank you'?" → ありがとうございます
2. `multiple_choice` - "Someone bumps into you. They say:" → すみません
3. `matching` - Match all 5 words to meanings
4. `multiple_choice` - "Is this correct? はい or いいえ?" (with context)
5. `multiple_choice` - "You want to politely ask for something. You add:" → おねがいします
6. `listening` - Hear ありがとうございます, select text
7. `multiple_choice` - Review: "Good morning?" → おはようございます (from L1.1)
8. `matching` - Mix of L1.1 and L1.2 words

### Lesson 1.3: I am...
**grammar_intro:** は (topic particle), です (copula) — "X は Y です"
**Explanation:**
> は (pronounced "wa" when used as a particle) marks the topic of the sentence.
> です means "is/am/are" — it makes the sentence polite.
> わたし は がくせい です = "I am a student"

**Lesson flow:** vocab_intro → grammar_intro (は, です) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| わたし | watashi | I, me |
| がくせい | gakusei | student |
| せんせい | sensei | teacher |
| です | desu | am/is/are (polite) |

**Exercises:**
1. `multiple_choice` - "What does わたし mean?" → I/me
2. `multiple_choice` - "わたしはがくせいです means:" → I am a student
3. `fill_blank` - "わたし ＿ がくせいです" → は
4. `fill_blank` - "わたしは がくせい ＿" → です
5. `word_order` - Build: わたし / は / せんせい / です → わたしはせんせいです
6. `multiple_choice` - "How do you say 'I am a teacher'?" → わたしはせんせいです
7. `translation` - "I am a student" → わたしはがくせいです
8. `fill_blank` - "わたしは ＿ です" (picture of teacher) → せんせい
9. `multiple_choice` - Review: "Thank you?" → ありがとうございます
10. `word_order` - わたし / は / がくせい / です

### Lesson 1.4: What's Your Name?
**Grammar:** None (uses は/です from 1.3; おなまえは？ is taught as a set phrase)
**Lesson flow:** vocab_intro → recognition → practice with は/です pattern → production

Note: おなまえは？ is introduced as a fixed conversational phrase, not decomposed
into の or か (which have not been taught yet). The pattern "わたしは [name] です"
is used for answering. Students simply learn the question as a whole expression.

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| なまえ | namae | name |
| おなまえは？ | onamae wa? | What is your name? (set phrase) |
| ～さん | -san | Mr./Ms./Mrs. |

**Exercises:**
1. `multiple_choice` - "What does なまえ mean?" → name
2. `multiple_choice` - "おなまえは？ means:" → What is your name?
3. `matching` - Match なまえ, おなまえは？, さん to meanings
4. `word_order` - わたし / は / たなか / です → わたしはたなかです
5. `multiple_choice` - "Someone asks おなまえは？ You are Tanaka. You say:" → わたしはたなかです
6. `multiple_choice` - "How do you politely address someone named Tanaka?" → たなかさん
7. `fill_blank` - "わたし ＿ たなかです" → は
8. `translation` - "I am Tanaka" → わたしはたなかです
9. `matching` - Review mix of all Unit 1 words so far
10. `listening` - Hear おなまえは, select correct meaning

### Lesson 1.5: Yes/No Questions
**grammar_intro:** か (question particle) — adding か to a statement makes it a question
**Explanation:**
> Add か to the end of a sentence to make it a question.
> がくせいですか？ = "Are you a student?"
> はい、がくせいです。 / いいえ、がくせいじゃないです。

**Lesson flow:** vocab_intro → grammar_intro (か) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| か | ka | ? (question particle) |
| ～じん | -jin | person from ~ (nationality) |
| にほんじん | nihonjin | Japanese person |
| アメリカじん | amerikajin | American person |

**Exercises:**
1. `multiple_choice` - "How do you make a question in Japanese?" → Add か
2. `fill_blank` - "がくせいです ＿" (to make it a question) → か
3. `multiple_choice` - "がくせいですか means:" → Are you a student?
4. `word_order` - たなかさん / は / にほんじん / です / か
5. `fill_blank` - "はい、にほんじん ＿" → です
6. `multiple_choice` - "にほんじん means:" → Japanese person
7. `translation` - "Are you a student?" → がくせいですか
8. `fill_blank` - "アメリカ ＿" → じん
9. `word_order` - わたし / は / アメリカじん / です
10. `matching` - nationalities and question forms

### Lesson 1.6: Not...
**grammar_intro:** じゃないです (negative copula) — X は Y じゃないです = "X is not Y"
**Explanation:**
> To say "is not", replace です with じゃないです (casual) or ではありません (formal).
> わたしはせんせいじゃないです = "I am not a teacher"

**Lesson flow:** vocab_intro → grammar_intro (じゃないです) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| じゃないです | ja nai desu | is not (polite) |
| ともだち | tomodachi | friend |
| いしゃ | isha | doctor |

**Exercises:**
1. `multiple_choice` - "What is the negative of です?" → じゃないです
2. `fill_blank` - "わたしはせんせい ＿" → じゃないです
3. `multiple_choice` - "わたしはいしゃじゃないです means:" → I am not a doctor
4. `word_order` - たなかさん / は / がくせい / じゃないです
5. `translation` - "I am not a student" → わたしはがくせいじゃないです
6. `fill_blank` - "いいえ、にほんじん ＿" → じゃないです
7. `multiple_choice` - "Your friend asks がくせいですか？ You are not. You say:" → いいえ、がくせいじゃないです
8. `word_order` - わたし / は / いしゃ / じゃないです
9. `matching` - Mix of affirmative and negative sentences
10. `translation` - "Tanaka is not a doctor" → たなかさんはいしゃじゃないです

### Lesson 1.7: Nice to Meet You
**grammar_intro:** から + きました (origin) — Place + から + きました = "came from Place"
**Explanation:**
> から means "from". Combined with きました (came), it expresses where someone is from.
> アメリカからきました = "I came from America"
> にほんからきました = "I came from Japan"

**Lesson flow:** vocab_intro → grammar_intro (から+きました) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| はじめまして | hajimemashite | nice to meet you |
| どうぞよろしく | douzo yoroshiku | pleased to meet you |
| ～から きました | kara kimashita | came from ~ |
| どうも | doumo | thanks (casual) |

**Exercises:**
1. `multiple_choice` - "Which phrase do you say when meeting someone for the first time?" → はじめまして
2. `multiple_choice` - "What does どうぞよろしく mean?" → Pleased to meet you
3. `multiple_choice` - "から means:" → from
4. `fill_blank` - "にほん ＿ きました" → から
5. `word_order` - アメリカ / から / きました
6. `word_order` - はじめまして / わたし / は / たなか / です / どうぞよろしく
7. `translation` - "Nice to meet you, I am Tanaka" → はじめまして、わたしはたなかです
8. `listening` - Hear はじめまして, select text
9. `matching` - Review all Unit 1 vocabulary
10. `fill_blank` - Complete a self-introduction passage
11. `translation` - Full self-introduction

### Lesson 1.8: Unit 1 Review
**Grammar:** None (review only)
**No new words. Full review of Unit 1.**

Mixed exercises covering all vocabulary and grammar from lessons 1.1-1.7:
1. `matching` - 8 pairs from all lessons
2. `fill_blank` - は particle usage
3. `fill_blank` - です vs じゃないです
4. `word_order` - Self-introduction sentence
5. `translation` - "I am a student"
6. `multiple_choice` - Contextual greeting choice
7. `word_order` - Question formation with か
8. `translation` - "Are you Japanese?"
9. `fill_blank` - Complete a dialogue
10. `listening` - Identify greeting
11. `translation` - Full self-introduction
12. `matching` - All key vocabulary pairs

**Unit 1 Total Vocabulary: 24 words**
**Grammar Points: は, です (1.3), か (1.5), じゃないです (1.6), から+きました (1.7)**

---

## Unit 2: This & That

**Theme:** Demonstratives, common objects, possession
**Grammar:** これ/それ/あれ (2.1), この/その/あの (2.2), の (2.3), も (2.4), ここ/そこ/あそこ/どこ (2.5), どれ/どの (2.6)
**Vocabulary:** ~22 words

### Lesson 2.1: What is This?
**grammar_intro:** これ/それ/あれ (demonstrative pronouns) — standalone words for "this/that/that over there"
**Explanation:**
> これ = this (near me), それ = that (near you), あれ = that (far from both)
> これはなんですか？ = "What is this?"

**Lesson flow:** vocab_intro → grammar_intro (これ/それ/あれ) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| これ | kore | this |
| それ | sore | that (near you) |
| あれ | are | that (over there) |
| ほん | hon | book |
| ペン | pen | pen |

**Exercises:**
1. `multiple_choice` - "Which word means 'this'?" → これ
2. `multiple_choice` - "これはなんですか means:" → What is this?
3. `fill_blank` - "＿ はほんです" (pointing at something near you) → これ
4. `fill_blank` - "＿ はペンです" (pointing at something far away) → あれ
5. `word_order` - これ / は / なん / です / か
6. `matching` - これ/それ/あれ to this/that/that over there
7. `translation` - "This is a book" → これはほんです
8. `fill_blank` - "これは ＿ です" (picture of pen) → ペン
9. `word_order` - それ / は / ほん / です
10. `listening` - Hear これはなんですか, select meaning

### Lesson 2.2: This Book, That Pen
**grammar_intro:** この/その/あの + noun (demonstrative adjectives) — must be followed by a noun
**Explanation:**
> この/その/あの go BEFORE a noun (unlike これ/それ/あれ which stand alone)
> このほん = this book, そのペン = that pen

**Lesson flow:** vocab_intro → grammar_intro (この/その/あの) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| この | kono | this ~ |
| その | sono | that ~ |
| あの | ano | that ~ (over there) |
| かばん | kaban | bag |
| でんわ | denwa | phone |

**Exercises:**
1. `multiple_choice` - "How do you say 'this book'?" → このほん
2. `fill_blank` - "＿ かばんはわたしのです" → この/その/あの
3. `multiple_choice` - "What's the difference between これ and この?" → この needs a noun after it
4. `word_order` - この / ほん / は / なん / です / か
5. `fill_blank` - "＿ でんわはたなかさんのです" → その
6. `translation` - "That bag is mine" → そのかばんはわたしのです
7. `matching` - この/その/あの to their uses
8. `word_order` - あの / ペン / は / せんせい / の / です
9. `fill_blank` - "＿ は でんわです" → これ (standalone)
10. `translation` - "This phone is Tanaka's" → このでんわはたなかさんのです

### Lesson 2.3: My, Your, Tanaka's
**grammar_intro:** の (possession particle) — X の Y = "X's Y"
**Explanation:**
> の connects a possessor to what they possess.
> わたしのほん = my book, たなかさんのペン = Tanaka's pen

**Lesson flow:** vocab_intro → grammar_intro (の) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| の | no | 's (possession particle) |
| とけい | tokei | watch/clock |
| くるま | kuruma | car |
| かさ | kasa | umbrella |

**Exercises:**
1. `multiple_choice` - "わたしのほん means:" → my book
2. `fill_blank` - "たなかさん ＿ ペン" → の
3. `word_order` - これ / は / わたし / の / とけい / です
4. `fill_blank` - "せんせい ＿ くるま" → の
5. `translation` - "This is my umbrella" → これはわたしのかさです
6. `multiple_choice` - "それはだれのほんですか means:" → Whose book is that?
7. `word_order` - それ / は / だれ / の / かばん / です / か
8. `fill_blank` - "この くるま は せんせい ＿ です" → の
9. `translation` - "That is Tanaka's watch" → それはたなかさんのとけいです
10. `matching` - Objects vocabulary review

### Lesson 2.4: Me Too!
**grammar_intro:** も (also particle) — も replaces は to mean "also/too"
**Explanation:**
> も replaces は to mean "also/too"
> わたしもがくせいです = "I am also a student"

**Lesson flow:** vocab_intro → grammar_intro (も) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| も | mo | also, too |
| テーブル | teeburu | table |
| いす | isu | chair |

**Exercises:**
1. `multiple_choice` - "わたしもがくせいです means:" → I am also a student
2. `fill_blank` - "たなかさんはがくせいです。やまださん ＿ がくせいです" → も
3. `multiple_choice` - "も replaces which particle?" → は
4. `word_order` - わたし / も / せんせい / です
5. `translation` - "Tanaka is also a teacher" → たなかさんもせんせいです
6. `fill_blank` - "これはテーブルです。それ ＿ テーブルです" → も
7. `word_order` - やまださん / も / にほんじん / です
8. `matching` - は vs も usage
9. `translation` - "This is a chair. That is also a chair." → これはいすです。それもいすです。
10. `fill_blank` - Review mix of は, の, も

### Lesson 2.5: Where?
**grammar_intro:** ここ/そこ/あそこ/どこ + は...です (location question/answer pattern)
**Explanation:**
> ここ = here, そこ = there, あそこ = over there, どこ = where
> These follow the same こ/そ/あ/ど pattern as これ/それ/あれ/どれ.
> To ask where something is: Place は どこ です か？
> To answer: Place は ここ/そこ/あそこ です。

**Lesson flow:** vocab_intro → grammar_intro (ここ/そこ/あそこ/どこ + は...です) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| ここ | koko | here |
| そこ | soko | there |
| あそこ | asoko | over there |
| どこ | doko | where |

**Exercises:**
1. `multiple_choice` - "Which means 'where'?" → どこ
2. `matching` - ここ/そこ/あそこ/どこ to meanings
3. `fill_blank` - "がっこうは ＿ ですか" → どこ
4. `word_order` - トイレ / は / どこ / です / か
5. `multiple_choice` - "ここ is to これ as そこ is to:" → それ
6. `translation` - "Where is the school?" → がっこうはどこですか
7. `fill_blank` - "がっこうは ＿ です" (pointing here) → ここ
8. `word_order` - でんわ / は / あそこ / です
9. `listening` - Hear どこですか, select meaning
10. `translation` - "The phone is over there" → でんわはあそこです

### Lesson 2.6: Which One?
**grammar_intro:** どれ (standalone "which one") vs どの + noun ("which N")
**Explanation:**
> どれ stands alone, like これ/それ/あれ: どれがあなたのですか？ = "Which one is yours?"
> どの goes before a noun, like この/その/あの: どのほんがすきですか？ = "Which book do you like?"
> This mirrors the pattern: これ↔この, それ↔その, あれ↔あの, どれ↔どの

**Lesson flow:** vocab_intro → grammar_intro (どれ vs どの) → recognition → fill_blank → word_order → production

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| どれ | dore | which one |
| どの | dono | which ~ |
| トイレ | toire | toilet/bathroom |
| えき | eki | station |

**Exercises:**
1. `multiple_choice` - "Which means 'which one'?" → どれ
2. `fill_blank` - "＿ がたなかさんのかばんですか" → どれ
3. `multiple_choice` - "どの vs どれ: which needs a noun after it?" → どの
4. `word_order` - どの / ほん / が / たなかさん / の / です / か
5. `fill_blank` - "＿ はえきですか" → どこ vs どれ context
6. `translation` - "Which one is yours?" → どれがあなたのですか
7. `matching` - Question words: なに, だれ, どこ, どれ
8. `word_order` - トイレ / は / どこ / です / か
9. `fill_blank` - Review of demonstratives
10. `translation` - "Where is the station?" → えきはどこですか

### Lesson 2.7: Practice Conversations
**Grammar:** None (practice/review only)
**No new words.** Dialogue-based review.

Exercises use mini-dialogues:
1. `fill_blank` - A: これはなんですか B: それは ＿ です (picture)
2. `word_order` - Build a question about ownership
3. `translation` - "Whose umbrella is this?" → これはだれのかさですか
4. `fill_blank` - A: おなまえは？ B: ＿ はたなかです
5. `word_order` - Arrange a complete exchange
6. `multiple_choice` - Choose appropriate response to a question
7. `fill_blank` - Complete a 3-line dialogue
8. `translation` - "This is my friend's book" → これはともだちのほんです
9. `matching` - All Unit 2 vocabulary
10. `word_order` - Complex sentence with の and も

### Lesson 2.8: Unit 2 Review
**Grammar:** None (review only)
Full review. Mixed exercises from all Unit 2 content + some Unit 1 review.

**Unit 2 Total Vocabulary: ~22 words**
**Grammar Points: これ/それ/あれ (2.1), この/その/あの (2.2), の (2.3), も (2.4), ここ/そこ/あそこ/どこ (2.5), どれ/どの (2.6)**

---

## Unit 3: People & Description

**Theme:** Family, occupations, adjectives
**Grammar:** い-adjectives, な-adjectives, adjective negation
**Vocabulary:** ~24 words

### Lesson 3.1: Family
**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| おかあさん | okaasan | mother |
| おとうさん | otousan | father |
| おにいさん | oniisan | older brother |
| おねえさん | oneesan | older sister |
| おとうと | otouto | younger brother |
| いもうと | imouto | younger sister |

### Lesson 3.2: Big and Small
**Grammar: い-adjectives**
> い-adjectives end in い and come before nouns.
> おおきいいえ = big house, ちいさいねこ = small cat

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| おおきい | ookii | big |
| ちいさい | chiisai | small |
| あたらしい | atarashii | new |
| ふるい | furui | old (things) |
| たかい | takai | expensive / tall |
| やすい | yasui | cheap |

### Lesson 3.3: Pretty and Quiet
**Grammar: な-adjectives**
> な-adjectives need な before a noun.
> きれいなひと = pretty person, しずかなまち = quiet town

**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| きれい(な) | kirei | pretty, clean |
| しずか(な) | shizuka | quiet |
| げんき(な) | genki | energetic, healthy |
| ゆうめい(な) | yuumei | famous |
| ひと | hito | person |

### Lesson 3.4: Not Big
**Grammar: Adjective negation**
> い-adj: Remove い, add くない. おおきい → おおきくない
> な-adj: Add じゃない. きれい → きれいじゃない
> Exception: いい → よくない

### Lesson 3.5: Was Big (Past Tense)
**Grammar: Adjective past tense**
> い-adj: Remove い, add かった. おおきい → おおきかった
> な-adj: Add だった. きれい → きれいだった

### Lesson 3.6: I Like...
**Grammar: が好き / が嫌い**
**New words:**
| Japanese | Reading | English |
|----------|---------|---------|
| すき(な) | suki | like |
| きらい(な) | kirai | dislike |
| おいしい | oishii | delicious |
| ねこ | neko | cat |
| いぬ | inu | dog |

### Lesson 3.7: Describing People
Combined practice with family + adjectives.

### Lesson 3.8: Unit 3 Review

---

## Unit 4: Numbers & Time

**Theme:** Numbers, telling time, days, counters
**Grammar:** に (time), から...まで (from...to), Numbers + counters
**Vocabulary:** ~25 words

### Lesson 4.1: Numbers 1-10
いち、に、さん、し/よん、ご、ろく、しち/なな、はち、きゅう/く、じゅう

### Lesson 4.2: Numbers 11-100
じゅういち～きゅうじゅうきゅう、ひゃく

### Lesson 4.3: What Time?
**Grammar:** ～じ (hours), ～ふん/ぷん (minutes)
**New words:** いま (now), なんじ (what time), ごぜん (AM), ごご (PM)

### Lesson 4.4: Days of the Week
げつようび、かようび、すいようび、もくようび、きんようび、どようび、にちようび

### Lesson 4.5: Today, Tomorrow, Yesterday
**New words:** きょう、あした、きのう、あさ、ひる、よる、まいにち

### Lesson 4.6: From... To...
**Grammar:** ～から～まで
> くじからごじまでです = "It's from 9 to 5"

### Lesson 4.7: How Much?
**Grammar:** Numbers with えん (yen), いくら (how much)
**New words:** えん、いくら、～つ (general counter)

### Lesson 4.8: Unit 4 Review

---

## Unit 5: Places & Existence

**Theme:** Locations, buildings, position words
**Grammar:** がある/がいる, に (location), で (action location)
**Vocabulary:** ~22 words

### Lesson 5.1: Where is it?
**New words:** がっこう (school), びょういん (hospital), ぎんこう (bank), ゆうびんきょく (post office)

### Lesson 5.2: There is... (Things)
**Grammar:** ～がある = there is (for non-living things)
> テーブルのうえにほんがあります = "There is a book on the table"

### Lesson 5.3: There is... (People/Animals)
**Grammar:** ～がいる = there is (for living things)
> こうえんにねこがいます = "There is a cat in the park"

### Lesson 5.4: Position Words
**New words:** うえ (above), した (below), まえ (front), うしろ (behind), なか (inside), となり (next to), あいだ (between)

### Lesson 5.5: At the Location
**Grammar:** で = location where action happens (vs に = location of existence)
> がっこうでべんきょうします = "I study at school"

### Lesson 5.6: In the Room
Combined practice describing room layouts.

### Lesson 5.7: My Town
Describing locations in a town/neighborhood.

### Lesson 5.8: Unit 5 Review

---

## Unit 6: Daily Actions

**Theme:** Verbs, daily routine
**Grammar:** ます form, を, に/へ (direction), で (means)
**Vocabulary:** ~24 words

### Lesson 6.1: Verb Groups
**Explanation:**
> Japanese verbs have 3 groups:
> Group 1 (る-verbs/ichidan): たべる、みる — drop る, add ます
> Group 2 (う-verbs/godan): のむ、いく — change last sound to い-row, add ます
> Group 3 (irregular): する → します, くる → きます

### Lesson 6.2: I Eat, I Drink
**New words:** たべる (eat), のむ (drink), みる (see), きく (listen)
**Grammar:** ～ます (polite present), を (object particle)
> ごはんをたべます = "I eat rice/a meal"

### Lesson 6.3: I Go, I Come
**New words:** いく (go), くる (come), かえる (return), あるく (walk)
**Grammar:** に/へ (direction)
> がっこうにいきます = "I go to school"

### Lesson 6.4: I Don't...
**Grammar:** ～ません (negative), ～ました (past), ～ませんでした (neg past)

### Lesson 6.5: By Train
**New words:** でんしゃ (train), バス (bus), じてんしゃ (bicycle), タクシー (taxi)
**Grammar:** で (means of transport)
> でんしゃでいきます = "I go by train"

### Lesson 6.6: Every Day
**New words:** おきる (wake up), ねる (sleep), べんきょうする (study), しごと (work)
Daily routine descriptions.

### Lesson 6.7: What Do You Do?
**New words:** はたらく (work), よむ (read), かく (write), はなす (speak)
Combined practice.

### Lesson 6.8: Unit 6 Review

---

## Unit 7: Food & Ordering

**Theme:** Food vocabulary, restaurant situations, wants
**Grammar:** をください, たい (want to), が好き/嫌い review
**Vocabulary:** ~24 words

### Lesson 7.1: Food
**New words:** にく (meat), さかな (fish), やさい (vegetables), パン (bread), たまご (egg), くだもの (fruit)

### Lesson 7.2: Drinks
**New words:** みず (water), ぎゅうにゅう (milk), ジュース (juice), コーヒー (coffee), ビール (beer)

### Lesson 7.3: Please Give Me...
**Grammar:** ～をください = "Please give me ~"
> みずをください = "Water, please"

### Lesson 7.4: I Want To...
**Grammar:** ～たい = "want to do ~"
> すしをたべたいです = "I want to eat sushi"

### Lesson 7.5: Delicious!
**New words:** あまい (sweet), からい (spicy), すっぱい (sour), つめたい (cold), あつい (hot)

### Lesson 7.6: At the Restaurant
Situational practice: ordering, asking about menu, paying.

### Lesson 7.7: What Do You Want?
Combined practice with たい and food vocabulary.

### Lesson 7.8: Unit 7 Review

---

## Unit 8: Connecting Ideas

**Theme:** Past experiences, giving reasons, connecting sentences
**Grammar:** Past tense review, から, けど, ので, と
**Vocabulary:** ~20 words

### Lesson 8.1: Yesterday I...
Past tense verb practice with daily activities.

### Lesson 8.2: Because...
**Grammar:** から (because)
> あついですから、みずをのみます = "Because it's hot, I drink water"

### Lesson 8.3: But...
**Grammar:** けど/でも (but)
> にほんごはむずかしいですけど、たのしいです = "Japanese is hard, but fun"

### Lesson 8.4: And (Connecting)
**Grammar:** と (and, with), や (and — non-exhaustive)

### Lesson 8.5: Hobbies
**New words:** えいが (movie), おんがく (music), スポーツ (sports), りょこう (travel), しゃしん (photo)

### Lesson 8.6: What's Your Hobby?
**Grammar:** しゅみは～です
Combined practice.

### Lesson 8.7: Weekend Plans
Using verbs + time + reasons together.

### Lesson 8.8: Unit 8 Review

---

## Unit 9: Making Requests

**Theme:** て-form and its uses (the big milestone!)
**Grammar:** て-form, てください, てもいい, てはいけない, ている
**Vocabulary:** ~20 words

### Lesson 9.1: て-form for る-verbs
**Explanation:**
> て-form is THE most important conjugation in Japanese.
> る-verbs: drop る, add て. たべる → たべて, みる → みて

### Lesson 9.2: て-form for う-verbs
**Explanation:**
> う-verbs have pattern-based rules:
> う/つ/る → って (かう→かって)
> む/ぶ/ぬ → んで (のむ→のんで)
> く → いて (かく→かいて), exception: いく→いって
> ぐ → いで (およぐ→およいで)
> す → して (はなす→はなして)

### Lesson 9.3: Please Do...
**Grammar:** てください = "please do ~"
> まってください = "Please wait"
> みてください = "Please look"

### Lesson 9.4: May I? / Don't!
**Grammar:** てもいいですか (may I?), てはいけません (must not)
> しゃしんをとってもいいですか = "May I take a photo?"

### Lesson 9.5: I'm Doing...
**Grammar:** ている = ongoing action / state
> いまたべています = "I'm eating now"
> とうきょうにすんでいます = "I live in Tokyo"

### Lesson 9.6: After Doing...
**Grammar:** てから = "after doing ~"
> ごはんをたべてから、べんきょうします = "After eating, I'll study"

### Lesson 9.7: Giving & Receiving
**New words:** あげる (give), もらう (receive), くれる (give to me)
> ともだちにほんをあげました = "I gave a book to my friend"

### Lesson 9.8: Unit 9 Review

---

## Unit 10: Review & Beyond

**Theme:** Comprehensive review, comparison, experiences
**Grammar:** たことがある, より～のほうが, ～ましょう
**Vocabulary:** ~15 words + review

### Lesson 10.1: Have You Ever...?
**Grammar:** たことがある = "have done before"
> にほんにいったことがあります = "I have been to Japan"

### Lesson 10.2: Let's...!
**Grammar:** ましょう / ましょうか
> いきましょう = "Let's go!"
> てつだいましょうか = "Shall I help?"

### Lesson 10.3: Comparing
**Grammar:** より～のほうが, いちばん
> にほんごはちゅうごくごよりかんたんです = "Japanese is easier than Chinese"

### Lesson 10.4: I Should...
**Grammar:** ほうがいい (should/had better)
> やすんだほうがいいです = "You should rest"

### Lesson 10.5-10.6: Reading Practice
Short passages combining all grammar and vocabulary.

### Lesson 10.7-10.8: Final Review
Comprehensive review of all 10 units.

---

## Appendix A: Full Vocabulary List by Unit

| Unit | Words | Cumulative |
|------|-------|-----------|
| 1 | 24 | 24 |
| 2 | 22 | 46 |
| 3 | 24 | 70 |
| 4 | 25 | 95 |
| 5 | 22 | 117 |
| 6 | 24 | 141 |
| 7 | 24 | 165 |
| 8 | 20 | 185 |
| 9 | 20 | 205 |
| 10 | 15 | 220 |

Total: ~220 vocabulary words (core N5 subset)

## Appendix B: Grammar Points by Unit

| Unit | Grammar Points |
|------|---------------|
| 1 | は, です (1.3), か (1.5), じゃないです (1.6), から+きました (1.7) |
| 2 | これ/それ/あれ (2.1), この/その/あの (2.2), の (2.3), も (2.4), ここ/そこ/あそこ/どこ (2.5), どれ/どの (2.6) |
| 3 | い-adjectives, な-adjectives, adjective negation/past |
| 4 | Numbers, counters, に (time), から...まで |
| 5 | がある/がいる, に (location), で (location of action) |
| 6 | ます form, を, に/へ (direction), で (means) |
| 7 | をください, たい, food-related expressions |
| 8 | Past tense, から, けど, ので, と/や |
| 9 | て-form, てください, てもいい, てはいけない, ている |
| 10 | たことがある, ましょう, comparison, ほうがいい |

Total: ~40 grammar points (core N5)

## Appendix C: Exercise Type Distribution

Target per lesson (~10-12 exercises):
- Multiple choice: 2-3 (recognition)
- Matching: 1-2 (rapid review)
- Fill-in-blank: 2-3 (particles, grammar)
- Word ordering: 2-3 (sentence building)
- Translation: 1-2 (production)
- Listening: 1 (when audio available)
