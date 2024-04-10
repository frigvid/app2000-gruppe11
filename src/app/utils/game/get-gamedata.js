import { createClient } from "@utils/supabase/client";


export async function fetchOpenings() {
    const supabase = createClient();

    try {
        //get data
        const {data, error} = await supabase
            .from('openings')
            .select('name, desc, id');
            return data;

    } catch (e) {
        console.error('Error in getOpening: ', e);
        throw e;
    }
}
