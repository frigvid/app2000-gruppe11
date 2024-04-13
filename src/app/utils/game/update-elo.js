import {createClient} from "@utils/supabase/client";

/**
 * Updates the elo rating for a user.
 *
 * Be warned that this is not a real implementation, due to
 * time constraints, however, this is a decent foundation
 * through which to expand upon.
 *
 * @author qwertyfyr
 * @created 2024-04-12
 * @param user_id used to find the correct user to get information and update elo
 * @param win boolean value used to check if the user won or lost 
 */
export async function updateElo(user_id, win){
	const supabase = createClient();
	
	//Get profile data.
	const { data, error } = await supabase
		.from('profiles')
		.select('elo_rank')
		.eq('id', user_id)
		.single();

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error("Profile not found");
	}

	let currentElo = data.elo_rank;
	let newElo = currentElo;

	if (typeof win !== 'boolean') {
		throw new Error("No boolean inputted")
	}

	try {
		if (win === true) {
			newElo = currentElo + 10;
		} else {
			newElo = currentElo - 10;
		}

		//Updates elo value in the database.
		const {updateError} = await supabase
			.from('profiles')
			.update({ elo_rank: newElo})
			.eq('id', user_id);

		if (updateError) {
			throw updateError;
		}

		console.log("Elo updated successfully");
	} catch (error) {
		console.error("Error updating elo:", error.message);
	}

}
