"use client";

import ConfirmBeforeAction from "@shared/components/misc/confirm-before-action";
import {createClient} from "@shared/utils/supabase/client";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import React, {useEffect, useState} from "react";
import NewsModal from "@misc/news/components/news-modal";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * News page.
 *
 * @author frigvid
 * @created 2024-01-30
 * @warning Since policies are involved, note that news are NOT immediately
 * 			unpublished for users already viewing the page, and having it cached.
 * 			This isn't impossible, however, the alternative is disabling
 * 			news_r_to_published, meaning the client will receive all news, and
 * 			only then handle it. Which sounds worse.
 *
 * 			You could, of course, manage this using a server action, but that's
 * 			also adding unnecessary complexity. This serves as an ok compromise.
 */
export default function News() {
	const supabase = createClient();
	const {t} = useTranslation();
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState(null);
	const [news, setNews] = useState([]);
	
	/**
	 * Fetches news from the public.news table.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	useEffect(() => {
		const fetchNews = async () => {
			const {data, error} = await supabase
				.from('news')
				.select('*');
			
			if (error) {
				console.error("Error fetching news:", error);
			} else {
				setNews(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
			}
		}
		
		void fetchNews();
	}, [supabase]);
	
	/**
	 * Fetches the user and checks if the user is an admin.
	 *
	 * @author frigvid
	 * @created 2024-04-19
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
	 * from the public.news table.
	 *
	 * See {@link @/app/chess/stages/components/StagesOpenings}
	 * for some additional details.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 * @see https://supabase.com/docs/guides/realtime
	 */
	useEffect(() => {
		const news = supabase
			.channel('news')
			.on('postgres_changes', {
				event: 'INSERT',
				schema: 'public',
				table: 'news'
			}, async (payload) => {
				setNews(prevNews => [...prevNews, payload.new].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
			})
			.on('postgres_changes', {
				event: 'UPDATE',
				schema: 'public',
				table: 'news'
			}, async (payload) => {
				setNews(prevNews => {
					if (payload.new.is_published) {
						return [...prevNews.filter(news => news.id !== payload.new.id), payload.new].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
					} else {
						if (isAdmin) {
							return prevNews.map(news => news.id === payload.new.id ? payload.new : news).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
						} else {
							return prevNews.filter(news => news.id !== payload.new.id);
						}
					}
				});
			})
			.on('postgres_changes', {
				event: 'DELETE',
				schema: 'public',
				table: 'news'
			}, async (payload) => {
				setNews(prevNews => prevNews.filter(news => {
					return news.id !== payload.old.id
				}));
			})
			.subscribe();
		
		return () => {
			void supabase.removeChannel(news);
		}
	}, [isAdmin, supabase]);
	
	/**
	 * Deletes a news item.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 * @param newsItemId The ID of the news item to delete.
	 */
	function deleteNews(newsItemId: any) {
		return (
			<ConfirmBeforeAction
				confirmMessage={`Are you sure you want to delete this news item?`}
				onConfirm={async () => {
					const {error} = await supabase
						.from('news')
						.delete()
						.eq('id', newsItemId);
					
					if (error) {
						console.error("Error deleting news item!", error);
					}
				}}
			>
				<Tooltip title="Delete news item?">
					<IconButton>
						<DeleteIcon color="error"/>
					</IconButton>
				</Tooltip>
			</ConfirmBeforeAction>
		)
	}
	
	return (
		<main className="grid grid-cols-1 grid-rows-[auto,1fr,auto] m-4">
			<h1 className="self-start text-4xl font-bold text-center">
				{t("news.title")}
			</h1>
			{
				(user && isAdmin &&
					<NewsModal isAuthoring={true}/>
				)
			}
			<div className="grid grid-cols-1 gap-4 place-self-center md:w-[30rem] lg:w-[35rem] align-middle">
				{
					news.map((newsItem) => (
						<div
							key={newsItem.id}
							className={`relative bg-white ${newsItem.is_published ? null : "border-2 border-red-500"} p-4 rounded-lg shadow-md h-auto lg:min-h-[10rem]`}
						>
							<div className="absolute top-0 right-0 m-2 space-y-2 flex flex-col">
								{
									(user && isAdmin &&
										<>
											<NewsModal isAuthoring={false}/>
											{
												(user && isAdmin)
													? (
														<ConfirmBeforeAction
															confirmMessage={`${t("news.publishing.part1")} ${newsItem.is_published ? t("news.publishing.unpublish") : t("news.publishing.publish")} ${t("news.publishing.part2")} "${newsItem.title}"?`}
															onConfirm={async () => {
																const {error} = await supabase
																	.from('news')
																	.update({
																		is_published: !newsItem.is_published
																	})
																	.eq('id', newsItem.id);
																
																if (error) {
																	console.error("Error updating news item.", error);
																}
															}}
														>
															<Tooltip title={`Do you want to ${newsItem.is_published ? t("news.publishing.unpublish") : t("news.publishing.publish")} this?`}>
																<IconButton className="bg-white">
																	{
																		newsItem.is_published
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
												deleteNews(newsItem.id)
											}
										</>
									)
								}
							</div>
							{/* TODO: Implement using the user's profile.display_name instead of UUID. */}
							<div className="space-y-2">
								<Tooltip title={
									<div>
										<p>{t("news.item.created_by")}: {newsItem.created_by}</p>
										<p>{t("news.item.created_at")}: {newsItem.created_at}</p>
										<p>{t("news.item.modified_at")}: {newsItem.modified_at}</p>
									</div>
								}
								>
									<h2 className="text-2xl font-bold mr-6">
										{newsItem.title}
									</h2>
								</Tooltip>
								<Tooltip title={t("news.item.summary")}>
									<p className="italic text-center lg:text-left mr-6">
										{newsItem.summary}
									</p>
								</Tooltip>
								{
									/* This should only be displayed by clicking on the news article,
									 * but is included as an example for now.
									 */
								}
								<p className="mr-6">
									{newsItem.content}
								</p>
							</div>
						</div>
					))
				}
			</div>
		</main>
	)
}
