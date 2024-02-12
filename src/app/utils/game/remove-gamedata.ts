import {createClient} from "@lib/supabase/client";

/**
 * This function is used to remove data from the public.gamedata table
 * on matching UUIDs.
 *
 * Currently, it's hard-coded to a user if no input is given.
 */
async function removeGamedata(uuid?: string): Promise<void> {
	const supabase = createClient();
	//const {data: {user}} = await supabase.auth.getUser().then((user) => {return user});
	let userId: string;

	// Validate input.
	if (!uuid) {
		//userId = user.id;
		userId = "dfe83755-0afa-438d-8740-b980ea59d5a4";
		throw new Error("User not logged in!")
	} else {
		userId = uuid;
	}

	try {
		// See: https://supabase.com/docs/reference/javascript/using-filters
		// See also: https://supabase.com/docs/reference/javascript/auth-getuser/delete
		const {error} = await supabase
			.from('gamedata')
			.delete()
			.eq('userid', userId);
	} catch (err) {
		console.error('Error in addGamedata:', err);
		throw err;
	}
}

export default removeGamedata;
