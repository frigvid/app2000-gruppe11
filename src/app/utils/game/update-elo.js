import {createClient} from "@utils/supabase/client";

/**
 * This function is used to add data to the public.gamedata table
 * in Supabase's PostgreSQL database. There are three columns,
 * the userid which is based on auth.users.id, and a bigint
 * wins and losses columns.
 *
 * These are iterative counts, as in there should only ever be
 * one instance of the userid.
 *
 * @param uuid The auth.users.id in question.
 * @param win If true, increments wins column. If false, increments losses column.
 * @author frigvid
 */
export async function updateElo(user_id, win){
	const supabase = createClient();


	//Get profile data
	const { data, error } = await supabase
		.from('profiles')
		.select('elo_rank')
		.eq('id', user_id)
		.single();

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error('Profile not found');
	}

	let currentElo = data.elo_rank;
	let newElo = currentElo;

	if (typeof win !== 'boolean') {
		throw new Error("No boolean inputted")
	}

	try {

		if(win == true) {
			newElo = currentElo + 10;
		} else {
			newElo = currentElo - 10;
		}

		//Updates elo value in the database
		const { updateError } = await supabase
			.from('profiles')
			.update({ elo_rank: newElo})
			.eq('id', user_id);

		if (updateError) {
			throw updateError;
		}

		console.log('Elo updated successfully');
	} catch (error) {
		console.error('Error updating elo:', error.message);
	}

}
