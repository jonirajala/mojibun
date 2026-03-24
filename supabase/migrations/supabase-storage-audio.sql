insert into storage.buckets (id, name, public)
values ('tts-audio', 'tts-audio', true)
on conflict (id) do update
set public = excluded.public;

create policy "Public can read tts audio"
on storage.objects
for select
to public
using (bucket_id = 'tts-audio');

-- Do not add insert/update/delete policies for anon or authenticated roles.
-- The generator uploads with the service role key, which bypasses RLS and
-- should stay only in local env / CI secrets, never in the frontend.
