import { createClient } from "@utils/supabase/client";


/**
 * Gets the openings from the database.
 *
 * @return {Promise} The data from the database.
 */
export async function fetchPgn(p_id) {
    const supabase = createClient();

    try {
        //get data
        const {data, error} = await supabase
            .from('openings')
            .select('title, description, id, pgn')
				.eq('id', p_id);
            return data;

    } catch (e) {
        console.error('Error in getOpening: ', e);
        throw e;
    }
}
