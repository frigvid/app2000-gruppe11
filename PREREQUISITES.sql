SET
	search_path TO public;





/********************************************************************************************
Author:			frigvid
Create Date:	2024-04-11
Description:	Copy everything in this file, and paste it into Supabase's SQL Editor, and run
					it. Once this is done, everything should be ready for the project to run.
*********************************************************************************************
SUMMARY OF CHANGES
Date (yyyy-mm-dd)   	Author             	Comments
-------------------	-------------------	---------------------------------------------------
2024-04-12         	frigvid    				Moved all SQL code over to an SQL file instead of a
														markdown file. I don't think I messed anything up,
														but this should make it a little less painful for
														users to install. Hopefully didn't mess anything up
														either.
********************************************************************************************/ 





/******************************************
 *														*
 *						TABLES						*
 *														*
 ******************************************/





/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-02
 * Description: User settings table.
 * ============================================= */
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

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-02
 * Description: User profile table.
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	profiles (
		id UUID PRIMARY KEY,
		updated_at timestamptz NULL,
		display_name TEXT NULL,
		elo_rank INT NULL,
		avatar_url TEXT NULL,
		about_me TEXT NULL,
		nationality TEXT NULL,
		visibility BOOLEAN DEFAULT FALSE,
		visibility_friends BOOLEAN DEFAULT TRUE,
		FOREIGN KEY (id) REFERENCES auth.users (id)
	);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-11
 * Description: Table containing user's friends.
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	friends (
		id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		friends_since timestamptz NULL DEFAULT now(),
		user1 UUID NOT NULL,
		user2 UUID NULL,
		FOREIGN KEY (user1) REFERENCES auth.users (id),
		UNIQUE (user1, user2)
);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-11
 * Description: Table containing friend requests.
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	friend_requests (
		id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		created_at timestamptz NULL DEFAULT now(),
		by_user UUID NOT NULL,
		to_user UUID NOT NULL,
		accepted BOOLEAN NULL DEFAULT NULL,
		FOREIGN KEY (by_user) REFERENCES auth.users (id),
		UNIQUE (by_user, to_user)
);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-05
 * Description: Contains individual chess games,
 *              1 per row, by user.
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	history (
		id UUID PRIMARY KEY,
		timestamp timestamptz NOT NULL DEFAULT (timezone('utc', now())),
		fen text NOT NULL, -- https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
		result smallint NOT NULL, -- 0 = loss, 1 = win, 2 = draw.
		FOREIGN KEY (id) REFERENCES auth.users (id)
	);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-02
 * Description: Contains game data totals.
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	gamedata (
		id UUID PRIMARY KEY,
		wins BIGINT,
		losses BIGINT,
		draws BIGINT,
		FOREIGN KEY (id) REFERENCES auth.users (id)
	);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-05
 * Description: WIP
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	openings (
		id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
		created_by NULL,
		title text NOT NULL,
		description text NOT NULL,
		pgn jsonb NOT NULL,
		timestamp timestamptz NOT NULL DEFAULT (timezone('utc', now())),
		FOREIGN KEY (created_by) REFERENCES auth.users (id)
	);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-05
 * Description: WIP
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	user_openings (
		id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
		created_by uuid NOT NULL,
		name text NOT NULL,
		desc text,
		pgn jsonb,
		timestamp timestamptz NOT NULL DEFAULT (timezone('utc', now())),
		FOREIGN KEY (created_by) REFERENCES auth.users (id)
	);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-05
 * Description: Contains groups of openings as
 *              an opening repetoire to train
 *              against.
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	repertoire (
		id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
		usr uuid,
		timestamp timestamptz,
		openings jsonb, -- Array with opening IDs.
		FOREIGN KEY (usr) REFERENCES auth.users (id)
	);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-05
 * Description: Contains chess openings/strategies.
 * ============================================= */
CREATE TABLE IF NOT EXISTS
	openings (
		id UUID,
		name text,
		pgn jsonb,
		timestamp timestamptz NOT NULL DEFAULT (timezone('utc', now())),
		PRIMARY KEY (id, name, pgn, timestamp),
		FOREIGN KEY (id) REFERENCES auth.users (id),
		UNIQUE (id, name) -- Constrain id-name.
	);

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-02
 * Description: Contains admin-created news.
 * ============================================= */
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





/******************************************
 *														*
 *				ROW LEVEL SECURITY				*
 *														*
 ******************************************/





/* Currently disabled due to time constraints.
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamedata ENABLE ROW LEVEL SECURITY;
ALTER TABLE openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
*/





/******************************************
 *														*
 *						POLICIES						*
 *														*
 ******************************************/





