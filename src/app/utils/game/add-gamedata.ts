import {createClient} from "@utils/supabase/client";

/**
 * This function is used to add data to the public.gamedata table
 * in Supabase's PostgreSQL database. There are three columns,
 * the id which is based on auth.users.id, and a bigint
 * wins and losses columns.
 *
 * These are iterative counts, as in there should only ever be
 * one instance of the id.
 *
 * FIXME: Doesn't account for draws.
 *
 * @author frigvid
 * @created 2024-01-25
 * @param uuid The auth.users.id in question.
 * @param win If true, increments wins column. If false, increments losses column.
 */
export async function addGamedata(uuid: string, win: boolean): Promise<void> {
	const supabase = createClient();
	
	/* Validate input. */
	if (!uuid) {
		throw new Error("No id inputted")
	}
	
	if (typeof win !== 'boolean') {
		throw new Error("No win boolean inputted")
	}
	
	try {
		/* Get data. */
		const {data, error} = await supabase
			.from('gamedata')
			.select('id, wins, losses, draws')
			.eq('id', uuid)
			.maybeSingle();
		
		if (error) {
			/* Insert new user in table. */
			const {error: insertError} = await supabase
				.from('gamedata')
				.insert([{
					id: uuid,
					wins: win
						? 1
						: 0,
					losses: win
						? 0
						: 1
				}]);
			if (insertError) {
				throw insertError
			}
		} else if (data) {
			/* Update existing user in table. */
			const updateColumn = win ? {wins: data.wins + 1} : {losses: data.losses + 1};
			const {error: updateError} = await supabase
				.from('gamedata')
				.update(updateColumn)
				.eq('id', uuid);
			if (updateError) {
				throw updateError
			}
		} else {
			/* Handle case where user doesn't exist and no error was thrown. */
			const {error: insertError} = await supabase
				.from('gamedata')
				.insert([{
					id: uuid,
					wins: win
						? 1
						: 0,
					losses: win
						? 0
						: 1
				}]);
			if (insertError) {
				throw insertError
			}
		}
	} catch (error) {
		console.error('Error in addGamedata:', error);
		throw error;
	}
}
