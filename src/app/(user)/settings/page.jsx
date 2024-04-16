"use client";

import ProtectClientContent from "@auth/components/protect-client-content";
import Buffering from "@auth/components/fragment/Buffering";
import {createClient} from "@utils/supabase/client";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import {useRouter} from "next/navigation";

/**
 * User settings page.
 *
 * Allows users to change their email and password.
 *
 * @author frigvid
 * @created 2024-01-31
 */
export default function UserSettings() {
	const supabase = createClient();
	const {t} = useTranslation();
	const [isLoading, setIsLoading] = useState(true);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const router = useRouter();
	
	/**
	 * Fetch the user's email.
	 *
	 * @author frigvid
	 * @created 2024-04-14
	 */
	useEffect(() => {
		setIsLoading(true);
		
		const fetchUser = async () => {
			const {data: {user}, error} = await supabase.auth.getUser();
			
			if (error) {
				console.error("Something went wrong while fetching the user.", error);
			} else {
				setEmail(user?.email);
				setIsLoading(false);
			}
		};
		
		void fetchUser();
	}, [supabase]);
	
	/**
	 * Loading screen to ensure that content is properly
	 * pre-loaded before rendering.
	 *
	 * @author frigvid
	 * @created 2024-04-14
	 * @returns {Buffering} The bufferin/loading screen.
	 */
	if (isLoading) {
		return <Buffering/>;
	}
	
	return (
		<ProtectClientContent showError={true} noBuffer={false}>
			<main className="flex flex-col items-center justify-center bg-[#fffbf3] text-[#333] font-sans">
				<div className="flex flex-col justify-between bg-white w-full h-full md:w-[40rem] m-5 p-5 shadow-md">
					<section>
							{/* E-mail. */}
						<div className="mb-4 space-y-2">
							<Tooltip title={t("user_settings.email.tooltip")}>
								<label
									className="block text-gray-700 text-sm font-bold"
									htmlFor="change_email"
								>
									{t("user_settings.email.label")}
								</label>
							</Tooltip>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="email"
								name="change_email"
								placeholder={t("user_settings.email.placeholder")}
								value={email ? email : ""}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<button
								className="bg-green-400 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
								onClick={async () => {
									await supabase.auth.updateUser({
										email: email
									})
								}}
							>
								{t("user_settings.button.email")}
							</button>
							<p className="italic text-xs text-center">({t("user_settings.email.notice")})</p>
						</div>
						{/* Password. */}
						<div className="mb-4 space-y-2">
							<Tooltip title={t("user_settings.password.tooltip")}>
								<label
									className="block text-gray-700 text-sm font-bold"
									htmlFor="change_password"
								>
									{t("user_settings.password.label")}
								</label>
							</Tooltip>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="password"
								name="change_password"
								placeholder="••••••••"
								onChange={(e) => {setPassword(e.target.value)}}
							/>
							<button
								className="bg-green-400 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
								onClick={async () => {
									await supabase.auth.updateUser({
										password: password
									})
								}}
							>
								{t("user_settings.button.password")}
							</button>
						</div>
					</section>
					<section className="space-y-2 text-center">
						<p className="italic text-xs">({t("user_settings.delete.notice")})</p>
						<button
							className="bg-red-400 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
							onClick={() => {
								router.push("/delete");
							}}
						>
							{t("user_settings.button.delete")}
						</button>
					</section>
				</div>
			</main>
		</ProtectClientContent>
	);
}
