-- =========================================================
-- JEDA DATABASE
-- RESET + AUTH + PROFILE + ARTICLE + LIKE + COMMENT
-- + COMMENT LIKE + RLS + TRIGGER + MOCK DATA
--
-- REGISTER:
-- /api/auth/register
-- Supabase Admin createUser()
--
-- =========================================================


-- =========================================================
-- 1. EXTENSION
-- =========================================================

create extension if not exists "pgcrypto";


-- =========================================================
-- 2. RESET TABLE
-- =========================================================

drop table if exists public.comment_likes cascade;
drop table if exists public.comments cascade;
drop table if exists public.likes cascade;
drop table if exists public.articles cascade;
drop table if exists public.profiles cascade;


-- =========================================================
-- 3. RESET FUNCTIONS / TRIGGER
-- =========================================================

drop trigger if exists on_auth_user_created on auth.users;

drop function if exists public.handle_new_user() cascade;


-- =========================================================
-- 4. PROFILES
-- =========================================================

create table public.profiles (
  id uuid primary key
    references auth.users(id)
    on delete cascade,

  username text not null unique,

  display_name text not null,

  avatar_url text not null,

  bio text not null default '',

  created_at timestamptz not null default now()
);


-- =========================================================
-- 5. ARTICLES
-- =========================================================

