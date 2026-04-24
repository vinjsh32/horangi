-- Horangi Supabase schema
-- Incolla tutto questo in: Supabase → SQL Editor → New query → Run
-- ============================================================

-- ==================== PROFILES ====================
-- Una riga per utente; creata automaticamente al signup via trigger.
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  name            text not null default 'Studente',
  total_xp        int  not null default 0,
  gems            int  not null default 0,
  streak          int  not null default 0,
  last_active     date,
  weekly_goal     int  not null default 5,
  week_bits       int  not null default 0,          -- bitmask lun..dom (bit 0 = lunedì)
  level           int  not null default 1,
  level_progress  real not null default 0,          -- 0..1
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: owner select" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: owner update" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles: owner insert" on public.profiles
  for insert with check (auth.uid() = id);
-- leaderboard: tutti possono leggere nome + XP degli altri (senza info sensibili)
create policy "profiles: public read for leaderboard" on public.profiles
  for select using (true);

-- Auto-create profile al signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==================== LESSON PROGRESS ====================
create table public.lesson_progress (
  user_id          uuid not null references auth.users(id) on delete cascade,
  lesson_id        text not null,                   -- es. 'L1U1C3'
  current_step     int  not null default 0,
  completed_steps  jsonb not null default '[]'::jsonb,
  hearts           int  not null default 5,
  best_score       int,                             -- punteggio migliore quiz finale
  completed_at     timestamptz,                     -- null = in corso
  updated_at       timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;
create policy "lesson_progress: owner only" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==================== VOCAB MASTERY (SRS) ====================
create table public.vocab_mastery (
  user_id     uuid not null references auth.users(id) on delete cascade,
  word_kr     text not null,
  mastery     real not null default 0,               -- 0..1
  last_seen   timestamptz not null default now(),
  next_review timestamptz,
  times_seen  int  not null default 0,
  primary key (user_id, word_kr)
);

alter table public.vocab_mastery enable row level security;
create policy "vocab_mastery: owner only" on public.vocab_mastery
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==================== DAILY ACTIVITY ====================
-- Una riga per giorno in cui l'utente ha guadagnato XP (serve per streak e grafico)
create table public.daily_activity (
  user_id    uuid not null references auth.users(id) on delete cascade,
  day        date not null,
  xp_gained  int  not null default 0,
  primary key (user_id, day)
);

alter table public.daily_activity enable row level security;
create policy "daily_activity: owner only" on public.daily_activity
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==================== INDEXES ====================
create index profiles_total_xp_idx on public.profiles (total_xp desc);
create index lesson_progress_user_idx on public.lesson_progress (user_id);
create index daily_activity_user_day_idx on public.daily_activity (user_id, day desc);
