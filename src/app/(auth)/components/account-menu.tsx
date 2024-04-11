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
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';

export default function AccountMenu() {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
	const [isAdmin, setIsAdmin] = useState(null);
	const supabase = createClient();
	const router = useRouter();
	const open = Boolean(menuAnchor);
	const user = useUser();
	
	/**
	 * Fetch the user's administrator status.
	 */
	useEffect(() => {
		const fetchData = async () => {
			const {data, error} = await supabase.rpc("admin_is_admin");

			if (error) {
				console.error("Supabase RPC error: " + error);
			} else {
				setIsAdmin(data);
			}
		};

		void fetchData();
	}, []);
	
	/**
	 * Perform an account logout.
	 */
	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Sign out error:", error.message);
		} else {
			window.location.reload();
		}
	};
	
	/**
	 * Open the account menu.
	 *
	 * @param event The click event.
	 */
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchor(event.currentTarget);
	};
	
	/**
	 * Close the account menu.
	 */
	const handleClose = () => {
		setMenuAnchor(null);
	};
	
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
				anchorEl={menuAnchor}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{
					isAdmin ?
						// This is a workaround required because the Menu component does not support fragments.
						[
							<MenuItem
								key={self.crypto.randomUUID()}
								onClick={() => {router.push('/dashboard');}}
							>
								<ListItemIcon>
									<AdminPanelSettings fontSize="small"/>
								</ListItemIcon>
								Dashboard
							</MenuItem>,
							<Divider key={self.crypto.randomUUID()}/>
						]
						:
						null
				}
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
