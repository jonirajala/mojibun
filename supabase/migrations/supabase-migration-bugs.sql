create table if not exists public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users(id) on delete set null,
  lesson_id text,
  exercise_id text,
  exercise_type text,
  exercise_number integer,
  exercise_content text,
  message text
);

alter table public.bug_reports enable row level security;

create policy "Users can insert bug reports"
on public.bug_reports
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their own bug reports"
on public.bug_reports
for select
to authenticated
using (auth.uid() = user_id);
