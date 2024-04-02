# Prerequisites
## Supabase

While the project _could_ create the tables necessary to run properly automatically, we've chosen not to do so. When comparing the effort required to make sure that the tables are created once, and only once, in a proper way versus just copy-pasting the below SQL code into Supabase's SQL Editor, it won out. Without time constraints, it wouldn't be an issue.

Note that while you can create custom schemas, Chess Buddy is designed to use the default `public` schema.

```sql
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
