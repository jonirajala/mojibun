# Yappari - Course V2 (Duolingo-style pacing)

## Design Philosophy

This is a restructured version of Units 1-2, spread much thinner with more repetition
and smaller increments. The goal is to match the pacing of Duolingo/LingoDeer:

- **Max 2-3 new vocabulary words per lesson** (was 3-6)
- **Max 1 grammar point per lesson** (was sometimes 2)
- **12-15 exercises per lesson** (was 8-12)
- **4-5 review exercises per lesson** from previous material (~30-40% review)
- **Practice/review lessons** after every 2-3 content lessons
- **5-6 lessons per unit** instead of 8
- **~35-40 lessons** covering what was previously 16 lessons (Units 1-2)

### Unit Structure Template

Each unit follows this internal pattern:
1. **Lesson 1:** Vocab intro (2-3 new words) + recognition exercises
2. **Lesson 2:** More vocab (2-3 new words) + recognition + review of lesson 1
3. **Lesson 3:** Grammar intro + practice with known vocab + review
4. **Lesson 4:** Practice/consolidation (all unit material + heavy review of previous units)
5. **Lesson 5:** Mini-review/quiz (mixed exercises from this unit + previous units)
6. **Optional Lesson 6:** Extra practice if the unit had complex grammar

### Exercise Distribution Per Lesson

| Lesson Type | New Exercises | Review Exercises | Total |
|-------------|--------------|-----------------|-------|
| Vocab intro | 8-9 | 4-5 | 13 |
| Vocab + review | 7-8 | 5-6 | 13 |
| Grammar intro | 8-9 | 4-5 | 13 |
| Practice/consolidation | 0 | 13-14 | 14 |
| Mini-review/quiz | 0 | 14-15 | 15 |

### Exercise Type Key
- `MC` = multiple_choice
- `MA` = matching
- `KB` = kana_build
- `FB` = fill_blank
- `WO` = word_order

---

## Course Overview (Units 1-2 content, redistributed)

```
Course V2: Units 1-6 (~37 lessons)
├── Unit 1: Hello! (5 lessons) — Basic greetings
├── Unit 2: Please & Thank You (5 lessons) — Polite phrases, yes/no
├── Unit 3: I Am... (6 lessons) — は/です, self-intro, occupations
├── Unit 4: What Is This? (6 lessons) — これ/それ/あれ, objects
├── Unit 5: My Things (6 lessons) — この/その/あの, の (possession), objects
└── Unit 6: Also & Where? (6 lessons) — も, ここ/そこ/あそこ/どこ, どれ/どの
```

**Old structure:** 2 units, 16 lessons, ~46 words, ~10 grammar points
**New structure:** 6 units, 34 lessons + 3 bonus practice = 37 lessons, ~46 words, ~10 grammar points

---

## Cumulative Vocabulary & Grammar Tracker

This table shows what the student knows after completing each unit:

| After Unit | Total Vocab | Total Grammar | Cumulative Words |
|------------|-------------|---------------|-----------------|
| 1 | 7 | 0 | こんにちは おはようございます こんばんは さようなら おやすみなさい いただきます ごちそうさまでした |
| 2 | 14 | 0 | + ありがとうございます すみません はい いいえ おねがいします どうも おはよう |
| 3 | 24 | 3 (は, です, か) | + わたし がくせい せんせい です なまえ おなまえは さん か じゃないです ともだち |
| 4 | 32 | 5 (+これ/それ/あれ, なん) | + これ それ あれ なん ほん ペン かばん でんわ |
| 5 | 41 | 8 (+この/その/あの, の) | + この その あの の とけい くるま かさ テーブル いす |
| 6 | 50 | 10 (+も, ここ/そこ/あそこ/どこ, どれ/どの) | + も ここ そこ あそこ どこ どれ どの トイレ えき |

---

## Unit 1: Hello!

**Theme:** Basic greetings — saying hello and goodbye at different times of day
**Grammar:** None (pure vocabulary, set phrases)
**New vocabulary:** 7 words across 3 content lessons
**Review material:** None (first unit)

---

### Lesson 1.1: Good Morning, Good Afternoon

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| こんにちは | konnichiwa | hello / good afternoon |
| おはようございます | ohayou gozaimasu | good morning |

**Grammar:** None
**Review:** None (first lesson ever)
**Lesson flow:** vocab_intro → recognition → spelling

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'hello'?" → こんにちは / おはようございます | New |
| 2 | MC | "What does おはようございます mean?" → Good morning / Hello / Goodbye / Excuse me | New |
| 3 | MC | "You meet a friend at 3pm. You say:" → こんにちは | New |
| 4 | MC | "You arrive at school at 8am. You say:" → おはようございます | New |
| 5 | MA | Match こんにちは, おはようございます to hello, good morning | New |
| 6 | KB | Build こんにちは from kana: こ ん に ち は (distractors: か, す, お) | New |
| 7 | MC | "It's lunchtime. You greet your coworker. You say:" → こんにちは | New |
| 8 | KB | Build おはよう from kana: お は よ う (distractors: こ, に, ち) | New |
| 9 | MC | "Which greeting is for the morning?" → おはようございます | New |
| 10 | MC | Hear こんにちは, pick correct text from options | New |
| 11 | MA | Match again: こんにちは, おはようございます to meanings (reinforcement) | New |
| 12 | MC | "It's 7am. What do you say?" → おはようございます | New |
| 13 | KB | Build こんにちは again (faster recognition) | New |

---

### Lesson 1.2: Good Evening, Goodbye

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| こんばんは | konbanwa | good evening |
| さようなら | sayounara | goodbye |

**Grammar:** None
**Review:** L1.1 (こんにちは, おはようございます)
**Lesson flow:** vocab_intro → recognition → spelling → review

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'good evening'?" → こんばんは | New |
| 2 | MC | "What does さようなら mean?" → Goodbye / Good evening / Hello / Good morning | New |
| 3 | MC | "It's 8pm. You greet someone. You say:" → こんばんは | New |
| 4 | MC | "You're leaving for the day. You say:" → さようなら | New |
| 5 | MA | Match こんばんは, さようなら to good evening, goodbye | New |
| 6 | KB | Build こんばんは from kana: こ ん ば ん は (distractors: に, ち, よ) | New |
| 7 | MC | "Which is a farewell, not a greeting?" → さようなら | New |
| 8 | KB | Build さようなら from kana: さ よ う な ら (distractors: こ, ん, は) | New |
| 9 | MC | **Review L1.1:** "You arrive at school at 8am. You say:" → おはようございます | Review |
| 10 | MC | **Review L1.1:** "Which means 'hello'?" → こんにちは | Review |
| 11 | MA | Match all 4 words: こんにちは, おはようございます, こんばんは, さようなら | Review |
| 12 | MC | "It's 2pm. What do you say?" → こんにちは | Review |
| 13 | MC | "It's 9pm. You greet a neighbor. You say:" → こんばんは | New |

---

### Lesson 1.3: Good Night & Mealtime

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| おやすみなさい | oyasuminasai | good night |
| いただきます | itadakimasu | bon appetit (before eating) |
| ごちそうさまでした | gochisousama deshita | thank you for the meal (after eating) |

**Grammar:** None
**Review:** L1.1-1.2 (こんにちは, おはようございます, こんばんは, さようなら)
**Lesson flow:** vocab_intro → recognition → spelling → review

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which phrase do you say before going to bed?" → おやすみなさい | New |
| 2 | MC | "What do you say before eating?" → いただきます | New |
| 3 | MC | "What do you say after finishing a meal?" → ごちそうさまでした | New |
| 4 | MA | Match おやすみなさい, いただきます, ごちそうさまでした to meanings | New |
| 5 | MC | "You're about to eat dinner. You say:" → いただきます | New |
| 6 | MC | "You just finished lunch. You say:" → ごちそうさまでした | New |
| 7 | KB | Build おやすみ from kana: お や す み (distractors: こ, ん, は) | New |
| 8 | KB | Build いただきます from kana: い た だ き ま す (distractors: ご, ち, そ) | New |
| 9 | MC | "It's 11pm. You say goodnight:" → おやすみなさい | New |
| 10 | MC | **Review L1.1:** "Which means 'good morning'?" → おはようございます | Review |
| 11 | MC | **Review L1.2:** "You're leaving. You say:" → さようなら | Review |
| 12 | MA | Match all 7 Unit 1 words to meanings (mixed) | Review |
| 13 | MC | **Review L1.2:** "It's 8pm. You greet someone:" → こんばんは | Review |
| 14 | MC | "Which comes AFTER eating?" → ごちそうさまでした | New |

