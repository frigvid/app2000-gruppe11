import { createClient } from "@utils/supabase/client";


export async function getOpenings() {
    const supabase = createClient();

    try {
        //get data
        const {data, error} = await supabase
            .from('openings')
            .select('name, desc, id');

    } catch (e) {
        console.error('Error in getOpening: ', e);
        throw e;
    }
}
