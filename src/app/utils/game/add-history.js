import {createClient} from "@utils/supabase/client";


export async function addHistory(uuid, [fenList]) {
	const supabase = createClient();
	
	// Validate input.
	if (!uuid) {
		throw new Error("No userid inputted")
	}
	
	if (typeof win !== 'boolean') {
		throw new Error("No win boolean inputted")
	}

}
