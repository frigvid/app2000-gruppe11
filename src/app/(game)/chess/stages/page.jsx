"use client";

import StagesCreateOpeningModal from "@ui/chess/stages/stages-create-opening-modal";
import ProtectClientContent from "@auth/components/protect-client-content";
import StagesRepertoires from "@/app/(game)/chess/stages/components/stages-repertoires";
import StagesOpenings from "@/app/(game)/chess/stages/components/stages-openings";
import Buffering from "@auth/components/fragment/Buffering";
import {createClient} from "@/app/shared/utils/supabase/client";
import React, {Suspense, useState} from "react";
import {useTranslation} from "react-i18next";

/**
 * Route for the game's stages.
 *
 * Stages are fetched from the database, and displayed in a grid.
 *
 * @author qwertyfyr, frigvid
 * @created 2024-04-02
 * @return {JSX.Element} The Stages component.
 */
export default function Stages() {
	const supabase = createClient();
	const {t} = useTranslation();
	const [isCreatingRepertoire, setIsCreatingRepertoire] = useState(false);
	const [selectedOpenings, setSelectedOpenings] = useState([]);
	
	/**
	 * This function handles selecting openings, and adding them to your
	 * repertoire.
	 *
	 * @author frigvid
	 * @created 2024-04-15
	 * @param openingId The opening's ID.
	 */
	const handleSelection = (openingId) => {
		setSelectedOpenings(prevOpenings => {
			if (prevOpenings.includes(openingId)) {
				return prevOpenings.filter(id => id !== openingId);
			} else {
				return [...prevOpenings, openingId];
			}
		});
	};
	
	/**
	 * This saves the repertoire to the database, and clears
	 * the selection so the user can proceed to make more.
	 *
	 * @author frigvid
	 * @created 2024-04-15
	 */
	const saveRepertoire = async () => {
		setIsCreatingRepertoire(false);
		const {data: {user}, error: AuthError} = await supabase.auth.getUser();
		
		if (AuthError) {
			console.error("Something went wrong while getting the user!", AuthError);
		} else {
			/**
			 * Usually I tend to create SQL functions for this kind of thing,
			 * though there's no reason not to use this; it's generally just
			 * as secure. And this is small enough that it's not really worth
			 * another SQL function for it.
			 */
			const {error} = await supabase
				.from('repertoire')
				.insert([{
					usr: user.id,
					openings: selectedOpenings
				}]);
			
			if (error) {
				console.log("Something went wrong while saving the repertoire!", error);
			} else {
				/* Clear selected openings, so they're not selected the next time you
				 * press the create repertoire button.
				 */
				setSelectedOpenings([]);
			}
		}
	};
	
	return (
		<>
			<Suspense fallback={<Buffering/>}>
				<div className="flex justify-center items-center flex-col space-y-16 mt-4 mb-4">
					<ProtectClientContent showError={false} noBuffer={true}>
						<div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-40">
							<div className="flex flex-col">
								<p className="mb-3">{t("chess.create_opening.label")}</p>
								<StagesCreateOpeningModal/>
							</div>
							<div className="flex flex-col">
								<p className="mb-3 first-letter:uppercase">{t("chess.repertoire.header.label")}</p>
								<button
									className={
										`w-full ${
											isCreatingRepertoire
												? "bg-green-500"
												: "bg-buttoncolor"
										} inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal`
									}
									onClick={
										isCreatingRepertoire
											? saveRepertoire
											: () => setIsCreatingRepertoire(true)
									}
								>
									{
										isCreatingRepertoire
											? (t("chess.repertoire.header.button.save"))
											: (t("chess.repertoire.header.button.create"))
									}
								</button>
							</div>
						</div>
					</ProtectClientContent>
					<div className="flex flex-col justify-center space-y-10">
						<ProtectClientContent showError={false} noBuffer={true}>
							<StagesRepertoires/>
						</ProtectClientContent>
						<StagesOpenings
							isCreatingRepertoire={isCreatingRepertoire}
							selectedOpenings={selectedOpenings}
							handleSelection={handleSelection}
						/>
					</div>
				</div>
			</Suspense>
		</>
	)
}
