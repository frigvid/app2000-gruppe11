import {createClient} from "@utils/supabase/client";


/**
 * To be finished, but is used to add an array containing multiple fen strings and adds to a history table
 * @author qwertyfyr
 * @param {*} uuid user id
 * @param {*} fenList Array containing fen strings 
 */
export async function addHistory(uuid, fenList) {
	const supabase = createClient();
	
	// Validate input.
	if (!uuid) {
		throw new Error("No userid inputted")
	}
	
	if (typeof win !== 'boolean') {
		throw new Error("No win boolean inputted")
	}

	// try {.from('history') .insert('game_history': fenList) .eq('id', uuid)} catch(error) {throw error}
}