---

### Lesson 1.4: Practice — All Greetings

**New vocabulary:** None
**Grammar:** None
**Review:** All Unit 1 (7 words from L1.1-1.3)
**Lesson flow:** Mixed review, consolidation

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match all 7 words to meanings (timed feel) | Review |
| 2 | MC | "It's 7:30am. You see your neighbor. You say:" → おはようございます | Review |
| 3 | MC | "It's noon. You greet a friend:" → こんにちは | Review |
| 4 | MC | "It's 7pm. You arrive at a party:" → こんばんは | Review |
| 5 | MC | "You're heading home. You say:" → さようなら | Review |
| 6 | MC | "You're about to eat sushi. You say:" → いただきます | Review |
| 7 | MC | "You finished your ramen. You say:" → ごちそうさまでした | Review |
| 8 | MC | "It's bedtime. You say:" → おやすみなさい | Review |
| 9 | KB | Build こんばんは from kana | Review |
| 10 | KB | Build さようなら from kana | Review |
| 11 | MA | Match: おはようございます, こんにちは, こんばんは, おやすみなさい to morning, afternoon, evening, night | Review |
| 12 | MC | "Which two phrases are about meals?" → いただきます, ごちそうさまでした | Review |
| 13 | KB | Build いただきます from kana | Review |
| 14 | MC | "Friend says こんにちは. What time is it likely?" → Afternoon | Review |

---

### Lesson 1.5: Unit 1 Quiz

**New vocabulary:** None
**Grammar:** None
**Review:** Full Unit 1 — all 7 words
**Lesson flow:** Quiz format, mixed exercises, slightly harder

**Exercises (15):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "What does こんにちは mean?" → hello | Review |
| 2 | MC | "What does おはようございます mean?" → good morning | Review |
| 3 | MA | Match all 7 words to English meanings | Review |
| 4 | MC | "You're going to sleep. You say:" → おやすみなさい | Review |
| 5 | KB | Build ごちそうさまでした from kana (hard — long word) | Review |
| 6 | MC | "Pick the WRONG pairing:" → こんばんは = good morning (trap) | Review |
| 7 | MC | "Which phrase means 'goodbye'?" → さようなら | Review |
| 8 | KB | Build こんにちは from kana | Review |
| 9 | MC | "Before eating, you say ___. After eating, you say ___." → いただきます, ごちそうさまでした | Review |
| 10 | MC | "It's 6am. You greet someone:" → おはようございます | Review |
| 11 | MA | Match time-of-day to greeting: morning→おはよう, afternoon→こんにちは, evening→こんばんは, night→おやすみなさい | Review |
| 12 | KB | Build おはようございます from kana | Review |
| 13 | MC | "Which is NOT a greeting?" → いただきます | Review |
| 14 | MC | "You leave a restaurant after dinner. You say:" → ごちそうさまでした | Review |
| 15 | KB | Build さようなら from kana | Review |

---

## Unit 2: Please & Thank You

**Theme:** Polite expressions, yes/no, casual thanks
**Grammar:** None (pure vocabulary, set phrases)
**New vocabulary:** 7 words across 3 content lessons
**Review material:** Unit 1 (greetings)

---

### Lesson 2.1: Thank You & Excuse Me

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| ありがとうございます | arigatou gozaimasu | thank you |
| すみません | sumimasen | excuse me / sorry |

**Grammar:** None
**Review:** Unit 1 (greetings)

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'thank you'?" → ありがとうございます | New |
| 2 | MC | "Someone bumps into you. They say:" → すみません | New |
| 3 | MC | "Someone helps you carry bags. You say:" → ありがとうございます | New |
| 4 | MC | "You need to get past someone on the train. You say:" → すみません | New |
| 5 | MA | Match ありがとうございます, すみません to thank you, excuse me | New |
| 6 | KB | Build ありがとう from kana: あ り が と う (distractors: す, み, ま) | New |
| 7 | KB | Build すみません from kana: す み ま せ ん (distractors: あ, り, が) | New |
| 8 | MC | "すみません can also mean:" → sorry | New |
| 9 | MC | **Review U1:** "It's 8am. You say:" → おはようございます | Review |
| 10 | MC | **Review U1:** "Which means 'goodbye'?" → さようなら | Review |
| 11 | MA | **Review U1:** Match こんにちは, こんばんは, おやすみなさい to meanings | Review |
| 12 | MC | "A stranger drops their wallet. You call out:" → すみません | New |
| 13 | MC | **Review U1:** "Before eating, you say:" → いただきます | Review |

---

### Lesson 2.2: Yes & No

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| はい | hai | yes |
| いいえ | iie | no |

**Grammar:** None
**Review:** L2.1 + Unit 1

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'yes'?" → はい | New |
| 2 | MC | "Which means 'no'?" → いいえ | New |
| 3 | MC | "Someone asks if you want tea. You do. You say:" → はい | New |
| 4 | MC | "Someone asks if you're finished. You're not. You say:" → いいえ | New |
| 5 | MA | Match はい, いいえ to yes, no | New |
| 6 | KB | Build はい from kana: は い (distractors: い い え, す) | New |
| 7 | KB | Build いいえ from kana: い い え (distractors: は, す, み) | New |
| 8 | MC | "はい is the opposite of:" → いいえ | New |
| 9 | MC | **Review L2.1:** "Which means 'thank you'?" → ありがとうございます | Review |
| 10 | MC | **Review L2.1:** "You accidentally step on someone's foot. You say:" → すみません | Review |
| 11 | MC | **Review U1:** "It's 10pm, time for bed. You say:" → おやすみなさい | Review |
| 12 | MA | **Review:** Match ありがとうございます, すみません, はい, いいえ to meanings | Review |
| 13 | MC | **Review U1:** "You just finished eating. You say:" → ごちそうさまでした | Review |

---

### Lesson 2.3: Please & Casual Thanks

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| おねがいします | onegaishimasu | please |
| どうも | doumo | thanks (casual) |
| おはよう | ohayou | morning (casual) |

**Grammar:** None
**Note:** おはよう is introduced as the casual form of おはようございます from Unit 1.
**Review:** L2.1-2.2 + Unit 1

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'please'?" → おねがいします | New |
| 2 | MC | "Which is a casual way to say 'thanks'?" → どうも | New |
| 3 | MC | "おはよう is the casual form of:" → おはようございます | New |
| 4 | MC | "You want water at a restaurant. You say: みず, ___" → おねがいします | New |
| 5 | MA | Match おねがいします, どうも, おはよう to please, thanks (casual), morning (casual) | New |
| 6 | KB | Build おねがいします from kana: お ね が い し ま す | New |
| 7 | MC | "A friend passes you a pen. You say casually:" → どうも | New |
| 8 | KB | Build どうも from kana: ど う も (distractors: お, ね, が) | New |
| 9 | MC | **Review L2.2:** "Someone asks if you want coffee. You do:" → はい | Review |
| 10 | MC | **Review L2.1:** "Which means 'excuse me'?" → すみません | Review |
| 11 | MC | **Review U1:** "It's 3pm. You greet someone:" → こんにちは | Review |
| 12 | MA | **Review:** Match はい, いいえ, ありがとうございます, すみません to meanings | Review |
| 13 | MC | **Review U1:** "Which means 'good night'?" → おやすみなさい | Review |
| 14 | MC | "おねがいします is more polite than どうも. True?" → はい | New |

---

### Lesson 2.4: Practice — Polite Phrases

