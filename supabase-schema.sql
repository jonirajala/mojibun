-- Yappari Supabase Schema
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor)

-- User settings (mirrors useUserStore)
CREATE TABLE user_settings (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  has_completed_onboarding BOOLEAN NOT NULL DEFAULT false,
  show_romaji BOOLEAN NOT NULL DEFAULT false,
  script_mode TEXT NOT NULL DEFAULT 'kanji_furigana',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User progress (mirrors useProgressStore)
CREATE TABLE user_progress (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_lessons JSONB NOT NULL DEFAULT '{}',
  total_xp INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row-Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own settings"
  ON user_settings FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
