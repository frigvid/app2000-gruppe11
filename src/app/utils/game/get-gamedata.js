import { createClient } from "@utils/supabase/client";


/**
 * @author qwertyfyr
 * @returns returns all data for all fetched openings.
 */
export async function fetchOpenings() {
    const supabase = createClient();

    try {
        //get data
        const {data, error} = await supabase
            .from('openings')
            .select('id, created_by, title, description, pgn');

			return data;

    } catch (e) {
        console.error('Error in getOpening: ', e);
        throw e;
    }
}