**New vocabulary:** None
**Grammar:** None
**Review:** All Unit 2 (7 words) + Unit 1 (7 words)

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match all 7 Unit 2 words to meanings | Review |
| 2 | MC | "Someone gives you a gift. You say:" → ありがとうございます | Review |
| 3 | MC | "You want the check at a restaurant. You say: ___" → すみません | Review |
| 4 | MC | "A friend asks: Coffee? You want some. You say:" → はい | Review |
| 5 | MC | "You don't want more rice. You say:" → いいえ | Review |
| 6 | MC | "You'd like a window seat. You add: まどがわ, ___" → おねがいします | Review |
| 7 | MC | "A classmate lends you an eraser. You say quickly:" → どうも | Review |
| 8 | KB | Build ありがとうございます from kana | Review |
| 9 | KB | Build すみません from kana | Review |
| 10 | MC | **Review U1:** "It's morning. You say casually:" → おはよう | Review |
| 11 | MC | **Review U1:** "You leave school. You say:" → さようなら | Review |
| 12 | MA | **Review U1:** Match all greetings to time of day | Review |
| 13 | MC | **Review U1:** "Before eating:" → いただきます | Review |
| 14 | MC | "Which is more formal: どうも or ありがとうございます?" → ありがとうございます | Review |

---

### Lesson 2.5: Unit 2 Quiz

**New vocabulary:** None
**Grammar:** None
**Review:** All Units 1-2 (14 words total)

**Exercises (15):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match 7 Unit 2 words to meanings | Review |
| 2 | MC | "Someone holds the door for you. You say:" → ありがとうございます | Review |
| 3 | MC | "You bump into someone. You say:" → すみません | Review |
| 4 | MC | "Do you understand? You do. You say:" → はい | Review |
| 5 | MC | "Do you want more? You don't. You say:" → いいえ | Review |
| 6 | KB | Build おねがいします from kana | Review |
| 7 | MC | "A colleague hands you a paper. Quick thanks:" → どうも | Review |
| 8 | MC | "Pick the WRONG pairing:" → はい = no (trap) | Review |
| 9 | MC | **Review U1:** "It's evening. You greet someone:" → こんばんは | Review |
| 10 | MC | **Review U1:** "It's bedtime. You say:" → おやすみなさい | Review |
| 11 | MA | **Review U1+2:** Match 8 mixed words from both units | Review |
| 12 | KB | Build ありがとう from kana | Review |
| 13 | MC | **Review U1:** "After finishing a meal:" → ごちそうさまでした | Review |
| 14 | MC | "Casual morning greeting:" → おはよう | Review |
| 15 | MC | "Formal morning greeting:" → おはようございます | Review |

---

## Unit 3: I Am...

**Theme:** Self-introduction, basic sentence structure, occupations, questions, negation
**Grammar:** は + です (L3.2), おなまえは set phrase (L3.3), か question particle (L3.5), じゃないです (L3.5)
**New vocabulary:** 10 words across 4 content lessons
**Review material:** Units 1-2

---

### Lesson 3.1: I, Student, Teacher

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| わたし | watashi | I, me |
| がくせい | gakusei | student |
| せんせい | sensei | teacher |

**Grammar:** None (vocab only — grammar in next lesson)
**Review:** Units 1-2

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'I' or 'me'?" → わたし | New |
| 2 | MC | "Which means 'student'?" → がくせい | New |
| 3 | MC | "Which means 'teacher'?" → せんせい | New |
| 4 | MA | Match わたし, がくせい, せんせい to I, student, teacher | New |
| 5 | KB | Build わたし from kana: わ た し (distractors: が, く, せ) | New |
| 6 | KB | Build がくせい from kana: が く せ い (distractors: わ, た, し) | New |
| 7 | KB | Build せんせい from kana: せ ん せ い (distractors: が, く, わ) | New |
| 8 | MC | "A person who teaches is a:" → せんせい | New |
| 9 | MC | "A person who studies is a:" → がくせい | New |
| 10 | MC | **Review U2:** "Which means 'thank you'?" → ありがとうございます | Review |
| 11 | MC | **Review U2:** "Which means 'please'?" → おねがいします | Review |
| 12 | MC | **Review U1:** "It's morning. Formal greeting:" → おはようございます | Review |
| 13 | MA | **Review U1:** Match こんにちは, こんばんは, さようなら to meanings | Review |

---

### Lesson 3.2: X は Y です (I Am a Student)

**New vocabulary (1 word):**
| Japanese | Reading | English |
|----------|---------|---------|
| です | desu | am / is / are (polite copula) |

**Grammar:** は (topic particle) + です (copula) — "X は Y です"
**grammar_intro:**
> は (pronounced "wa" as a particle) marks the topic of the sentence.
> です means "is/am/are" and makes the sentence polite.
> わたし は がくせい です = "I am a student"

**Review:** L3.1 + Units 1-2

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "What does です mean?" → am / is / are | New |
| 2 | MC | "わたしはがくせいです means:" → I am a student | New |
| 3 | FB | "わたし ＿ がくせいです" → は | New |
| 4 | FB | "わたしは がくせい ＿" → です | New |
| 5 | WO | Build: わたし / は / がくせい / です → わたしはがくせいです | New |
| 6 | MC | "How do you say 'I am a teacher'?" → わたしはせんせいです | New |
| 7 | WO | Build: わたし / は / せんせい / です | New |
| 8 | FB | "わたしは ＿ です" (picture of student) → がくせい | New |
| 9 | MC | "は is pronounced ___ when used as a particle:" → wa | New |
| 10 | MC | **Review U2:** "Which means 'yes'?" → はい | Review |
| 11 | MC | **Review U2:** "Quick casual thanks:" → どうも | Review |
| 12 | MC | **Review U1:** "Before eating:" → いただきます | Review |
| 13 | MA | **Review U1:** Match おはようございます, こんにちは, こんばんは, おやすみなさい to time of day | Review |
| 14 | KB | **Review L3.1:** Build せんせい from kana | Review |

---

### Lesson 3.3: What's Your Name?

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| なまえ | namae | name |
| おなまえは？ | onamae wa? | What is your name? (set phrase) |
| ～さん | -san | Mr. / Ms. / Mrs. |

**Grammar:** None new (おなまえは？ taught as a set phrase; uses は/です from L3.2)
**Note:** おなまえは？ is a fixed conversational phrase, not decomposed grammatically. Students use わたしは [name] です to answer.
**Review:** L3.1-3.2 + Units 1-2

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "What does なまえ mean?" → name | New |
| 2 | MC | "おなまえは？ means:" → What is your name? | New |
| 3 | MC | "How do you politely address someone named Tanaka?" → たなかさん | New |
| 4 | MA | Match なまえ, おなまえは, さん to name, What is your name?, Mr./Ms. | New |
| 5 | WO | Build: わたし / は / たなか / です → わたしはたなかです | New |
| 6 | MC | "Someone asks おなまえは？ You are Yamada. You say:" → わたしはやまだです | New |
| 7 | FB | "わたし ＿ たなかです" → は | New |
| 8 | KB | Build なまえ from kana: な ま え (distractors: お, は, わ) | New |
| 9 | MC | **Review L3.2:** "わたしはがくせいです means:" → I am a student | Review |
| 10 | FB | **Review L3.2:** "わたしは せんせい ＿" → です | Review |
| 11 | MC | **Review U2:** "You bump into someone. You say:" → すみません | Review |
| 12 | MC | **Review U1:** "You leave for the day. You say:" → さようなら | Review |
| 13 | WO | Build: わたし / は / やまだ / です | Review |

---

### Lesson 3.4: Questions & Nationalities

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| か | ka | ? (question particle) |
| にほんじん | nihonjin | Japanese person |
| アメリカじん | amerikajin | American person |

**Grammar:** か (question particle) — add か to the end of a statement to make it a question
**grammar_intro:**
> Add か to the end of a sentence to make it a question.
> がくせいですか？ = "Are you a student?"
> はい、がくせいです。/ いいえ、がくせいじゃないです。

