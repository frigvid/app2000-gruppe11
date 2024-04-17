"use client";

import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import {createClient} from "@shared/utils/supabase/client";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Link from "next/link";

/**
 * The account menu, used in the Header component.
 *
 * Gives users the ability to log out, go to their profile,
 * go to their settings and, for administrators, go to the
 * administrator dashboard.
 *
 * @author frigvid
 * @created 2024-01-23
 */
export default function AccountMenu() {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
	const [isAdmin, setIsAdmin] = useState(null);
	const [profileData, setProfileData] = useState(null);
	const [user, setUser] = useState(null);
	const supabase = createClient();
	const router = useRouter();
	const open = Boolean(menuAnchor);
	
	/**
	 * Fetch the user's administrator status.
	 *
	 * @author frigvid
	 * @created 2024-04-11
	 */
	useEffect(() => {
		const fetchData = async () => {
			const {data: isAdminBool, error: isAdminError} = await supabase.rpc("admin_is_admin");
			const {data: {user}, error: getUserError} = await supabase.auth.getUser();
			
			if (user) {
				const {data, error: profileDataError} = await supabase.rpc("profile_get", {usr_id: user.id});
				
				if (isAdminError) {
					console.error("Supabase admin RPC postgres error: " + isAdminError);
				} else if (getUserError) {
					console.error("Supabase authentication error: " + getUserError);
				} else if (profileDataError) {
					console.error("Supabase profile RPC postgres error: " + profileDataError);
				} else {
					setIsAdmin(isAdminBool);
					setUser(user);
					setProfileData(data.pop());
				}
			}
		};

		void fetchData();
	}, [supabase]);
	
	/**
	 * Perform an account logout.
	 *
	 * @author frigvid
	 * @created 2024-04-11
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
	 * @author frigvid
	 * @created 2024-04-11
	 * @param event The click event.
	 */
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchor(event.currentTarget);
	};
	
	/**
	 * Close the account menu.
	 *
	 * @author frigvid
	 * @created 2024-04-11
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
						sx={{ml: 2}}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						{
							(profileData.avatar_url !== null || profileData.avatar_url !== "")
								? <Avatar src={profileData.avatar_url} sx={{width: 32, height: 32}}/>
								: <Avatar sx={{width: 32, height: 32}}>{(user.email).charAt(0).toUpperCase()}</Avatar>
						}
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={menuAnchor}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
			>
				{
					(isAdmin)
						/* This is a workaround required because the Menu component does not support fragments. */
						? [
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
						: null
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
