"use client"

import React, {useState} from "react";
import {addGamedata} from "@utils/game/gamedata";
import {supabase} from "@utils/auth/authentication";

export default function Testing() {
	const [uuid, setUuid] = useState('');
	const [win, setWin] = useState(true);
	const [gameData, setGameData] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			await addGamedata(uuid, win);
			const {data, error} = await supabase
				.from('gamedata')
				.select('*')
				.eq('userid', uuid)
				.single();
			if (error) throw error;
			setGameData(data);
		} catch (error) {
			setGameData({error: error.message});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>Update Game Data</h1>
			<form onSubmit={handleSubmit}>
				<label>
					User ID (UUID):
					<input type="text" value={uuid} onChange={(e) => setUuid(e.target.value)} required/>
				</label>
				<br/>
				<button type="button" onClick={() => setWin(!win)}>
					Toggle Win/Loss (Currently {win ? 'Win' : 'Loss'})
				</button>
				<br/>
				<button type="submit" disabled={loading}>
					{loading ? 'Updating...' : 'Update Data'}
				</button>
			</form>
			{gameData && (
				<div>
					<h2>Game Data:</h2>
					{gameData.error ? (
						<p>Error: {gameData.error}</p>
					) : (
						<ul>
							<li>User ID: {gameData.userid}</li>
							<li>Wins: {gameData.wins}</li>
							<li>Losses: {gameData.losses}</li>
						</ul>
					)}
				</div>
			)}
		</div>
	);
}