**Note:** ～じん (nationality suffix) taught here as vocabulary, not as a grammar pattern.
**Review:** L3.1-3.3 + Units 1-2

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "How do you make a question in Japanese?" → Add か to the end | New |
| 2 | FB | "がくせいです ＿" (to make it a question) → か | New |
| 3 | MC | "がくせいですか means:" → Are you a student? | New |
| 4 | MC | "にほんじん means:" → Japanese person | New |
| 5 | MC | "アメリカじん means:" → American person | New |
| 6 | WO | Build: たなかさん / は / にほんじん / です / か | New |
| 7 | FB | "はい、にほんじん ＿" → です | New |
| 8 | WO | Build: わたし / は / アメリカじん / です | New |
| 9 | KB | Build にほんじん from kana: に ほ ん じ ん | New |
| 10 | MC | **Review L3.3:** "おなまえは means:" → What is your name? | Review |
| 11 | FB | **Review L3.2:** "わたし ＿ せんせいです" → は | Review |
| 12 | MC | **Review U2:** "Which means 'no'?" → いいえ | Review |
| 13 | MC | **Review U1:** "After finishing a meal:" → ごちそうさまでした | Review |
| 14 | MA | **Review:** Match わたし, がくせい, せんせい, なまえ to meanings | Review |

---

### Lesson 3.5: Not a Doctor (Negation)

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| じゃないです | ja nai desu | is not (polite negative) |
| ともだち | tomodachi | friend |
| いしゃ | isha | doctor |

**Grammar:** じゃないです (negative copula) — X は Y じゃないです = "X is not Y"
**grammar_intro:**
> To say "is not", replace です with じゃないです.
> わたしはせんせいじゃないです = "I am not a teacher"
> いいえ、がくせいじゃないです。= "No, I am not a student."

**Review:** L3.1-3.4 + Units 1-2

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "What does ともだち mean?" → friend | New |
| 2 | MC | "What does いしゃ mean?" → doctor | New |
| 3 | MC | "What is the negative of です?" → じゃないです | New |
| 4 | FB | "わたしはせんせい ＿" (negative) → じゃないです | New |
| 5 | MC | "わたしはいしゃじゃないです means:" → I am not a doctor | New |
| 6 | WO | Build: たなかさん / は / がくせい / じゃないです | New |
| 7 | MC | "Your friend asks がくせいですか？ You are not. You say:" → いいえ、がくせいじゃないです | New |
| 8 | WO | Build: わたし / は / いしゃ / じゃないです | New |
| 9 | FB | "いいえ、にほんじん ＿" → じゃないです | New |
| 10 | MC | **Review L3.4:** "がくせいですか means:" → Are you a student? | Review |
| 11 | FB | **Review L3.4:** "せんせいです ＿" (to ask) → か | Review |
| 12 | MC | **Review U2:** "Which means 'excuse me'?" → すみません | Review |
| 13 | MA | **Review:** Match ともだち, いしゃ, がくせい, せんせい to friend, doctor, student, teacher | Review |
| 14 | MC | **Review U1:** "It's 3pm. You greet someone:" → こんにちは | Review |

---

### Lesson 3.6: Nice to Meet You (Self-Introduction)

**New vocabulary (3 bonus words — introduction phrases):**
| Japanese | Reading | English |
|----------|---------|---------|
| はじめまして | hajimemashite | nice to meet you |
| どうぞよろしく | douzo yoroshiku | pleased to meet you |
| ～からきました | kara kimashita | came from ~ |

**Grammar:** から + きました (origin) — Place + から + きました = "came from Place"
**grammar_intro:**
> から means "from". Combined with きました (came), it expresses where someone is from.
> アメリカからきました = "I came from America"

**Review:** All Unit 3 + Units 1-2

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which phrase do you say when meeting someone for the first time?" → はじめまして | New |
| 2 | MC | "What does どうぞよろしく mean?" → Pleased to meet you | New |
| 3 | MC | "から means:" → from | New |
| 4 | FB | "にほん ＿ きました" → から | New |
| 5 | WO | Build: アメリカ / から / きました | New |
| 6 | WO | Build: はじめまして / わたし / は / たなか / です / どうぞよろしく | New |
| 7 | KB | Build はじめまして from kana: は じ め ま し て | New |
| 8 | MC | "Complete the self-introduction: はじめまして、わたしはたなかです。にほん___きました。" → から | New |
| 9 | FB | **Review L3.5:** "わたしはいしゃ ＿" → じゃないです | Review |
| 10 | MC | **Review L3.4:** "にほんじんですか means:" → Are you Japanese? | Review |
| 11 | WO | **Review L3.2:** Build: わたし / は / がくせい / です | Review |
| 12 | MC | **Review U2:** "Which means 'thank you'?" → ありがとうございます | Review |
| 13 | MC | **Review U1:** "Good evening:" → こんばんは | Review |
| 14 | MA | **Review:** Match はじめまして, どうぞよろしく, からきました to nice to meet you, pleased to meet you, came from | Review |

---

### BONUS Lesson 3.7: Unit 3 Mega Review

**New vocabulary:** None
**Grammar:** None
**Review:** All Unit 3 (10 words, 3 grammar points) + Units 1-2 (14 words)
**Note:** This is a 6th lesson for Unit 3 because it introduced complex grammar.

**Exercises (15):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match all Unit 3 occupation/people words: がくせい, せんせい, ともだち, いしゃ, にほんじん, アメリカじん | Review |
| 2 | WO | Build a self-introduction: はじめまして / わたし / は / やまだ / です | Review |
| 3 | FB | "わたし ＿ がくせいです" → は | Review |
| 4 | FB | "がくせいです ＿" (question) → か | Review |
| 5 | FB | "わたしはせんせい ＿" (negative) → じゃないです | Review |
| 6 | WO | Build: アメリカ / から / きました | Review |
| 7 | MC | "おなまえは means:" → What is your name? | Review |
| 8 | WO | Build: たなかさん / は / にほんじん / です / か | Review |
| 9 | MC | "わたしはいしゃじゃないです means:" → I am not a doctor | Review |
| 10 | FB | "にほん ＿ きました" → から | Review |
| 11 | MC | **Review U2:** "You want to say 'please':" → おねがいします | Review |
| 12 | MC | **Review U1:** "Before eating:" → いただきます | Review |
| 13 | WO | Build: わたし / も / がくせい / です (preview of も — exposure only) | Review |
| 14 | MA | **Review U1+2:** Match 6 mixed words from Units 1-2 | Review |
| 15 | MC | "Someone says はじめまして. You reply:" → どうぞよろしく | Review |

---

## Unit 4: What Is This?

**Theme:** Demonstrative pronouns, common objects, asking about things
**Grammar:** これ/それ/あれ (L4.2), なん (L4.2)
**New vocabulary:** 8 words across 3 content lessons
**Review material:** Units 1-3

---

### Lesson 4.1: Book & Pen

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| ほん | hon | book |
| ペン | pen | pen |

**Grammar:** None (vocab only — demonstratives in next lesson)
**Review:** Unit 3

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'book'?" → ほん | New |
| 2 | MC | "Which means 'pen'?" → ペン | New |
| 3 | MA | Match ほん, ペン to book, pen | New |
| 4 | KB | Build ほん from kana: ほ ん (distractors: ペ, は, か) | New |
| 5 | KB | Build ペン from katakana: ペ ン (distractors: ほ, ん, テ) | New |
| 6 | MC | "You write with a:" → ペン | New |
| 7 | MC | "You read a:" → ほん | New |
| 8 | MC | "ペン uses katakana because it is:" → a foreign word | New |
| 9 | MC | **Review U3:** "わたしはがくせいです means:" → I am a student | Review |
| 10 | FB | **Review U3:** "わたし ＿ せんせいです" → は | Review |
| 11 | MC | **Review U2:** "Which means 'yes'?" → はい | Review |
| 12 | MC | **Review U1:** "Goodbye:" → さようなら | Review |
| 13 | MA | **Review U3:** Match わたし, がくせい, せんせい, なまえ to meanings | Review |

---

### Lesson 4.2: This, That, That Over There

