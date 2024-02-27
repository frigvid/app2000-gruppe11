import {createClient} from "@utils/supabase/client";

/**
 * This function is used to remove data from the public.gamedata table
 * on matching UUIDs.
 */
async function removeGamedata(uuid?: string): Promise<void> {
	const supabase = createClient();
	let userId: string = uuid;
	
	// Validate input. Should never be thrown.
	if (!userId) {
		throw new Error("User not logged in!")
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
