-- Create exercise_analytics table for Teacher Mode
-- Tracks: attempts, error types, time spent, hints used

create table if not exists exercise_analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null,
  attempt_count int not null default 0,
  error_codes text[] not null default '{}',
  time_spent_seconds int not null default 0,
  hints_used int not null default 0,
  last_attempt_at timestamptz default now(),
  created_at timestamptz not null default now(),
  
  unique (user_id, exercise_id)
);

-- Enable RLS
alter table exercise_analytics enable row level security;

-- Policy: Users can read their own analytics
create policy "Users can read their own analytics"
on exercise_analytics
for select
using (auth.uid() = user_id);

-- Policy: Users can insert their own analytics
create policy "Users can insert their own analytics"
on exercise_analytics
for insert
with check (auth.uid() = user_id);

-- Policy: Users can update their own analytics
create policy "Users can update their own analytics"
on exercise_analytics
for update
using (auth.uid() = user_id);
