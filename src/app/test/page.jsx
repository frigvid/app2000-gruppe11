"use client";

import {createClient} from "@utils/supabase/client";
import React, {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";

export default function AddFriends() {
	const supabase = createClient();
	const [searchTerm, setSearchTerm] = useState('');
	const [searchUser, setSearchUser] = useState(null);
	const [searchStatus, setSearchStatus] = useState(null);
	const [user, setUser] = useState(null);
	const [friendStatus, setFriendStatus] = useState(null);
	
	useEffect(() => {
		if (searchTerm) {
			/**
			 * Fetches the currently logged-in user.
			 *
			 * @return {Promise<void>} The currently logged-in user, once resolved.
			 */
			const fetchUser = async () => {
				const {data: {user}, error} = await supabase.auth.getUser();
				
				if (error) {
					console.error("Getting currently logged in user failed!", error);
				} else {
					setUser(user);
				}
			}
			
			/**
			 * Fetches a user based on the search term.
			 *
			 * @return {Promise<void>} The user that matches the search term, once resolved.
			 */
			const fetchSearchUser = async () => {
				const {data, error} = await supabase.rpc("search_user", {search_term: searchTerm});
				
				if (error) {
					//console.error("Error fetching user:", error);
					setSearchStatus(false);
				} else {
					setSearchStatus(true);
					setSearchUser(data.pop());
				}
			};
			
			void fetchUser();
			void fetchSearchUser();
		} else {
			setSearchUser(null);
		}
	}, [searchTerm, supabase]);
	
	/**
	 * Fetches the friend status of the search user.
	 *
	 * This is in its own useEffect clause to ensure
	 * it actually gets the search user before trying to
	 * fetch the friend status.
	 */
	useEffect(() => {
		if (searchUser) {
			const fetchFriendStatus = async () => {
				const {data, error} = await supabase.rpc("friend_status", {other_user: searchUser.id});
				
				if (error) {
					console.error("Error fetching friend status:", error);
				} else {
					setFriendStatus(data);
				}
			}
			
			void fetchFriendStatus();
		}
	}, [searchUser, supabase]);
	
	return (
		<main className="flex justify-center items-center flex-col">
			<div className="bg-white p-4 rounded shadow-lg w-[40rem] h-[40rem] flex items-center flex-col space-y-4">
				<section className="max-w-md text-justify space-y-4 space-x-18 text-lg">
					<h2 className="font-semibold text-center">Want to add some friends?</h2>
					<p className="text-center">Search for a user!</p>
					<p>
						<span>You can do that by inputting a user display name <strong>(found under their profile picture)</strong></span>
						<span> or through their ID (the long text in the link to their profile,</span>
						<span> e.g. <code>/profile/<strong>00ba54a6-c585-4871-905e-7d53262f05c1</strong></code></span>
					</p>
				</section>
				<input
					id="search-user"
					type="text"
					placeholder="Input an ID or display name"
					className="border-2 w-[28rem] h-12 text-center bg-foreground"
					value={searchTerm}
					onChange={(e) => {setSearchTerm(e.target.value); if (e.target.value === '') {setSearchStatus(null)}}}
				/>
				<div className={`border-2 ${(searchStatus !== null) ? ((searchStatus) ? 'border-green-500' : 'border-red-500') : ''} w-[28rem] h-[20rem] flex justify-center items-center bg-foreground`}>
					{
						(searchStatus !== true && searchStatus !== null)
							? <p className="font-bold text-[2rem] uppercase underline decoration-red-500 underline-offset-4">User not found!</p>
							: (
								<>
									{searchUser && (
										<div className="flex flex-col items-center space-y-4">
											<div>
												<Avatar src={searchUser.avatar_url} sx={{width: 96, height: 96}}/>
											</div>
											<div>
												<h2 className="text-center">{searchUser.display_name}</h2>
												<span className="text-xs">{searchUser.id}</span>
											</div>
											<div>
												{
													(user && user.id === searchUser.id)
														? <p className="border-2 border-red-500 p-2">Sorry, you cannot befriend yourself.</p>
														: ((friendStatus !== true && friendStatus !== null)
															? <p className="border-2 border-orange-500 p-2">Friend request is sent, but no answer yet.</p>
															: (
																<button
																	className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger"
																	onClick={async () => {
																		const {error} = await supabase.rpc("friend_request_send", {other_user: searchUser.id})
																		
																		if (error) {
																			console.error('Error sending friend request:', error);
																		}
																	}}
																>
																	Send a friend request?
																</button>
															)
														)
												}
											</div>
										</div>
									)}
								</>
							)
					}
				</div>
			</div>
		</main>
	)
}
