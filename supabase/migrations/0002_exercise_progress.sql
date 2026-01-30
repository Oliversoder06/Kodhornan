-- Create exercise_progress table
create table exercise_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null,
  completed_at timestamptz not null default now(),

  unique (user_id, exercise_id)
);

-- Enable RLS
alter table exercise_progress enable row level security;

-- Policy: Users can read their own progress
create policy "Users can read their own progress"
on exercise_progress
for select
using (auth.uid() = user_id);

-- Policy: Users can insert their own progress
create policy "Users can insert their own progress"
on exercise_progress
for insert
with check (auth.uid() = user_id);

-- Policy: Users can update their own progress
create policy "Users can update their own progress"
on exercise_progress
for update
using (auth.uid() = user_id);
