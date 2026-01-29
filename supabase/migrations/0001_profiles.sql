-- Create profiles table
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Policy: Users can read their own profile
create policy "Users can read their own profile"
on profiles
for select
using (auth.uid() = id);