/* Currently disabled due to time constraints.
Policies.
CREATE POLICY "Users can only view their own game data." ON gamedata FOR
SELECT
	USING (auth.uid() = userid);

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
*/





/*********************************************
 *															*
 *				FUNCTIONS AND TRIGGERS				*
 *															*
 ********************************************/





/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-04
 * Description: Delete's a given user's data, and
 *              their account when done.
 * ============================================= */
CREATE OR REPLACE FUNCTION public.user_delete()
	RETURNS void
	LANGUAGE SQL SECURITY DEFINER
AS $$
	-- Public.
	DELETE FROM public.gamedata WHERE id = auth.uid();
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

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-04
 * Description: Initializes a user's required data.
 * ============================================= */
CREATE OR REPLACE FUNCTION user_init()
	RETURNS TRIGGER
	LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
	INSERT INTO public.gamedata (id, wins, losses, draws)
	VALUES (NEW.id, 0, 0, 0);

	INSERT INTO public.profiles (id, updated_at, display_name)
	VALUES (NEW.id, NOW(), NULL);

	INSERT INTO public.settings (id, user_image, country, profile_is_public)
	VALUES (NEW.id, NULL, NULL, TRUE);

	RETURN NEW;
END;
$$;

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-09
 * Description: Create an opening.
 * ============================================= */
CREATE OR REPLACE FUNCTION public.opening_create(
	opn_name text,
	opn_moves jsonb
)
	RETURNS void
	LANGUAGE SQL
AS $$
	INSERT INTO public.openings (id, name, pgn)
	VALUES (auth.uid(), opn_name, opn_moves);
$$;

CREATE OR REPLACE FUNCTION public.opening_delete(
	opn_name text DEFAULT NULL
)
	RETURNS void
	LANGUAGE SQL
AS $$
	DELETE FROM public.openings
	WHERE id = auth.uid() AND name = opn_name;
$$;

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-09
 * Description: Updates a user's profile data.
 * ============================================= */
CREATE OR REPLACE FUNCTION public.profile_modify(
	usr_avatar_url text,
	usr_display_name text,
	usr_about_me text,
	usr_nationality text
)
	RETURNS void
	LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE public.profiles
	SET
		display_name = usr_display_name,
		avatar_url = usr_avatar_url,
		about_me = usr_about_me,
		nationality = usr_nationality
	WHERE id = auth.uid();
END;
$$;

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-09
 * Description: Gets data related to the user's
 *              profile page. Currently joins
 *              profiles and gamedata together.
 * ============================================= */
CREATE OR REPLACE FUNCTION public.profile_get(
	usr_id uuid
)
	RETURNS TABLE(
		display_name text,
		elo_rank integer,
		avatar_url text,
		about_me text,
		nationality text,
		wins bigint,
		losses bigint,
		draws bigint
	)
	LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		p.display_name,
		p.elo_rank,
		p.avatar_url,
		p.about_me,
		p.nationality,
		g.wins,
		g.losses,
		g.draws
	FROM
   	public.profiles p
	JOIN
		public.gamedata g ON p.id = g.userid
	WHERE
		p.id = usr_id;
END;
$$;

/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-11
 * Description: Function to search for another user,
 *              as an authenticated user. Fuzzy
 *              search on display_name, but only
 *              exact match on UUID.
 * ============================================= */
CREATE OR REPLACE FUNCTION public.search_user(
	search_term TEXT
)
	RETURNS TABLE(
		id UUID,
		display_name TEXT,
		avatar_url TEXT
	)
	LANGUAGE plpgsql
AS $$
DECLARE
	search_term_is_uuid UUID;
BEGIN
	IF auth.uid() IS NULL THEN
		RETURN;
	END IF;

	BEGIN
		search_term_is_uuid := search_term::UUID;
	EXCEPTION WHEN others THEN
		search_term_is_uuid := NULL;
	END;

	IF search_term_is_uuid IS NOT NULL AND EXISTS (SELECT 1 FROM profiles AS pi WHERE pi.id = search_term_is_uuid LIMIT 1) THEN
		RETURN QUERY
			SELECT pid.id, pid.display_name, pid.avatar_url
			FROM profiles AS pid
			WHERE pid.id = search_term_is_uuid
			LIMIT 1;
	ELSEIF EXISTS (SELECT 1 FROM profiles AS pn WHERE pn.display_name ILIKE '%' || search_term || '%' LIMIT 1) THEN
		RETURN QUERY
			SELECT pdn.id, pdn.display_name, pdn.avatar_url
			FROM profiles AS pdn
			WHERE pdn.display_name ILIKE '%' || search_term || '%'
			LIMIT 1;
	ELSE
		RAISE EXCEPTION 'No user found with the provided search term.';
	END IF;
END;
$$;