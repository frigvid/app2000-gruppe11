"use client";

import {createClient} from "@/app/shared/utils/supabase/client";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useTranslation} from "react-i18next";
import {flag} from "country-emoji"

/**
 * User profile's stat prop types.
 *
 * @author frigvid
 * @created 2024-04-08
 */
interface UserStatsProps {
	data: any;
}

/**
 * User profile's stat component.
 *
 * FIXME: Emoji support is spotty. Depends more often
 * 		 than not on the browser, rather than the
 * 		 packages I've tried. SVGs are an alternative.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function UserStats({
	data
}: UserStatsProps) {
	const supabase = createClient();
	const {t} = useTranslation();
	const staticUserId = usePathname().split('/').pop() || '';
	const [eloRank, setEloRank] = useState(data.elo_rank);
	const [gamesWon, setGamesWon] = useState(data.wins);
	const [gamesLost, setGamesLost] = useState(data.losses);
	const [gamesDrawn, setGamesDrawn] = useState(data.draws);
	const [gamesPlayed, setGamesPlayed] = useState(gamesWon + gamesLost + gamesDrawn);
	const [nationality, setNationality] = useState(data.nationality);
	
	/**
	 * This useEffect handles realtime UPDATEs on the
	 * public.gamedata and public.profiles table.
	 *
	 * See {@link @/app/chess/stages/components/StagesOpenings}
	 * for some additional details.
	 *
	 * @author frigvid
	 * @created 2024-04-15
	 * @see https://supabase.com/docs/guides/realtime
	 * @see https://supabase.com/docs/reference/javascript/subscribe?example=listen-to-multiple-events
	 */
	useEffect(() => {
		const stats = supabase
			.channel('stats')
			.on('postgres_changes', {
				event: 'UPDATE',
				schema: 'public',
				table: 'gamedata'
			}, async (payload) => {
				/* Call it paranoia, but just to be safe, I'm checking that the payload's
				 * user ID matches the static user ID.
				 */
				if (payload.new.id === staticUserId) {
					setGamesWon(payload.new.wins);
					setGamesLost(payload.new.losses);
					setGamesDrawn(payload.new.draws);
				}
			})
			.on('postgres_changes', {
				event: 'UPDATE',
				schema: 'public',
				table: 'profiles'
			}, async (payload) => {
				/* Call it paranoia, but just to be safe, I'm checking that the payload's
				 * user ID matches the static user ID.
				 */
				if (payload.new.id === staticUserId) {
					setEloRank(payload.new.elo_rank);
					setNationality(payload.new.nationality);
				}
			})
			.subscribe();
		
		return () => {
			void supabase.removeChannel(stats);
		}
	}, [supabase, staticUserId]);
	
	/**
	 * It's necessary to keep this in its own useState.
	 * Even when it shared the main one, and its dependencies
	 * were added, it did not work. But it's normal to have
	 * more than one, so it's fine.
	 *
	 * @author frigivd
	 * @created 2024-04-15
	 */
	useEffect(() => {
		setGamesPlayed(gamesWon + gamesLost + gamesDrawn);
	}, [gamesWon, gamesLost, gamesDrawn]);
	
	return (
		<div className="flex justify-around text-center space-x-4">
			<div>
				<h3 className="text-lg font-bold">{t("user_profile.user_stats.elo_rank")}</h3>
				<p>{eloRank}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">{t("user_profile.user_stats.games_played")}</h3>
				<p>{gamesPlayed}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">{t("user_profile.user_stats.games_won")}</h3>
				<p>{gamesWon}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">{t("user_profile.user_stats.games_lost")}</h3>
				<p>{gamesLost}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">{t("user_profile.user_stats.games_drawn")}</h3>
				<p>{gamesDrawn}</p>
			</div>
			{/* TODO: If the user does not have a set nationality, hide this. */}
			<div>
				<h3 className="text-lg font-bold">{t("user_profile.user_stats.nationality")}</h3>
				{/* FIXME: Unicode country codes does not render as an emoji. Might be prudent to switch to SVG. */}
				{
					(nationality === "none")
						? <p>?</p>
						: <p>{flag(nationality)}</p>
				}
			</div>
		</div>
	);
}
