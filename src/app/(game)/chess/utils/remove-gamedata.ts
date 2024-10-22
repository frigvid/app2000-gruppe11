import {createClient} from "@shared/utils/supabase/client";

/**
 * This function is used to remove data from the public.gamedata table
 * on matching UUIDs.
 *
 * @author frigvid
 * @created 2024-02-05
 */
async function removeGamedata(uuid?: string): Promise<void> {
	const supabase = createClient();
	let userId: string = uuid;
	
	/* Validate input. Should never be thrown. */
	if (!userId) {
		throw new Error("User not logged in!")
	}
	
	try {
		/* See: https://supabase.com/docs/reference/javascript/using-filters
		 * See also: https://supabase.com/docs/reference/javascript/auth-getuser/delete
		 */
		void await supabase
			.from('gamedata')
			.delete()
			.eq('id', userId);
	} catch (error) {
		console.error('Error in addGamedata:', error);
		throw error;
	}
}

export default removeGamedata;
