import TrapFocus from "@mui/material/Unstable_TrapFocus";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {useState} from "react";

/**
 * The cookie banner, making sure users know that cookies are
 * being used for authentication on the website, to be compliant
 * with GDPR.
 *
 * This is a very simple banner, with a single button to close,
 * and only the ability to "accept" the use of cookies.
 *
 * It saves its value to localStorage, instead of sessionStorage,
 * so that users will be prompted about this less often. No one
 * likes cookie banners, after all.
 *
 * @author frigvid
 * @created 2024-04-13
 */
export default function CookieBanner() {
	const {t} = useTranslation();
	const [bannerOpen, setBannerOpen] = useState(true);
	
	/**
	 * Close the banner, and save "true" to localStorage.
	 *
	 * @author frigvid
	 * @created 2024-04-13
	 */
	const closeBanner = () => {
		localStorage.setItem("cookieBanner", "true");
		setBannerOpen(false);
	};
	
	return (
		<>
			<CssBaseline/>
			<TrapFocus open disableAutoFocus disableEnforceFocus>
				<Fade appear={false} in={bannerOpen}>
					<Paper
						role="dialog"
						aria-modal="false"
						aria-label="Cookie banner"
						square
						variant="outlined"
						tabIndex={-1}
						sx={{
							position: 'fixed',
							bottom: 0,
							left: 0,
							right: 0,
							m: 0,
							p: 2,
							borderWidth: 0,
							borderTopWidth: 1,
						}}
					>
						<Stack
							direction={{
								xs: 'column',
								sm: 'row'
							}}
							justifyContent="space-between"
							gap={2}
						>
							<Box
								sx={{
									flexShrink: 1,
									alignSelf: {
										xs: 'flex-start',
										sm: 'center'
									},
								}}
							>
								<Typography fontWeight="bold">
									{t("cookie_banner.label")}
								</Typography>
								<Typography variant="body2">
									{t("cookie_banner.body")}
								</Typography>
							</Box>
							<Stack
								gap={2}
								direction={{
									xs: 'row-reverse',
									sm: 'row',
								}}
								sx={{
									flexShrink: 0,
									alignSelf: {
										xs: 'flex-end',
										sm: 'center'},
								}}
							>
								<Button
									size="small"
									onClick={closeBanner}
									variant="contained"
								>
									{t("cookie_banner.button")}
								</Button>
							</Stack>
						</Stack>
					</Paper>
				</Fade>
			</TrapFocus>
		</>
	);
}
