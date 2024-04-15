"use client";

import StagesCreateOpeningModal from "@ui/chess/stages/stages-create-opening-modal";
import ProtectClientContent from "@/app/(auth)/components/protect-client-content";
import StagesRepertoires from "@/app/chess/stages/components/stages-repertoires";
import StagesOpenings from "@/app/chess/stages/components/stages-openings";
import Buffering from "@auth/components/fragment/Buffering";
import React, {Suspense} from "react";
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
	const {t} = useTranslation();
	
	return (
		<>
			<Suspense fallback={<Buffering/>}>
				<div className='flex justify-center items-center flex-col space-y-16'>
					<ProtectClientContent showError={false} noBuffer={true}>
						<div className="flex flex-row space-x-40">
							<div className="flex flex-col">
								<p className="mb-3">{t("chess.create_opening.label")}</p>
								<StagesCreateOpeningModal/>
							</div>
							<div className="flex flex-col">
								<p className="mb-3">{t("chess.create_repertoire.header.label")}</p>
								{/* Repertoire button. */}
							</div>
						</div>
					</ProtectClientContent>
					<div className="flex flex-col justify-center space-y-10">
						<StagesRepertoires/>
						<StagesOpenings/>
					</div>
				</div>
			</Suspense>
		</>
	)
}
