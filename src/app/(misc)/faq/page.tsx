"use client";

import ConfirmBeforeAction from "@shared/components/misc/confirm-before-action";
import {createClient} from "@shared/utils/supabase/client";
import FaqModal from "@misc/faq/components/faq-modal";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useState} from "react";
import LockIcon from "@mui/icons-material/Lock";
import {useTranslation} from "react-i18next";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

/**
 * Represents the main FAQ application component.
 *
 * @author frigvid
 * @contributor oldpopcorn
 * @created 2024-04-06
 * @returns {JSX.Element} The FAQ component rendering the FAQ section.
 */
export default function FAQ() {
	const supabase = createClient();
	const {t} = useTranslation();
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState(null);
	const [faqs, setFaqs] = useState([]);
	
	/**
	 * Fetches faqs from the public.faq table.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	useEffect(() => {
		const fetchFaqs = async () => {
			const {data, error} = await supabase
				.from('faq')
				.select('*');
			
			if (error) {
				console.error("Error fetching faqs:", error);
			} else {
				setFaqs(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
			}
		}
		
		void fetchFaqs();
	}, [supabase]);
	
	/**
	 * Fetches the user and checks if the user is an admin.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	useEffect(() => {
		const fetchUserAndAdmin = async () => {
			const {data: isAdminBool, error: isAdminError} = await supabase.rpc("admin_is_admin");
			const {data} = await supabase.auth.getUser();
			
			if (isAdminError) {
				console.error("Supabase admin RPC postgres error: " + isAdminError);
			} else {
				setIsAdmin(isAdminBool);
				setUser(data?.user);
			}
		};
		
		void fetchUserAndAdmin();
	}, [supabase]);
	
	/**
	 * This useEffect handles realtime INSERTs, UPDATEs and DELETEs
	 * from the public.faq table.
	 *
	 * See {@link @/app/chess/stages/components/StagesOpenings}
	 * for some additional details.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 * @see https://supabase.com/docs/guides/realtime
	 */
	useEffect(() => {
		const faqs = supabase
			.channel('faq')
			.on('postgres_changes', {
				event: 'INSERT',
				schema: 'public',
				table: 'faq'
			}, async (payload) => {
				setFaqs(prevFaqs => [...prevFaqs, payload.new].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
			})
			.on('postgres_changes', {
				event: 'UPDATE',
				schema: 'public',
				table: 'faq'
			}, async (payload) => {
				setFaqs(prevFaqs => {
					if (payload.new.is_published) {
						return [...prevFaqs.filter(faqs => faqs.id !== payload.new.id), payload.new].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
					} else {
						if (isAdmin) {
							return prevFaqs.map(faqs => faqs.id === payload.new.id ? payload.new : faqs).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
						} else {
							return prevFaqs.filter(faqs => faqs.id !== payload.new.id);
						}
					}
				});
			})
			.on('postgres_changes', {
				event: 'DELETE',
				schema: 'public',
				table: 'faq'
			}, async (payload) => {
				setFaqs(prevFaqs => prevFaqs.filter(faqs => {
					return faqs.id !== payload.old.id
				}));
			})
			.subscribe();
		
		return () => {
			void supabase.removeChannel(faqs);
		}
	}, [isAdmin, supabase]);
	
	/**
	 * Deletes a FAQ item.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 * @param faqId The ID of the FAQ item to delete.
	 */
	function deleteFaq(faqId: any) {
		return (
			<ConfirmBeforeAction
				confirmMessage={t("faq.delete.confirmation")}
				onConfirm={async () => {
					const {error} = await supabase
						.from('faq')
						.delete()
						.eq('id', faqId);
					
					if (error) {
						console.error("Error deleting faq item!", error);
					}
				}}
			>
				<Tooltip title={t("faq.delete.tooltip")}>
					<IconButton>
						<DeleteIcon color="error"/>
					</IconButton>
				</Tooltip>
			</ConfirmBeforeAction>
		)
	}
	
	return (
		<main className="flex flex-col m-4">
			<h1 className="text-4xl font-bold text-center">
				{t("faq.title")}
			</h1>
			{
				(user && isAdmin &&
					<FaqModal isAuthoring={true}/>
				)
			}
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mr-10 lg:ml-10">
				{
					faqs.map((faq) => (
						<div
							key={faq.id}
							className={`relative bg-white ${faq.is_published ? null : "border-2 border-red-500"} p-4 rounded-lg shadow-md h-auto lg:min-h-[10rem]`}
						>
							<div className="absolute top-0 right-0 m-2 space-y-2 flex flex-col">
								{
									(user && isAdmin &&
										<>
											<FaqModal isAuthoring={false} faqId={faq.id}/>
											{
												(user && isAdmin)
													? (
														<ConfirmBeforeAction
															confirmMessage={`${t("faq.publishing.part1")} ${faq.is_published ? t("faq.publishing.unpublish") : t("faq.publishing.publish")} ${t("faq.publishing.part2")} "${faq.title}"?`}
															onConfirm={async () => {
																const {error} = await supabase
																	.from('faq')
																	.update({
																		is_published: !faq.is_published
																	})
																	.eq('id', faq.id);
																
																if (error) {
																	console.error("Error updating faq item.", error);
																}
															}}
														>
															<Tooltip title={`${t("faq.publishing.alt1")} ${faq.is_published ? t("faq.publishing.unpublish") : t("faq.publishing.publish")} ${t("faq.publishing.alt2")}`}>
																<IconButton className="bg-white">
																	{
																		faq.is_published
																			? <LockOpenIcon className="text-green-500"/>
																			: <LockIcon className="text-red-500"/>
																	}
																</IconButton>
															</Tooltip>
														</ConfirmBeforeAction>
													)
													: null
											}
											{
												deleteFaq(faq.id)
											}
										</>
									)
								}
							</div>
							<div className="space-y-2">
								<Tooltip title={
									<div>
										<p>{t("faq.item.created_at")}: {faq.created_at}</p>
										<p>{t("faq.item.modified_at")}: {faq.modified_at}</p>
									</div>
								}
								>
									<h2 className="text-2xl font-bold mr-6">
										{faq.title}
									</h2>
								</Tooltip>
								<Tooltip title={t("faq.item.summary")}>
									<p className="italic text-center lg:text-left mr-6">
										{faq.summary}
									</p>
								</Tooltip>
								<Divider sx={{m: 6}}/>
								<p className="mr-6">
									{faq.content.split(/\r?\n/).map((line: any, i: any) => <span key={i}>{line}<br/></span>)}
								</p>
							</div>
						</div>
					))
				}
			</div>
		</main>
	)
}
