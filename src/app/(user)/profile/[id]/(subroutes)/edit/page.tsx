"use client";

import editUserProfileSA from "@/app/(user)/profile/actions/edit-user-profile-sa";
import ProtectClientContent from "@auth/components/protect-client-content";
import {CountryDropdown} from 'react-country-region-selector';
import React, {useState} from "react";

/**
 * Basic, if somewhat crude and simplistic, page to edit a user's profile details.
 *
 * @author frigvid
 * @created 2024-04-09
 * @note The user must be authenticated to see this page.
 */
export default function EditUserProfile() {
	// NOTE: This useState cannot be null as its initial state, due to how the value prop of CountryDropdown works.
	const [nationality, setNationality] = useState("");
	
	return (
		<ProtectClientContent showError={true} noBuffer={false}>
			<main className="flex flex-col items-center justify-center bg-[#fffbf3] text-[#333] font-sans">
				<div className="bg-white max-w-[800px] min-w-[500px] m-5 p-5 shadow-md">
					<form action={editUserProfileSA}>
						{/* Avatar. */}
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="avatar_url">
								Avatar URL
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="url"
								name="avatar_url"
								placeholder="https://example.com/my-fancy-avatar"
							/>
						</div>
						{/* Display name. */}
						<div className="mb-2">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="display_name">
								Display name
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								name="display_name"
								placeholder="Fancy Name"
								required
							/>
						</div>
						{/* About me. */}
						<div className="mb-2">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="about_me">
								About me
							</label>
							<textarea
								className="shadow appearance-none border rounded w-full h-48 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								name="about_me"
								placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
							/>
						</div>
						{/* Nationality. */}
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="nationality">
								Nationality
							</label>
							<div
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							>
								<CountryDropdown
									classes="w-full"
									value={nationality}
									onChange={(nation) => setNationality(nation)}
								/>
							</div>
						</div>
						<div className="mb-2 pb-1 pt-1 text-center">
							<button
								className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
								formAction={editUserProfileSA}>
								Save details
							</button>
						</div>
					</form>
				</div>
			</main>
		</ProtectClientContent>
	);
}
