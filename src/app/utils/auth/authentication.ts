import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);


/*
async function signUpNewUser() {
	const {data, error} = await supabase.auth.signUp({
		email: 'example@email.com',
		password: 'example-password',
		options: {
			emailRedirectTo: 'https://localhost:3000/welcome'
		}
	})
}

async function signInWithEmail() {
	const {data, error} = await supabase.auth.signInWithPassword({
		email: 'example@email.com',
		password: 'example-password'
	})
}

async function signOut() {
	const {error} = await supabase.auth.signOut()
}
*/
