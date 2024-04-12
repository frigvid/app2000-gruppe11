import { createClient } from "@utils/supabase/client";


/**
 * @author qwertyfyr
 * @param p_id used to make sure we get the correct opening 
 * @returns returns singular opening used for training
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

    } catch (error) {
        console.error('Error in getOpening: ', error);
        throw error;
    }
}
