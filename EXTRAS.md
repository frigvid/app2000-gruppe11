<head>
	<title>EXTRAS</title>
	<meta name="author" content="frigvid"/>
	<meta name="date-created" content="2024-04-04"/>
</head>

# Extras

This document serves to describe some utility functions that are nice to have when developing, maintaining or otherwise testing the database, but otherwise unnecessary for being able to actually get the project up and running. These are not prerequisites, [like those described here](./PREREQUISITES.md), nor as important as installation instructions.

## Supabase
### Creating a user manually

Usage:

```postgresql
SELECT
    public.user_create(
            'example@example.com',
            '123454321',
            false
    );
```

Function:
```postgresql
/* =============================================
 * Author:      frigvid
 * Create date: 2024-04-04
 * Description: Create a user account manually.
 * ============================================= */
CREATE OR REPLACE FUNCTION public.user_create(
    email text,
    password text,
    isAdmin bool
) RETURNS void
AS $$
DECLARE
  user_id uuid;
  encrypted_pw text;
  date_time timestamptz;
BEGIN
  user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf', 12));
  date_time := now() at time zone 'utc';
  
  INSERT INTO auth.users
    (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
  VALUES
    (
      '00000000-0000-0000-0000-000000000000',
      user_id,
      'authenticated',
      'authenticated',
      email,
      encrypted_pw,
      date_time, -- email_confirmed_at
      date_time, -- recovery_sent_at
      date_time, -- last_sign_in_at
      '{"provider":"email","providers":["email"]}',
      '{"elo_rank": 400}',
      isAdmin,
      date_time, -- created_at
      date_time, -- updated_at
      '',
      '',
      '',
      ''
    );
  INSERT INTO auth.identities
    (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    )
  VALUES
    (
      gen_random_uuid(),
      user_id,
      user_id,
      format(
        '{"sub":"%s","email":"%s"}',
        user_id::text,
        email
      )::jsonb,
      'email',
      date_time, -- last_sign_in_at
      date_time, -- created_at
      date_time  -- updated_at
    );
END;
$$ LANGUAGE plpgsql;
```

### Deleting all users manually

Usage:
```postgresql
DO $$
DECLARE
    usr_id uuid;
BEGIN
    FOR usr_id IN SELECT id FROM auth.users LOOP
        PERFORM public.user_delete(usr_id);
    END LOOP;
END $$;
```

### Remove all sessions for a user

```postgresql
set
  search_path to auth;

delete from auth.sessions
where
  user_id = 'USER-UUID-GOES-HERE'
```
