"use client";

import * as React from 'react';
import {useState, useEffect} from 'react';
import {useUser} from '@auth/actions/useUser';
import Image from 'next/image';
import Link from "next/link";
import {createClient} from "@utils/supabase/client";
import {useRouter} from 'next/navigation';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export default function AccountMenu() {
	const user = useUser();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const supabase = createClient();
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient();
			const {data, error} = await supabase.rpc("admin_is_admin");

			if (error) {
				console.error("Supabase RPC error: " + error);
			} else {
				setIsAdmin(data);
			}
		};

		void fetchData();
	}, []);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Sign out error:", error.message);
		} else {
			window.location.reload();
		}
	};
	
	function ClockIcon() {
		return (
			<svg
				width="16"
				height="17"
				viewBox="0 0 16 17"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
					fill="#90A4AE"
				/>
			</svg>
		);
	}
	
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	
	function test () {
		console.log(user.user_metadata.elo_rank);
		
		(async () => {
			const {data, error} = await supabase.auth.updateUser({
				data: {
					elo_rank: 401
				}
			})
		})();
	}
	
	return user ? (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Account menu">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>{(user.email).charAt(0).toUpperCase()}</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={() => {router.push('/profile/' + user.id);}}>
					<ListItemIcon>
						<Person fontSize="small"/>
					</ListItemIcon>
					Profile
				</MenuItem>
				<MenuItem onClick={() => {router.push('/settings');}}>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				{
					isAdmin ?
						<MenuItem onClick={() => {router.push('/settings');}}>
							<ListItemIcon>
								<Settings fontSize="small"/>
							</ListItemIcon>
							Dashboard
						</MenuItem>
						:
						null
				}
				<MenuItem onClick={logout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	) : (
		<Link
			className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
			href="/signin"
		>
			Log in <span aria-hidden="true">&rarr;</span>
		</Link>
	);
}
