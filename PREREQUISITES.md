# Prerequisites
## Environment file

1. Create a `.env.local` file in the root directory.
2. Grab your Supabase URL and add it as the value of `NEXT_PUBLIC_SUPABASE_URL`.
3. Grab your Supabase anonymous API key and add it as the value of `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

It'll look something like this:
```environment
NEXT_PUBLIC_SUPABASE_URL=https://somesubdomain.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=some kind of secret here
```

## Supabase

While the project _could_ create the tables necessary to run properly automatically, we've chosen not to do so. When comparing the effort required to make sure that the tables are created once, and only once, in a proper way versus just copy-pasting the below SQL code into Supabase's SQL Editor, it won out. Without time constraints, it wouldn't be an issue.

Note that while you can create custom schemas, Chess Buddy is designed to use the default `public` schema.

### Tables

```postgresql
SET
	search_path TO public;

CREATE TABLE IF NOT EXISTS
	settings (
		id UUID PRIMARY KEY,
		user_image BYTEA DEFAULT NULL, -- Used for the user's profile image, and a small thumbnail image in the header bar.
		country TEXT DEFAULT NULL, -- Used to set county icon/emoji on user profile.
		profile_is_public BOOLEAN DEFAULT TRUE,
		-- theme TEXT NULL,
		-- language TEXT NULL,
		FOREIGN KEY (id) REFERENCES auth.users (id)
	);

CREATE TABLE IF NOT EXISTS
	profiles (
		id UUID PRIMARY KEY,
		updated_at TIMESTAMP WITH TIME ZONE NULL,
		display_name TEXT NULL,
		FOREIGN KEY (id) REFERENCES auth.users (id)
	);

CREATE TABLE IF NOT EXISTS
	gamedata (
		userid UUID PRIMARY KEY UNIQUE,
		wins BIGINT,
		losses BIGINT,
		draws BIGINT,
		FOREIGN KEY (userid) REFERENCES auth.users (id)
	);

CREATE TABLE IF NOT EXISTS
	news (
		id UUID PRIMARY KEY,
		created_by UUID NOT NULL,
		title TEXT NOT NULL,
		summary TEXT NULL,
		content TEXT NULL,
		is_published BOOLEAN DEFAULT TRUE, -- Used to check if "news" are still drafts, or if they've been published. A superuser is necessary to see them in the UI.
		FOREIGN KEY (created_by) REFERENCES auth.users (id)
	);
```

### RLS and Policies

```postgresql
SET
	search_path TO public;

-- RLS.
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE gamedata ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policies.
-- CREATE POLICY "Users can only view their own game data." ON gamedata FOR
-- SELECT
-- 	USING (auth.uid() = userid);

CREATE POLICY "Users can only view their own settings." ON settings FOR
SELECT
	USING (auth.uid() = id);

CREATE POLICY "Profiles are viewable by everyone." ON profiles FOR
SELECT
	TO authenticated, anon
	USING (TRUE);

CREATE POLICY "News are viewable by everyone." ON news FOR
SELECT
	TO authenticated, anon
	USING (TRUE);
```

### Functions and Triggers

See [the extras document](./EXTRAS.md) for other functions and the like that may be nice to use.

```postgresql
SET
	search_path TO public;

CREATE OR REPLACE FUNCTION public.user_delete()
	RETURNS void
	LANGUAGE SQL SECURITY DEFINER
AS $$
	-- Public.
	DELETE FROM public.gamedata WHERE userid = auth.uid();
	DELETE FROM public.profiles WHERE id = auth.uid();
	DELETE FROM public.settings WHERE id = auth.uid();

	-- Storage.
	--DELETE FROM storage.buckets WHERE id = auth.uid();
	--DELETE FROM storage.migrations WHERE id = auth.uid();
	--DELETE FROM storage.objects WHERE id = auth.uid();

	-- Auth.
	DELETE FROM auth.users WHERE id = auth.uid();
	DELETE FROM auth.identities WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION user_init()
	RETURNS TRIGGER
	LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
	INSERT INTO public.gamedata (userid, wins, losses, draws)
	VALUES (NEW.id, 0, 0, 0);

	INSERT INTO public.profiles (id, updated_at, display_name)
	VALUES (NEW.id, NOW(), NULL);

	INSERT INTO public.settings (id, user_image, country, profile_is_public)
	VALUES (NEW.id, NULL, NULL, TRUE);

	RETURN NEW;
END;
$$;
```
