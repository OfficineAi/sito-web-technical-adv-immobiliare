create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 160),
  email text not null check (position('@' in email) > 1 and char_length(email) <= 320),
  phone text not null check (char_length(trim(phone)) between 5 and 40),
  property_type text not null check (char_length(trim(property_type)) between 3 and 80),
  property_address text not null check (char_length(trim(property_address)) between 5 and 300),
  intent text not null check (intent in ('Comprare', 'Vendere')),
  message text null check (message is null or char_length(message) <= 2500),
  privacy_accepted boolean not null default false,
  source_page text null check (source_page is null or char_length(source_page) <= 300),
  user_agent text null check (user_agent is null or char_length(user_agent) <= 500)
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "Allow anon insert leads" on public.leads;
create policy "Allow anon insert leads"
  on public.leads
  for insert
  to anon
  with check (privacy_accepted is true);
