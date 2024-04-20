"use client";

import ConfirmBeforeAction from "@shared/components/misc/confirm-before-action";
import {createClient} from "@shared/utils/supabase/client";
import DocsModal from "@misc/docs/components/docs-modal";
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
 * Page for user-application documentation.
 *
 * @author frigvid
 * @contributor oldpopcorn
 * @created 2024-01-30
 * @warning This has the same limitations as news, see {@link @misc/news/page.tsx}.
 */
export default function Docs() {
	const supabase = createClient();
	const {t} = useTranslation();
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState(null);
	const [docs, setDocs] = useState([]);
	
	/**
	 * Fetches docs from the public.docs table.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	useEffect(() => {
		const fetchDocs = async () => {
			const {data, error} = await supabase
				.from('docs')
				.select('*');
			
			if (error) {
				console.error("Error fetching docs:", error);
			} else {
				setDocs(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
			}
		}
		
		void fetchDocs();
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
	 * from the public.docs table.
	 *
	 * See {@link @/app/chess/stages/components/StagesOpenings}
	 * for some additional details.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 * @see https://supabase.com/docs/guides/realtime
	 */
	useEffect(() => {
		const docs = supabase
			.channel('docs')
			.on('postgres_changes', {
				event: 'INSERT',
				schema: 'public',
				table: 'docs'
			}, async (payload) => {
				setDocs(prevDocs => [...prevDocs, payload.new].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
			})
			.on('postgres_changes', {
				event: 'UPDATE',
				schema: 'public',
				table: 'docs'
			}, async (payload) => {
				setDocs(prevDocs => {
					if (payload.new.is_published) {
						return [...prevDocs.filter(docs => docs.id !== payload.new.id), payload.new].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
					} else {
						if (isAdmin) {
							return prevDocs.map(docs => docs.id === payload.new.id ? payload.new : docs).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
						} else {
							return prevDocs.filter(docs => docs.id !== payload.new.id);
						}
					}
				});
			})
			.on('postgres_changes', {
				event: 'DELETE',
				schema: 'public',
				table: 'docs'
			}, async (payload) => {
				setDocs(prevDocs => prevDocs.filter(docs => {
					return docs.id !== payload.old.id
				}));
			})
			.subscribe();
		
		return () => {
			void supabase.removeChannel(docs);
		}
	}, [isAdmin, supabase]);
	
	/**
	 * Deletes a doc item.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 * @param docId The ID of the doc item to delete.
	 */
	function deleteDoc(docId: any) {
		return (
			<ConfirmBeforeAction
				confirmMessage={t("docs.delete.confirm")}
				onConfirm={async () => {
					const {error} = await supabase
						.from('docs')
						.delete()
						.eq('id', docId);
					
					if (error) {
						console.error("Error deleting docs item!", error);
					}
				}}
			>
				<Tooltip title={t("docs.delete.tooltip")}>
					<IconButton>
						<DeleteIcon color="error"/>
					</IconButton>
				</Tooltip>
			</ConfirmBeforeAction>
		)
	}
	
	return (
		<main className="flex flex-col">
			<div className="space-y-4">
				<h1 className="text-4xl font-bold text-center">
					{t("docs.title")}
				</h1>
				<div>
					<p className="text-center flex flex-col space-y-2">
						<span>{t("docs.faq.label")}</span>
						<span>
							<Link
								href="/faq"
								className="w-full md:w-[13rem] bg-buttoncolor hover:bg-[#976646] hover:text-white inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
							>
								{t("docs.faq.button")}
							</Link>
						</span>
					</p>
				</div>
			</div>
			<div className="m-4 w-full md:w-[20rem] lg:w-[30rem] place-self-center">
				<Divider/>
			</div>
			{
				(user && isAdmin &&
					<DocsModal isAuthoring={true}/>
				)
			}
			<div className="grid grid-cols-1 gap-4 place-self-center md:w-[30rem] lg:w-[45rem] align-middle">
				{
					docs.map((doc) => (
						<div
							key={doc.id}
							className={`relative bg-white ${doc.is_published ? null : "border-2 border-red-500"} p-4 rounded-lg shadow-md h-auto lg:min-h-[10rem]`}
						>
							<div className="absolute top-0 right-0 m-2 space-y-2 flex flex-col">
								{
									(user && isAdmin &&
										<>
											<DocsModal isAuthoring={false} docsId={doc.id}/>
											{
												(user && isAdmin)
													? (
														<ConfirmBeforeAction
															confirmMessage={`${t("docs.publishing.part1")} ${doc.is_published ? t("docs.publishing.unpublish") : t("docs.publishing.publish")} ${t("docs.publishing.part2")} "${doc.title}"?`}
															onConfirm={async () => {
																const {error} = await supabase
																	.from('docs')
																	.update({
																		is_published: !doc.is_published
																	})
																	.eq('id', doc.id);
																
																if (error) {
																	console.error("Error updating docs item.", error);
																}
															}}
														>
															<Tooltip title={`${t("docs.publishing.alt1")} ${doc.is_published ? t("docs.publishing.unpublish") : t("docs.publishing.publish")} ${t("docs.publishing.alt2")}`}>
																<IconButton className="bg-white">
																	{
																		doc.is_published
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
												deleteDoc(doc.id)
											}
										</>
									)
								}
							</div>
							<div className="space-y-2">
								<Tooltip title={
									<div>
										<p>{t("docs.item.created_at")}: {doc.created_at}</p>
										<p>{t("docs.item.modified_at")}: {doc.modified_at}</p>
									</div>
								}
								>
									<h2 className="text-2xl font-bold mr-6">
										{doc.title}
									</h2>
								</Tooltip>
								<Tooltip title={t("docs.item.summary")}>
									<p className="italic text-center lg:text-left mr-6">
										{doc.summary}
									</p>
								</Tooltip>
								<Divider sx={{m: 6}}/>
								<p className="mr-6">
									{doc.content.split(/\r?\n/).map((line: any, i: any) => <span key={i}>{line}<br/></span>)}
								</p>
							</div>
						</div>
					))
				}
			</div>
		</main>
	)
}
