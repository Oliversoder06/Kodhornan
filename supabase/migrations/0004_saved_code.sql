-- Create saved_code table for autosave functionality
-- Stores user code per exercise for persistence

create table if not exists saved_code (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null,
  code text not null default '',
  output text default '',
  error text default '',
  state text default '', -- 'success', 'error', '' (empty/running)
  updated_at timestamptz not null default now(),
  
  unique (user_id, exercise_id)
);

-- Enable RLS
alter table saved_code enable row level security;

-- Policy: Users can read their own saved code
create policy "Users can read their own saved code"
on saved_code
for select
using (auth.uid() = user_id);

-- Policy: Users can insert their own saved code
create policy "Users can insert their own saved code"
on saved_code
for insert
with check (auth.uid() = user_id);

-- Policy: Users can update their own saved code
create policy "Users can update their own saved code"
on saved_code
for update
using (auth.uid() = user_id);

-- Policy: Users can delete their own saved code
create policy "Users can delete their own saved code"
on saved_code
for delete
using (auth.uid() = user_id);
