create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  show_romaji boolean not null default true,
  theme text not null default 'system',
  updated_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  completed_lessons jsonb not null default '{}',
  xp integer not null default 0,
  streak integer not null default 0,
  hearts integer not null default 5,
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;
alter table public.user_progress enable row level security;

create policy "Users can manage their own settings"
on public.user_settings
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage their own progress"
on public.user_progress
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
