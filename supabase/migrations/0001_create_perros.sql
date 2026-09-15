-- Tabla de perros registrados por cada usuario, con el estado de su
-- prótesis más reciente. Correr una sola vez en el SQL editor de Supabase.

create table if not exists public.perros (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  nombre text not null,
  raza text,
  peso_kg numeric,
  foto_url text,
  request_id text,
  protesis_generada boolean not null default false,
  protesis_download_url text,
  created_at timestamptz not null default now()
);

create index if not exists perros_user_id_idx on public.perros (user_id);

alter table public.perros enable row level security;

create policy "Los usuarios ven sus propios perros"
  on public.perros for select
  using (auth.uid() = user_id);

create policy "Los usuarios crean sus propios perros"
  on public.perros for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios actualizan sus propios perros"
  on public.perros for update
  using (auth.uid() = user_id);

create policy "Los usuarios borran sus propios perros"
  on public.perros for delete
  using (auth.uid() = user_id);
