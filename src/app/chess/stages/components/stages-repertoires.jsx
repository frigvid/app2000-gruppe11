"use client";

import StagesChessboardThumbnail from "@ui/chess/stages/stages-chessboard-thumbnail";
import StagesCreateOpeningModal from "@ui/chess/stages/stages-create-opening-modal";
import ProtectClientContent from "@/app/(auth)/components/protect-client-content";
import Buffering from "@auth/components/fragment/Buffering";
import React, {Suspense, useEffect, useState} from "react";
import StagesModal from "@ui/chess/stages/stages-modal";
import {fetchOpenings} from "@utils/game/get-gamedata";
import {createClient} from "@utils/supabase/client";
import {useTranslation} from "react-i18next";

/**
 * Route for the game stages' repertoires list.
 *
 * Repertoires are fetched from the database, and displayed in a grid.
 *
 * @author frigvid
 * @created 2024-04-15
 * @return The StagesRepertoires component.
 */
export default function StagesRepertoires() {
	const supabase = createClient();
	const {t} = useTranslation();
	
	return (
		<>
			<Suspense fallback={<Buffering/>}>
				<div className="space-y-4">
					<h2 className="text-center font-semibold text-3xl">Your repertoires</h2>
					<section id="repertoireList">
						{
						
						}
					</section>
				</div>
			</Suspense>
		</>
	)
}
