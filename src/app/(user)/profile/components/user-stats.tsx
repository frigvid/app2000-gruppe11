"use client";

import {flag} from "country-emoji"
import React from "react";

/**
 * User profile's stat prop types.
 */
interface UserStatsProps {
	elo_rank: number;
	games_played: number;
	games_won: number;
	games_lost: number;
	games_drawn: number;
	nationality: string;
}

/**
 * User profile's stat component.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function UserStats({
	elo_rank,
	games_played,
	games_won,
	games_lost,
	games_drawn,
	nationality
}: UserStatsProps) {
	return (
		<div className="flex justify-around text-center space-x-4">
			<div>
				<h3 className="text-lg font-bold">ELO Rating</h3>
				<p>{elo_rank}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Games Played</h3>
				<p>{games_played}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Wins</h3>
				<p>{games_won}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Losses</h3>
				<p>{games_lost}</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Draws</h3>
				<p>{games_drawn}</p>
			</div>
			{/* TODO: If the user does not have a set nationality, hide this. */}
			<div>
				<h3 className="text-lg font-bold">Nationality</h3>
				{/* FIXME: Unicode country codes does not render as an emoji. Might be prudent to switch to SVG. */}
				{
					(nationality === "Select Country")
						? <p>?</p>
						: <p>{flag(nationality)}</p>
				}
			</div>
		</div>
	);
}
