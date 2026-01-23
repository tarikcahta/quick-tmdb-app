create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  email text,
  created_at timestamptz default now()
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles (id) on delete cascade,
  media_id integer not null,
  media_type text not null check (media_type in ('movies', 'tvshows')),
  content text not null,
  author_name text default 'Anonymous',
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table comments enable row level security;

create policy "Public profiles are viewable"
  on profiles for select
  using (true);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Comments are viewable"
  on comments for select
  using (true);

create policy "Users can insert own comments"
  on comments for insert
  with check (
    auth.uid() = user_id
    or (
      auth.uid() is null
      and user_id is null
      and author_name = 'Anonymous'
    )
    or (
      auth.uid() is not null
      and user_id is null
      and author_name = 'Anonymous'
    )
  );

create policy "Users can update own comments"
  on comments for update
  using (auth.uid() = user_id);

create policy "Users can delete own comments"
  on comments for delete
  using (auth.uid() = user_id);