**New vocabulary (4 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| これ | kore | this (thing here) |
| それ | sore | that (thing near you) |
| あれ | are | that (thing over there) |
| なん | nan | what |

**Grammar:** これ/それ/あれ (demonstrative pronouns) — standalone words for "this/that/that over there"
**grammar_intro:**
> これ = this (near me), それ = that (near you), あれ = that (far from both)
> これはなんですか？ = "What is this?"
> これはほんです。 = "This is a book."

**Review:** L4.1 + Units 1-3

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'this'?" → これ | New |
| 2 | MC | "Which means 'that' (near the listener)?" → それ | New |
| 3 | MC | "Which means 'that over there'?" → あれ | New |
| 4 | MC | "なん means:" → what | New |
| 5 | MA | Match これ, それ, あれ, なん to this, that, that over there, what | New |
| 6 | FB | "＿ はほんです" (pointing at something near you) → これ | New |
| 7 | FB | "＿ はペンです" (pointing at something far away) → あれ | New |
| 8 | WO | Build: これ / は / なん / です / か → これはなんですか | New |
| 9 | MC | "これはなんですか means:" → What is this? | New |
| 10 | WO | Build: それ / は / ほん / です | New |
| 11 | MC | **Review L4.1:** "You write with a:" → ペン | Review |
| 12 | MC | **Review U3:** "がくせいですか means:" → Are you a student? | Review |
| 13 | FB | **Review U3:** "わたしはいしゃ ＿" (negative) → じゃないです | Review |
| 14 | MC | **Review U2:** "Which means 'excuse me'?" → すみません | Review |

---

### Lesson 4.3: Bag & Phone

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| かばん | kaban | bag |
| でんわ | denwa | phone |

**Grammar:** None (practice demonstratives from L4.2 with new vocab)
**Review:** L4.1-4.2 + Units 1-3

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'bag'?" → かばん | New |
| 2 | MC | "Which means 'phone'?" → でんわ | New |
| 3 | MA | Match かばん, でんわ to bag, phone | New |
| 4 | KB | Build かばん from kana: か ば ん (distractors: で, ん, わ) | New |
| 5 | KB | Build でんわ from kana: で ん わ (distractors: か, ば, ほ) | New |
| 6 | FB | "これは ＿ です" (picture of bag) → かばん | New |
| 7 | WO | Build: あれ / は / でんわ / です | New |
| 8 | MC | "それはかばんです means:" → That is a bag | New |
| 9 | MC | **Review L4.2:** "これはなんですか means:" → What is this? | Review |
| 10 | FB | **Review L4.2:** "＿ はほんです" (near me) → これ | Review |
| 11 | MA | **Review:** Match ほん, ペン, かばん, でんわ to book, pen, bag, phone | Review |
| 12 | MC | **Review U3:** "はじめまして means:" → Nice to meet you | Review |
| 13 | MC | **Review U1:** "After finishing a meal:" → ごちそうさまでした | Review |

---

### Lesson 4.4: Practice — What Is This/That?

**New vocabulary:** None
**Grammar:** None
**Review:** All Unit 4 (8 words) + Units 1-3

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match これ, それ, あれ to this, that, that over there | Review |
| 2 | FB | "これは ＿ です" (picture of pen) → ペン | Review |
| 3 | WO | Build: これ / は / なん / です / か | Review |
| 4 | MC | "あれはでんわです means:" → That (over there) is a phone | Review |
| 5 | FB | "＿ はかばんです" (thing near listener) → それ | Review |
| 6 | WO | Build: あれ / は / ほん / です | Review |
| 7 | MC | "これはかばんですか means:" → Is this a bag? | Review |
| 8 | FB | "それは ＿ です" (picture of book) → ほん | Review |
| 9 | WO | Build: これ / は / でんわ / です / か | Review |
| 10 | MC | **Review U3:** "わたしはせんせいじゃないです means:" → I am not a teacher | Review |
| 11 | FB | **Review U3:** "にほん ＿ きました" → から | Review |
| 12 | MC | **Review U2:** "Casual thanks:" → どうも | Review |
| 13 | MC | **Review U1:** "Good morning (formal):" → おはようございます | Review |
| 14 | MA | **Review:** Match all 4 objects: ほん, ペン, かばん, でんわ to English | Review |

---

### Lesson 4.5: Unit 4 Quiz

**New vocabulary:** None
**Grammar:** None
**Review:** All Unit 4 + Units 1-3

**Exercises (15):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match これ, それ, あれ, なん to meanings | Review |
| 2 | MC | "これはなんですか — pick the correct answer if it's a pen:" → これはペンです | Review |
| 3 | FB | "＿ はかばんです" (pointing far away) → あれ | Review |
| 4 | WO | Build: それ / は / でんわ / です / か | Review |
| 5 | MC | "Which word means 'bag'?" → かばん | Review |
| 6 | MC | "Pick the WRONG pairing:" → それ = this (trap) | Review |
| 7 | FB | "これは ＿ です" (picture of book) → ほん | Review |
| 8 | WO | Build: あれ / は / なん / です / か | Review |
| 9 | KB | Build かばん from kana | Review |
| 10 | KB | Build でんわ from kana | Review |
| 11 | MC | **Review U3:** "おなまえは means:" → What is your name? | Review |
| 12 | FB | **Review U3:** "がくせいです ＿" (question) → か | Review |
| 13 | MC | **Review U2:** "Which means 'please'?" → おねがいします | Review |
| 14 | MC | **Review U1:** "You're leaving. You say:" → さようなら | Review |
| 15 | MA | **Review U3:** Match がくせい, せんせい, ともだち, いしゃ to meanings | Review |

---

## Unit 5: My Things

**Theme:** Demonstrative adjectives (this/that + noun), possession, more objects
**Grammar:** この/その/あの (L5.2), の possession particle (L5.4)
**New vocabulary:** 9 words across 3 content lessons
**Review material:** Units 1-4

---

### Lesson 5.1: Watch, Car, Umbrella

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| とけい | tokei | watch / clock |
| くるま | kuruma | car |
| かさ | kasa | umbrella |

**Grammar:** None (vocab only)
**Review:** Unit 4

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'watch' or 'clock'?" → とけい | New |
| 2 | MC | "Which means 'car'?" → くるま | New |
| 3 | MC | "Which means 'umbrella'?" → かさ | New |
| 4 | MA | Match とけい, くるま, かさ to watch, car, umbrella | New |
| 5 | KB | Build とけい from kana: と け い (distractors: く, る, ま) | New |
| 6 | KB | Build くるま from kana: く る ま (distractors: と, け, い) | New |
| 7 | KB | Build かさ from kana: か さ (distractors: く, る, ま) | New |
| 8 | MC | "You check the time on your:" → とけい | New |
| 9 | MC | "It's raining. You need a:" → かさ | New |
| 10 | MC | **Review U4:** "これはなんですか means:" → What is this? | Review |
| 11 | FB | **Review U4:** "＿ はほんです" (near me) → これ | Review |
| 12 | MC | **Review U3:** "わたしはがくせいです means:" → I am a student | Review |
| 13 | MA | **Review U4:** Match ほん, ペン, かばん, でんわ to meanings | Review |

---

### Lesson 5.2: This Book, That Car

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| この | kono | this ~ (+ noun) |
| その | sono | that ~ (+ noun) |
| あの | ano | that ~ over there (+ noun) |

**Grammar:** この/その/あの + noun (demonstrative adjectives) — must be followed by a noun
**grammar_intro:**
> この/その/あの go BEFORE a noun (unlike これ/それ/あれ which stand alone).
> このほん = this book, そのペン = that pen, あのくるま = that car (over there)
> Key difference: これ stands alone, この needs a noun!

**Review:** L5.1 + Unit 4

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "How do you say 'this book'?" → このほん | New |
| 2 | MC | "How do you say 'that car' (near you)?" → そのくるま | New |
| 3 | MC | "How do you say 'that umbrella over there'?" → あのかさ | New |
| 4 | MC | "What's the difference between これ and この?" → この needs a noun after it | New |
| 5 | MA | Match この, その, あの to this~, that~, that~over there | New |
| 6 | FB | "＿ ほんはわたしのです" (this book near me) → この | New |
| 7 | FB | "＿ くるまはせんせいのです" (that car far away) → あの | New |
| 8 | WO | Build: この / ほん / は / なん / です / か | New |
| 9 | MC | "このとけい means:" → this watch | New |
| 10 | MC | **Review L5.1:** "Which means 'umbrella'?" → かさ | Review |
| 11 | MC | **Review U4:** "それ means:" → that (near you) | Review |
| 12 | MA | **Review U4:** Match これ, それ, あれ to この, その, あの (concept pairing) | Review |
| 13 | MC | **Review U3:** "にほんじんですか means:" → Are you Japanese? | Review |
| 14 | MC | **Review U2:** "Which means 'thank you'?" → ありがとうございます | Review |

---

### Lesson 5.3: Table & Chair

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| テーブル | teeburu | table |
| いす | isu | chair |

**Grammar:** None (practice この/その/あの with new + old vocab)
**Review:** L5.1-5.2 + Units 1-4

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'table'?" → テーブル | New |
| 2 | MC | "Which means 'chair'?" → いす | New |
| 3 | MA | Match テーブル, いす to table, chair | New |
| 4 | KB | Build テーブル from katakana: テ ー ブ ル (distractors: ペ, ン, ア) | New |
| 5 | KB | Build いす from kana: い す (distractors: か, さ, と) | New |
| 6 | MC | "テーブル uses katakana because it is:" → a foreign word | New |
| 7 | FB | "＿ テーブルはおおきいです" (this table) → この | New |
| 8 | MC | "そのいす means:" → that chair | New |
| 9 | MC | **Review L5.2:** "このほん means:" → this book | Review |
| 10 | FB | **Review L5.2:** "＿ くるまはせんせいのです" → あの | Review |
| 11 | MA | **Review:** Match all objects: とけい, くるま, かさ, テーブル, いす to meanings | Review |
| 12 | MC | **Review U3:** "わたしはいしゃじゃないです means:" → I am not a doctor | Review |
| 13 | MC | **Review U1:** "Before eating:" → いただきます | Review |

---

### Lesson 5.4: My Book, Your Pen (Possession)

**New vocabulary (1 word):**
| Japanese | Reading | English |
|----------|---------|---------|
| の | no | 's (possession particle) |

**Grammar:** の (possession particle) — X の Y = "X's Y"
**grammar_intro:**
> の connects a possessor to what they possess.
> わたしのほん = my book
> たなかさんのペン = Tanaka's pen
> せんせいのくるま = the teacher's car

**Review:** L5.1-5.3 + Units 1-4

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "わたしのほん means:" → my book | New |
| 2 | FB | "たなかさん ＿ ペン" → の | New |
| 3 | MC | "せんせいのくるま means:" → the teacher's car | New |
| 4 | WO | Build: これ / は / わたし / の / とけい / です | New |
| 5 | FB | "せんせい ＿ かさ" → の | New |
| 6 | MC | "それはだれのほんですか means:" → Whose book is that? | New |
| 7 | WO | Build: それ / は / だれ / の / かばん / です / か | New |
| 8 | FB | "この くるま は せんせい ＿ です" → の | New |
| 9 | WO | Build: この / ペン / は / わたし / の / です | New |
| 10 | MC | **Review L5.3:** "Which means 'table'?" → テーブル | Review |
| 11 | MC | **Review L5.2:** "How do you say 'that umbrella'?" → そのかさ | Review |
| 12 | FB | **Review U4:** "＿ はでんわです" (pointing near me) → これ | Review |
| 13 | MC | **Review U3:** "おなまえは means:" → What is your name? | Review |
| 14 | MA | **Review:** Match わたしのほん, せんせいのくるま, たなかさんのペン to my book, teacher's car, Tanaka's pen | Review |

---

### Lesson 5.5: Practice — Whose Is This?

**New vocabulary:** None
**Grammar:** None
**Review:** All Unit 5 (9 words, 2 grammar points) + Units 1-4

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | FB | "これはわたし ＿ かばんです" → の | Review |
| 2 | WO | Build: この / とけい / は / だれ / の / です / か | Review |
| 3 | MC | "そのかさはたなかさんのです means:" → That umbrella is Tanaka's | Review |
| 4 | FB | "＿ テーブルはおおきいです" (this) → この | Review |
| 5 | WO | Build: あの / くるま / は / せんせい / の / です | Review |
| 6 | MC | "このいすはだれのですか means:" → Whose chair is this? | Review |
| 7 | FB | "それは わたし ＿ ペンです" → の | Review |
| 8 | MA | Match all Unit 5 objects: とけい, くるま, かさ, テーブル, いす to meanings | Review |
| 9 | WO | Build: これ / は / ともだち / の / でんわ / です | Review |
| 10 | MC | **Review U4:** "あれはなんですか means:" → What is that (over there)? | Review |
| 11 | MC | **Review U3:** "がくせいですか means:" → Are you a student? | Review |
| 12 | FB | **Review U3:** "わたしはせんせい ＿" (negative) → じゃないです | Review |
| 13 | MC | **Review U2:** "Quick casual thanks:" → どうも | Review |
| 14 | MC | **Review U1:** "Good evening:" → こんばんは | Review |

---

### Lesson 5.6: Unit 5 Quiz

**New vocabulary:** None
**Grammar:** None
**Review:** All Unit 5 + Units 1-4

**Exercises (15):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match この, その, あの to this~, that~, that~over there | Review |
| 2 | FB | "たなかさん ＿ ほん" → の | Review |
| 3 | MC | "このくるまはせんせいのです means:" → This car is the teacher's | Review |
| 4 | WO | Build: それ / は / だれ / の / とけい / です / か | Review |
| 5 | MC | "Pick the WRONG pairing:" → この = that (trap) | Review |
| 6 | FB | "＿ かさはわたしのです" (that umbrella near you) → その | Review |
| 7 | MC | "テーブル means:" → table | Review |
| 8 | MC | "いす means:" → chair | Review |
| 9 | WO | Build: あの / ペン / は / ともだち / の / です | Review |
| 10 | KB | Build とけい from kana | Review |
| 11 | KB | Build くるま from kana | Review |
| 12 | MC | **Review U4:** "これはペンですか means:" → Is this a pen? | Review |
| 13 | MC | **Review U3:** "アメリカからきました means:" → I came from America | Review |
| 14 | MC | **Review U2:** "You bump into someone:" → すみません | Review |
| 15 | MA | **Review:** Match 6 objects from Units 4-5 to meanings | Review |

---

## Unit 6: Also & Where?

**Theme:** The particle も (also), location words, question words
**Grammar:** も (L6.2), ここ/そこ/あそこ/どこ (L6.3), どれ/どの (L6.5)
**New vocabulary:** 9 words across 4 content lessons
**Review material:** Units 1-5

---

### Lesson 6.1: Also! (も Particle)

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| も | mo | also, too |
| だれ | dare | who |

**Grammar:** も (also particle) — も replaces は to mean "also/too"
**grammar_intro:**
> も replaces は to mean "also" or "too".
> たなかさんはがくせいです。やまださんもがくせいです。
> = "Tanaka is a student. Yamada is also a student."
> Note: も takes the place of は — you do NOT say はも.

**Review:** Unit 5

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "What does も mean?" → also, too | New |
| 2 | MC | "わたしもがくせいです means:" → I am also a student | New |
| 3 | FB | "たなかさんはがくせいです。やまださん ＿ がくせいです" → も | New |
| 4 | MC | "も replaces which particle?" → は | New |
| 5 | WO | Build: わたし / も / せんせい / です | New |
| 6 | MC | "だれ means:" → who | New |
| 7 | FB | "これはテーブルです。それ ＿ テーブルです" → も | New |
| 8 | WO | Build: やまださん / も / にほんじん / です | New |
| 9 | MC | **Review U5:** "わたしのほん means:" → my book | Review |
| 10 | FB | **Review U5:** "たなかさん ＿ ペン" → の | Review |
| 11 | MC | **Review U4:** "これはなんですか means:" → What is this? | Review |
| 12 | MC | **Review U3:** "にほんじんですか means:" → Are you Japanese? | Review |
| 13 | MA | **Review U5:** Match この, その, あの to meanings | Review |

---

### Lesson 6.2: Here, There, Over There

**New vocabulary (3 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| ここ | koko | here |
| そこ | soko | there |
| あそこ | asoko | over there |

**Grammar:** ここ/そこ/あそこ — location words following the こ/そ/あ pattern
**grammar_intro:**
> ここ = here (near me), そこ = there (near you), あそこ = over there (far from both)
> These follow the same こ/そ/あ pattern as これ/それ/あれ and この/その/あの.
> がっこうはここです。 = "The school is here."

**Review:** L6.1 + Units 1-5

**Exercises (13):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'here'?" → ここ | New |
| 2 | MC | "Which means 'there' (near you)?" → そこ | New |
| 3 | MC | "Which means 'over there'?" → あそこ | New |
| 4 | MA | Match ここ, そこ, あそこ to here, there, over there | New |
| 5 | MC | "ここ is to これ as そこ is to:" → それ | New |
| 6 | FB | "がっこうは ＿ です" (pointing here) → ここ | New |
| 7 | MC | "でんわはあそこです means:" → The phone is over there | New |
| 8 | WO | Build: ほん / は / そこ / です | New |
| 9 | MC | **Review L6.1:** "わたしもがくせいです means:" → I am also a student | Review |
| 10 | FB | **Review L6.1:** "やまださん ＿ せんせいです" (also) → も | Review |
| 11 | MC | **Review U5:** "このくるま means:" → this car | Review |
| 12 | MC | **Review U3:** "はじめまして means:" → Nice to meet you | Review |
| 13 | MA | **Review:** Match こ/そ/あ pattern: これ-この-ここ, それ-その-そこ, あれ-あの-あそこ | Review |

---

### Lesson 6.3: Where? (どこ)

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| どこ | doko | where |
| トイレ | toire | toilet / bathroom |

**Grammar:** どこ + は...です (location question/answer pattern)
**grammar_intro:**
> どこ = where. It completes the こ/そ/あ/ど pattern for locations.
> Place は どこ です か？ = "Where is [place]?"
> トイレはどこですか？ = "Where is the bathroom?"
> トイレはあそこです。 = "The bathroom is over there."

**Review:** L6.1-6.2 + Units 1-5

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'where'?" → どこ | New |
| 2 | MC | "Which means 'bathroom'?" → トイレ | New |
| 3 | FB | "トイレは ＿ ですか" → どこ | New |
| 4 | WO | Build: トイレ / は / どこ / です / か | New |
| 5 | MC | "トイレはどこですか means:" → Where is the bathroom? | New |
| 6 | FB | "トイレは ＿ です" (pointing over there) → あそこ | New |
| 7 | KB | Build トイレ from katakana: ト イ レ (distractors: テ, ー, ブ) | New |
| 8 | WO | Build: でんわ / は / どこ / です / か | New |
| 9 | MC | "かばんはそこです means:" → The bag is there | New |
| 10 | MC | **Review L6.2:** "ここ means:" → here | Review |
| 11 | FB | **Review L6.1:** "それ ＿ ほんです" (also) → も | Review |
| 12 | MC | **Review U5:** "わたしのかさ means:" → my umbrella | Review |
| 13 | MC | **Review U2:** "Which means 'no'?" → いいえ | Review |
| 14 | MA | **Review:** Match ここ, そこ, あそこ, どこ to here, there, over there, where | Review |

---

### Lesson 6.4: Which One? (どれ/どの)

**New vocabulary (2 words):**
| Japanese | Reading | English |
|----------|---------|---------|
| どれ | dore | which one (standalone) |
| どの | dono | which ~ (+ noun) |

**Grammar:** どれ vs どの — どれ stands alone, どの goes before a noun
**grammar_intro:**
> どれ stands alone, like これ/それ/あれ: どれがあなたのですか？ = "Which one is yours?"
> どの goes before a noun, like この/その/あの: どのほんですか？ = "Which book?"
> Pattern: これ↔この, それ↔その, あれ↔あの, どれ↔どの

**Review:** L6.1-6.3 + Units 1-5

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "Which means 'which one'?" → どれ | New |
| 2 | MC | "どの vs どれ: which needs a noun after it?" → どの | New |
| 3 | FB | "＿ がたなかさんのかばんですか" (which one) → どれ | New |
| 4 | WO | Build: どの / ほん / が / たなかさん / の / です / か | New |
| 5 | MC | "どれがあなたのですか means:" → Which one is yours? | New |
| 6 | FB | "＿ ペンがすきですか" (which) → どの | New |
| 7 | MA | Match question words: なん, だれ, どこ, どれ to what, who, where, which one | New |
| 8 | MC | "どのくるまですか means:" → Which car? | New |
| 9 | MC | **Review L6.3:** "トイレはどこですか means:" → Where is the bathroom? | Review |
| 10 | FB | **Review L6.3:** "トイレは ＿ です" (over there) → あそこ | Review |
| 11 | MC | **Review L6.1:** "も means:" → also, too | Review |
| 12 | MC | **Review U4:** "あれはなんですか means:" → What is that over there? | Review |
| 13 | FB | **Review U5:** "せんせい ＿ くるま" → の | Review |
| 14 | MA | **Review:** Match the complete ど-series: どこ, どれ, どの, だれ, なん to where, which one, which~, who, what | Review |

---

### Lesson 6.5: Practice — Also, Where, Which

**New vocabulary (1 word):**
| Japanese | Reading | English |
|----------|---------|---------|
| えき | eki | station |

**Grammar:** None (consolidation of all Unit 6 material)
**Review:** All Unit 6 + Units 1-5

**Exercises (14):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MC | "えき means:" → station | New |
| 2 | KB | Build えき from kana: え き (distractors: か, さ, ど) | New |
| 3 | WO | Build: えき / は / どこ / です / か | New |
| 4 | FB | "えきは ＿ です" (over there) → あそこ | Review |
| 5 | MC | "たなかさんもせんせいです means:" → Tanaka is also a teacher | Review |
| 6 | FB | "＿ がたなかさんのですか" (which one) → どれ | Review |
| 7 | WO | Build: どの / かばん / が / やまださん / の / です / か | Review |
| 8 | FB | "わたし ＿ にほんじんです" (also) → も | Review |
| 9 | MC | "トイレはここです means:" → The bathroom is here | Review |
| 10 | MC | **Review U5:** "このとけいはだれのですか means:" → Whose watch is this? | Review |
| 11 | WO | **Review U5:** Build: この / かさ / は / わたし / の / です | Review |
| 12 | MC | **Review U3:** "いしゃじゃないです means:" → is not a doctor | Review |
| 13 | MC | **Review U2:** "すみません means:" → excuse me / sorry | Review |
| 14 | MC | **Review U1:** "After eating:" → ごちそうさまでした | Review |

---

### Lesson 6.6: Unit 6 Quiz (Course V2 Checkpoint)

**New vocabulary:** None
**Grammar:** None
**Review:** All Units 1-6 — this is a major checkpoint

**Exercises (15):**
| # | Type | Exercise | New/Review |
|---|------|----------|------------|
| 1 | MA | Match も, ここ, そこ, あそこ, どこ to also, here, there, over there, where | Review |
| 2 | FB | "やまださん ＿ がくせいです" (also) → も | Review |
| 3 | WO | Build: えき / は / どこ / です / か | Review |
| 4 | MC | "どのほんですか means:" → Which book? | Review |
| 5 | FB | "＿ がわたしのです" (which one) → どれ | Review |
| 6 | MC | "Pick the WRONG pairing:" → ここ = there (trap) | Review |
| 7 | WO | Build: トイレ / は / あそこ / です | Review |
| 8 | MC | "えきはそこです means:" → The station is there | Review |
| 9 | MC | **Review U5:** "わたしのくるま means:" → my car | Review |
| 10 | FB | **Review U5:** "この とけい は だれ ＿ ですか" → の | Review |
| 11 | MC | **Review U4:** "これはかばんですか means:" → Is this a bag? | Review |
| 12 | WO | **Review U3:** Build: はじめまして / わたし / は / たなか / です / どうぞよろしく | Review |
| 13 | MC | **Review U3:** "わたしはいしゃじゃないです means:" → I am not a doctor | Review |
| 14 | MC | **Review U2:** "Formal thanks:" → ありがとうございます | Review |
| 15 | MA | **Review U1-6:** Match 8 mixed words from across all units | Review |

---

## Summary Statistics

### Lesson Count by Unit
| Unit | Lessons | Content Lessons | Practice/Quiz Lessons |
|------|---------|----------------|-----------------------|
| 1: Hello! | 5 | 3 | 2 |
| 2: Please & Thank You | 5 | 3 | 2 |
| 3: I Am... | 7 | 4 (+bonus grammar) | 2 (+1 bonus review) |
| 4: What Is This? | 5 | 3 | 2 |
| 5: My Things | 6 | 4 | 2 |
| 6: Also & Where? | 6 | 4 (+1 has new vocab) | 2 |
| **TOTAL** | **34** | **21** | **13** |

### Vocabulary Distribution
| Unit | New Words | Cumulative |
|------|-----------|-----------|
| 1 | 7 | 7 |
| 2 | 7 | 14 |
| 3 | 10 | 24 |
| 4 | 8 | 32 |
| 5 | 9 | 41 |
| 6 | 9 | 50 |
| **TOTAL** | **50** | |

### Grammar Distribution
| Unit | Grammar Points | Cumulative |
|------|---------------|-----------|
| 1 | 0 | 0 |
| 2 | 0 | 0 |
| 3 | 3 (は+です, か, じゃないです) + から+きました | 4 |
| 4 | 1 (これ/それ/あれ) | 5 |
| 5 | 2 (この/その/あの, の) | 7 |
| 6 | 3 (も, ここ/そこ/あそこ/どこ, どれ/どの) | 10 |

### Exercise Type Distribution (approximate across all lessons)
| Type | Count | Percentage |
|------|-------|-----------|
| MC (multiple_choice) | ~250 | ~52% |
| MA (matching) | ~70 | ~15% |
| FB (fill_blank) | ~75 | ~16% |
| WO (word_order) | ~50 | ~10% |
| KB (kana_build) | ~35 | ~7% |

### Review Ratio
- Average review exercises per lesson: **4.8** (target was 4-5)
- Review as percentage of total exercises: **~35%** (target was 30-40%)
- Every lesson from L1.2 onward includes review from previous lessons
- Every lesson from Unit 2 onward includes cross-unit review

### Comparison: Old vs New
| Metric | Old (Units 1-2) | New (Units 1-6) |
|--------|-----------------|-----------------|
| Lessons | 16 | 34 |
| Words per lesson (avg) | 3-5 | 1-3 |
| Grammar per lesson (max) | 1-2 | 0-1 |
| Exercises per lesson | 8-12 | 13-15 |
| Dedicated review lessons | 2 | 13 |
| Total exercises | ~160 | ~470 |
| Review exercises | ~20 | ~165 |
| Review ratio | ~12% | ~35% |

---

## Complete Vocabulary Reference (Units 1-6)

All 50 words covered in this course section, in order of introduction:

| # | Japanese | Reading | English | Introduced |
|---|----------|---------|---------|-----------|
| 1 | こんにちは | konnichiwa | hello | L1.1 |
| 2 | おはようございます | ohayou gozaimasu | good morning | L1.1 |
| 3 | こんばんは | konbanwa | good evening | L1.2 |
| 4 | さようなら | sayounara | goodbye | L1.2 |
| 5 | おやすみなさい | oyasuminasai | good night | L1.3 |
| 6 | いただきます | itadakimasu | before eating | L1.3 |
| 7 | ごちそうさまでした | gochisousama deshita | after eating | L1.3 |
| 8 | ありがとうございます | arigatou gozaimasu | thank you | L2.1 |
| 9 | すみません | sumimasen | excuse me / sorry | L2.1 |
| 10 | はい | hai | yes | L2.2 |
| 11 | いいえ | iie | no | L2.2 |
| 12 | おねがいします | onegaishimasu | please | L2.3 |
| 13 | どうも | doumo | thanks (casual) | L2.3 |
| 14 | おはよう | ohayou | morning (casual) | L2.3 |
| 15 | わたし | watashi | I, me | L3.1 |
| 16 | がくせい | gakusei | student | L3.1 |
| 17 | せんせい | sensei | teacher | L3.1 |
| 18 | です | desu | am/is/are | L3.2 |
| 19 | なまえ | namae | name | L3.3 |
| 20 | おなまえは？ | onamae wa? | What is your name? | L3.3 |
| 21 | ～さん | -san | Mr./Ms./Mrs. | L3.3 |
| 22 | か | ka | question particle | L3.4 |
| 23 | にほんじん | nihonjin | Japanese person | L3.4 |
| 24 | アメリカじん | amerikajin | American person | L3.4 |
| 25 | じゃないです | ja nai desu | is not | L3.5 |
| 26 | ともだち | tomodachi | friend | L3.5 |
| 27 | いしゃ | isha | doctor | L3.5 |
| 28 | はじめまして | hajimemashite | nice to meet you | L3.6 |
| 29 | どうぞよろしく | douzo yoroshiku | pleased to meet you | L3.6 |
| 30 | ～からきました | kara kimashita | came from ~ | L3.6 |
| 31 | ほん | hon | book | L4.1 |
| 32 | ペン | pen | pen | L4.1 |
| 33 | これ | kore | this | L4.2 |
| 34 | それ | sore | that (near you) | L4.2 |
| 35 | あれ | are | that (over there) | L4.2 |
| 36 | なん | nan | what | L4.2 |
| 37 | かばん | kaban | bag | L4.3 |
| 38 | でんわ | denwa | phone | L4.3 |
| 39 | とけい | tokei | watch/clock | L5.1 |
| 40 | くるま | kuruma | car | L5.1 |
| 41 | かさ | kasa | umbrella | L5.1 |
| 42 | この | kono | this ~ | L5.2 |
| 43 | その | sono | that ~ | L5.2 |
| 44 | あの | ano | that ~ (over there) | L5.2 |
| 45 | テーブル | teeburu | table | L5.3 |
| 46 | いす | isu | chair | L5.3 |
| 47 | の | no | possession particle | L5.4 |
| 48 | も | mo | also, too | L6.1 |
| 49 | だれ | dare | who | L6.1 |
| 50 | ここ | koko | here | L6.2 |
| 51 | そこ | soko | there | L6.2 |
| 52 | あそこ | asoko | over there | L6.2 |
| 53 | どこ | doko | where | L6.3 |
| 54 | トイレ | toire | bathroom | L6.3 |
| 55 | どれ | dore | which one | L6.4 |
| 56 | どの | dono | which ~ | L6.4 |
| 57 | えき | eki | station | L6.5 |

---

## Grammar Reference (Units 1-6)

| # | Grammar Point | Pattern | Introduced |
|---|--------------|---------|-----------|
| 1 | は (topic particle) + です (copula) | X は Y です | L3.2 |
| 2 | おなまえは？ (set phrase) | Fixed question phrase | L3.3 |
| 3 | か (question particle) | Statement + か = question | L3.4 |
| 4 | じゃないです (negative copula) | X は Y じゃないです | L3.5 |
| 5 | から + きました (origin) | Place から きました | L3.6 |
| 6 | これ/それ/あれ (demonstrative pronouns) | これは Y です | L4.2 |
| 7 | この/その/あの (demonstrative adjectives) | この N は... | L5.2 |
| 8 | の (possession particle) | X の Y | L5.4 |
| 9 | も (also particle) | X も Y です (replaces は) | L6.1 |
| 10 | ここ/そこ/あそこ/どこ (location) | Place は どこ ですか | L6.2-6.3 |
| 11 | どれ/どの (which) | どれ standalone, どの + noun | L6.4 |
