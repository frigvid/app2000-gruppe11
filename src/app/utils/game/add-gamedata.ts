import {createClient} from "@supabase/supabase-js";

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
 */
export async function addGamedata(uuid: string, win: boolean): Promise<void> {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);

	// Validate input.
	if (!uuid) {throw new Error("No userid inputted")}
	if (typeof win !== 'boolean') {throw new Error("No win boolean inputted")}

	try {
		// Get data.
		const { data, error } = await supabase
			.from('gamedata')
			.select('userid, wins, losses')
			.eq('userid', uuid)
			.maybeSingle();

		if (error) {
			// Insert new user in table.
			const { error: insertError } = await supabase
				.from('gamedata')
				.insert([{ userid: uuid, wins: win ? 1 : 0, losses: win ? 0 : 1 }]);
			if (insertError) {throw insertError}
		} else if (data) {
			// Update existing user in table.
			const updateColumn = win ? { wins: data.wins + 1 } : { losses: data.losses + 1 };
			const { error: updateError } = await supabase
				.from('gamedata')
				.update(updateColumn)
				.eq('userid', uuid);
			if (updateError) {throw updateError}
		} else {
			// Handle case where user doesn't exist and no error was thrown.
			const { error: insertError } = await supabase
				.from('gamedata')
				.insert([{ userid: uuid, wins: win ? 1 : 0, losses: win ? 0 : 1 }]);
			if (insertError) {throw insertError}
		}
	} catch (err) {
		console.error('Error in addGamedata:', err);
		throw err;
	}
}