create table public.articles (
  id uuid primary key default gen_random_uuid(),

  author_id uuid not null
    references public.profiles(id)
    on delete cascade,

  title text not null,

  slug text not null unique,

  excerpt text not null default '',

  content text not null,

  cover_image text not null default '',

  category text not null default 'Umum',

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


-- =========================================================
-- 6. LIKES
-- =========================================================

create table public.likes (
  id uuid primary key default gen_random_uuid(),

  article_id uuid not null
    references public.articles(id)
    on delete cascade,

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  created_at timestamptz not null default now(),

  unique(article_id, user_id)
);


-- =========================================================
-- 7. COMMENTS
-- =========================================================

create table public.comments (
  id uuid primary key default gen_random_uuid(),

  article_id uuid not null
    references public.articles(id)
    on delete cascade,

  author_id uuid not null
    references public.profiles(id)
    on delete cascade,

  parent_id uuid
    references public.comments(id)
    on delete cascade,

  content text not null,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


-- =========================================================
-- 8. COMMENT LIKES
-- =========================================================

create table public.comment_likes (
  id uuid primary key default gen_random_uuid(),

  comment_id uuid not null
    references public.comments(id)
    on delete cascade,

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  created_at timestamptz not null default now(),

  unique(comment_id, user_id)
);


-- =========================================================
-- 9. CATEGORY PREFERENCES
-- =========================================================

create table public.category_preferences (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  category text not null,

  created_at timestamptz not null default now(),

  unique(user_id, category)
);


-- =========================================================
-- 10. READING HISTORY
-- =========================================================

create table public.reading_history (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  article_id uuid not null
    references public.articles(id)
    on delete cascade,

  read_at timestamptz not null default now(),

  unique(user_id, article_id)
);


-- =========================================================
-- 11. INDEX
-- =========================================================

create index articles_author_id_idx
on public.articles(author_id);

create index articles_category_idx
on public.articles(category);

create index articles_created_at_idx
on public.articles(created_at desc);

create index likes_article_id_idx
on public.likes(article_id);

create index likes_user_id_idx
on public.likes(user_id);

create index comments_article_id_idx
on public.comments(article_id);

create index comments_author_id_idx
on public.comments(author_id);

create index comments_parent_id_idx
on public.comments(parent_id);

create index comment_likes_comment_id_idx
on public.comment_likes(comment_id);

create index reading_history_user_id_idx
on public.reading_history(user_id);


-- =========================================================
-- 12. FUNCTION: CREATE PROFILE AFTER REGISTER
-- =========================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text;
  v_display_name text;
begin

  v_username :=
    coalesce(
      nullif(new.raw_user_meta_data->>'username', ''),
      split_part(new.email, '@', 1)
    );

  v_display_name :=
    coalesce(
      nullif(new.raw_user_meta_data->>'display_name', ''),
      v_username
    );

  insert into public.profiles (
    id,
    username,
    display_name,
    avatar_url,
    bio
  )
  values (
    new.id,
    v_username,
    v_display_name,
    coalesce(
      nullif(new.raw_user_meta_data->>'avatar_url', ''),
      'https://i.pravatar.cc/150?u=' || new.id
    ),
    coalesce(
      new.raw_user_meta_data->>'bio',
      ''
    )
  );

  return new;

exception
  when unique_violation then

    insert into public.profiles (
      id,
      username,
      display_name,
      avatar_url,
      bio
    )
    values (
      new.id,
      v_username || '_' || substr(new.id::text, 1, 8),
      v_display_name,
      'https://i.pravatar.cc/150?u=' || new.id,
      coalesce(
        new.raw_user_meta_data->>'bio',
        ''
      )
    );

    return new;
end;
$$;


-- =========================================================
-- 13. TRIGGER AUTH → PROFILE
-- =========================================================

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- =========================================================
-- 14. BACKFILL PROFILES FOR EXISTING AUTH USERS
-- =========================================================
-- Needed when auth users were created before the trigger existed.
insert into public.profiles (
  id,
  username,
  display_name,
  avatar_url,
  bio
)
select
  u.id,
  coalesce(
    nullif(u.raw_user_meta_data->>'username', ''),
    split_part(u.email, '@', 1)
  ) || '_' || substr(u.id::text, 1, 8),
  coalesce(
    nullif(u.raw_user_meta_data->>'display_name', ''),
    nullif(u.raw_user_meta_data->>'username', ''),
    split_part(u.email, '@', 1),
    'Pengguna'
  ),
  coalesce(
    nullif(u.raw_user_meta_data->>'avatar_url', ''),
    'https://i.pravatar.cc/150?u=' || u.id
  ),
  coalesce(u.raw_user_meta_data->>'bio', '')
from auth.users u
where not exists (
  select 1
  from public.profiles p
  where p.id = u.id
)
on conflict (id) do nothing;


-- =========================================================
-- 15. ENABLE RLS
-- =========================================================

alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.comment_likes enable row level security;
alter table public.category_preferences enable row level security;
alter table public.reading_history enable row level security;


-- =========================================================
-- 16. REST API GRANTS
-- =========================================================
-- Required by PostgREST before RLS policies are evaluated.
grant usage on schema public to anon, authenticated;
grant select on public.profiles, public.articles, public.likes,
  public.comments, public.comment_likes, public.category_preferences,
  public.reading_history to anon, authenticated;
grant insert, update, delete on public.likes, public.comments,
  public.comment_likes, public.category_preferences,
  public.reading_history to authenticated;


-- =========================================================
-- 17. PROFILE POLICIES
-- =========================================================

create policy "Public can read profiles"
on public.profiles
for select
to anon, authenticated
using (true);


create policy "User can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);


-- =========================================================
-- 16. ARTICLE POLICIES
-- =========================================================

create policy "Public can read articles"
on public.articles
for select
to anon, authenticated
using (true);


create policy "Authenticated users can create articles"
on public.articles
for insert
to authenticated
with check (
  auth.uid() = author_id
);


create policy "Authors can update own articles"
on public.articles
for update
to authenticated
using (
  auth.uid() = author_id
)
with check (
  auth.uid() = author_id
);


create policy "Authors can delete own articles"
on public.articles
for delete
to authenticated
using (
  auth.uid() = author_id
);


-- =========================================================
-- 17. LIKE POLICIES
-- =========================================================

create policy "Public can read likes"
on public.likes
for select
to anon, authenticated
using (true);


create policy "Users can like articles"
on public.likes
for insert
to authenticated
with check (
  auth.uid() = user_id
);


create policy "Users can unlike articles"
on public.likes
for delete
to authenticated
using (
  auth.uid() = user_id
);


-- =========================================================
-- 18. COMMENT POLICIES
-- =========================================================

create policy "Public can read comments"
on public.comments
for select
to anon, authenticated
using (true);


create policy "Users can create comments"
on public.comments
for insert
to authenticated
with check (
  auth.uid() = author_id
);


create policy "Users can update own comments"
on public.comments
for update
to authenticated
using (
  auth.uid() = author_id
)
with check (
  auth.uid() = author_id
);


create policy "Users can delete own comments"
on public.comments
for delete
to authenticated
using (
  auth.uid() = author_id
);


-- =========================================================
-- 19. COMMENT LIKE POLICIES
-- =========================================================

create policy "Public can read comment likes"
on public.comment_likes
for select
to anon, authenticated
using (true);


create policy "Users can like comments"
on public.comment_likes
for insert
to authenticated
with check (
  auth.uid() = user_id
);


create policy "Users can unlike comments"
on public.comment_likes
for delete
to authenticated
using (
  auth.uid() = user_id
);


-- =========================================================
-- 20. CATEGORY PREFERENCE POLICIES
-- =========================================================

create policy "Users can read own preferences"
on public.category_preferences
for select
to authenticated
using (
  auth.uid() = user_id
);


create policy "Users can create own preferences"
on public.category_preferences
for insert
to authenticated
with check (
  auth.uid() = user_id
);


create policy "Users can delete own preferences"
on public.category_preferences
for delete
to authenticated
using (
  auth.uid() = user_id
);


-- =========================================================
-- 21. READING HISTORY POLICIES
-- =========================================================

create policy "Users can read own history"
on public.reading_history
for select
to authenticated
using (
  auth.uid() = user_id
);


create policy "Users can create own history"
on public.reading_history
for insert
to authenticated
with check (
  auth.uid() = user_id
);


create policy "Users can update own history"
on public.reading_history
for update
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


create policy "Users can delete own history"
on public.reading_history
for delete
to authenticated
using (
  auth.uid() = user_id
);


-- =========================================================
-- 22. MOCK AUTH USERS
--
-- Password semua:
-- Jeda12345!
--
-- Email:
-- user01@jeda.test
-- user02@jeda.test
-- ...
-- user50@jeda.test
--
-- =========================================================

do $$
declare
  i integer;
  v_id uuid;
  v_username text;
  v_email text;
begin

  for i in 1..50 loop

    v_username :=
      'user' || lpad(i::text, 2, '0');

    v_email :=
      v_username || '@jeda.test';

    -- Jika user sudah ada, gunakan user tersebut
    select id
    into v_id
    from auth.users
    where email = v_email
    limit 1;

    -- Jika belum ada, buat user
    if v_id is null then

      v_id := gen_random_uuid();

      insert into auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at
      )
      values (
        '00000000-0000-0000-0000-000000000000',
        v_id,
        'authenticated',
        'authenticated',
        v_email,
        crypt('Jeda12345!', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        jsonb_build_object(
          'username', v_username,
          'display_name', 'Jeda User ' || i,
          'avatar_url',
            'https://i.pravatar.cc/150?u=' || v_id
        ),
        now(),
        now()
      );

    end if;

  end loop;

end $$;


-- =========================================================
-- 23. MOCK ARTICLES
-- =========================================================

do $$
declare
  i integer;
  v_author uuid;
  v_category text;
begin

  for i in 1..100 loop

    select id
    into v_author
    from auth.users
    where email =
      'user' ||
      lpad((((i - 1) % 50) + 1)::text, 2, '0') ||
      '@jeda.test'
    limit 1;

    v_category :=
      case ((i - 1) % 6)
        when 0 then 'Teknologi'
        when 1 then 'Programming'
        when 2 then 'Design'
        when 3 then 'Lifestyle'
        when 4 then 'Pendidikan'
        else 'Karier'
      end;

    insert into public.articles (
      author_id,
      title,
      slug,
      excerpt,
      content,
      cover_image,
      category,
      created_at,
      updated_at
    )
    values (
      v_author,

      'Artikel Jeda #' || i,

      'artikel-jeda-' || i,

      'Ini adalah ringkasan artikel Jeda nomor ' || i || '.',

      'Ini adalah isi artikel Jeda nomor ' || i ||
      '. Artikel ini digunakan sebagai data simulasi untuk testing frontend Jeda. ' ||
      'Kamu dapat menggunakan artikel ini untuk menguji halaman detail, like, komentar, pencarian, kategori, dan rekomendasi.',

      'https://picsum.photos/seed/jeda-' || i || '/1200/800',

      v_category,

      now() - (i || ' hours')::interval,

      now() - (i || ' hours')::interval
    )
    on conflict (slug) do nothing;

  end loop;

end $$;


-- =========================================================
-- 24. MOCK LIKES
-- =========================================================

do $$
declare
  article_record record;
  i integer;
  v_user uuid;
begin

  for article_record in
    select id
    from public.articles
  loop

    for i in 1..5 loop

      select id
      into v_user
      from auth.users
      where email =
        'user' ||
        lpad(i::text, 2, '0') ||
        '@jeda.test'
      limit 1;

      insert into public.likes (
        article_id,
        user_id
      )
      values (
        article_record.id,
        v_user
      )
      on conflict (article_id, user_id)
      do nothing;

    end loop;

  end loop;

end $$;


-- =========================================================
-- 25. MOCK COMMENTS
-- =========================================================

do $$
declare
  article_record record;
  v_user uuid;
  v_comment uuid;
  i integer;
begin

  for article_record in
    select id
    from public.articles
  loop

    -- 3 komentar utama
    for i in 1..3 loop

      select id
      into v_user
      from auth.users
      where email =
        'user' ||
        lpad(((i % 10) + 1)::text, 2, '0') ||
        '@jeda.test'
      limit 1;

      insert into public.comments (
        article_id,
        author_id,
        content
      )
      values (
        article_record.id,
        v_user,
        case i
          when 1 then 'Artikel yang sangat menarik!'
          when 2 then 'Penjelasannya cukup mudah dipahami.'
          else 'Saya setuju dengan pembahasannya.'
        end
      )
      returning id into v_comment;

      -- 1 reply
      select id
      into v_user
      from auth.users
      where email = 'user10@jeda.test'
      limit 1;

      insert into public.comments (
        article_id,
        author_id,
        parent_id,
        content
      )
      values (
        article_record.id,
        v_user,
        v_comment,
        'Terima kasih sudah berbagi artikelnya.'
      );

    end loop;

  end loop;

end $$;


-- =========================================================
-- 26. MOCK COMMENT LIKES
-- =========================================================

do $$
declare
  comment_record record;
  v_user uuid;
begin

  select id
  into v_user
  from auth.users
  where email = 'user01@jeda.test'
  limit 1;

  for comment_record in
    select id
    from public.comments
    limit 200
  loop

    insert into public.comment_likes (
      comment_id,
      user_id
    )
    values (
      comment_record.id,
      v_user
    )
    on conflict (comment_id, user_id)
    do nothing;

  end loop;

end $$;


-- =========================================================
-- 27. MOCK CATEGORY PREFERENCES
-- =========================================================

do $$
declare
  i integer;
  v_user uuid;
begin

  for i in 1..10 loop

    select id
    into v_user
    from auth.users
    where email =
      'user' ||
      lpad(i::text, 2, '0') ||
      '@jeda.test'
    limit 1;

    insert into public.category_preferences (
      user_id,
      category
    )
    values
      (v_user, 'Teknologi'),
      (v_user, 'Programming'),
      (v_user, 'Design')
    on conflict (user_id, category)
    do nothing;

  end loop;

end $$;


-- =========================================================
-- 28. CHECK DATA
-- =========================================================

select
  'profiles' as table_name,
  count(*) as total
from public.profiles

union all

select
  'articles',
  count(*)
from public.articles

union all

select
  'likes',
  count(*)
from public.likes

union all

select
  'comments',
  count(*)
from public.comments

union all

select
  'comment_likes',
  count(*)
from public.comment_likes

union all

select
  'category_preferences',
  count(*)
from public.category_preferences;


-- =========================================================
-- 29. CHECK AUTH USERS
-- =========================================================

select
  id,
  email,
  email_confirmed_at,
  raw_user_meta_data
from auth.users
where email like '%@jeda.test'
order by email;