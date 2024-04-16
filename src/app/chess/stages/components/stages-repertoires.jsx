"use client";

import RepertoireModal from "@/app/chess/stages/components/repertoire-modal";
import Buffering from "@auth/components/fragment/Buffering";
import React, {Suspense, useEffect, useState} from "react";
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
	const [repertoires, setRepertoires] = useState([]);
	const [isVisibile, setIsVisible] = useState(true);
	
	useEffect(() => {
		const fetchRepertoires = async () => {
			const {data, error} = await supabase
				.from('repertoire')
				.select('id, timestamp, usr, openings, title, description');
			
			if (error) {
				console.error("Something went wrong while getting repertoires!", error);
			} else {
				setRepertoires(data);
			}
		};
		
		void fetchRepertoires();
	}, [supabase]);
	
	/**
	 * This useEffect handles realtime INSERTs and DELETEs
	 * from the public.repertoire table.
	 *
	 * See {@link @/app/chess/stages/components/StagesOpenings}
	 * for some additional details.
	 *
	 * @author frigvid
	 * @created 2024-04-15
	 * @see https://supabase.com/docs/guides/realtime
	 */
	useEffect(() => {
		const repertoires = supabase
			.channel('repertoires')
			.on('postgres_changes', {
				event: '*',
				schema: 'public',
				table: 'repertoire'
			}, (payload) => {
				if (payload.eventType === 'INSERT') {
					setRepertoires(prevRepertoires => [...prevRepertoires, payload.new]);
				} else if (payload.eventType === 'DELETE') {
					setRepertoires(prevRepertoires => prevRepertoires.filter(repertoires => repertoires.id !== payload.old.id));
				}
			}).subscribe();
		
		return () => {
			void supabase.removeChannel(repertoires);
		}
	}, [supabase, repertoires]);
	
	return (
		<>
			<Suspense fallback={<Buffering/>}>
				<div className="space-y-4">
					<h2
						className={`text-center font-semibold text-3xl cursor-pointer ${isVisibile ? "before:content-['▾']" : "before:content-['▸']"}`}
						onClick={() => setIsVisible(!isVisibile)}
					>
						Your repertoires
					</h2>
					{
						isVisibile && (
							<section id="repertoireList" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{
									(repertoires === null)
										? <p></p>
										: (
											repertoires.map((repertoire) => {
												return (
													<div
														key={(repertoire.title + repertoire.description + repertoire.id)}
														className='p-4 bg-[#976646] rounded-md w-64 h-28 flex flex-col justify-between items-center text-white'
													>
														<h2 className='font-semibold'>{repertoire.title}</h2>
														<RepertoireModal repertoire={repertoire}/>
													</div>
												)
											})
										)
								}
							</section>
						)
					}
				</div>
			</Suspense>
		</>
	)
}
