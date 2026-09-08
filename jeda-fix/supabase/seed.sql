insert into public.articles (
  author_id,
  title,
  slug,
  excerpt,
  content,
  cover_image,
  category
)
select
  p.id,
  'Menemukan ruang untuk berhenti sejenak',
  'menemukan-ruang-untuk-berhenti-sejenak',
  'Beristirahat dengan sadar membantu kita kembali fokus dan menikmati proses.',
  'Di tengah aktivitas yang padat, jeda sering dianggap sebagai sesuatu yang harus dihindari.

Padahal, jeda yang direncanakan dapat membantu tubuh dan pikiran memulihkan energi.

Mulailah dengan beberapa menit tanpa distraksi, lalu kembali melanjutkan aktivitas dengan lebih tenang.',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  'Lifestyle'
from public.profiles p
where p.username = 'user01'
order by p.created_at
limit 1
on conflict (slug) do update set
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_image = excluded.cover_image,
  category = excluded.category,
  updated_at = now();
