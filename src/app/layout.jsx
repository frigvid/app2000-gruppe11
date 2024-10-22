import Header from "@shared/components/base/header";
import Footer from "@shared/components/base/footer";
import {Inter} from "next/font/google";
import "@/app/globals.css";
/**
 * Do not remove, is in use when starting the translation.
 *
 * @author oldpopcorn
 * @created 2024-04-11
 */
import i18n from '@/app/i18next.js';

const inter = Inter({subsets: ['latin']})

/**
 * Metadata for the application.
 *
 * @author frigvid
 * @created 2024-01-18
 */
export const metadata = {
	title: 'Chess Buddy',
	description: 'Chess trainer app',
}

/**
 * Root layout for the application.
 *
 * It's set up to use the entire viewport, and uses grid,
 * such that all elements are placed correctly. This makes
 * the footer and header stick to the bottom and top of the
 * page respectively.
 *
 * @author frigvid
 * @created 2024-01-15
 * @param children The children to render within the layout.
 */
export default function RootLayout({children}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialised grid h-screen grid-cols-1 grid-rows-[auto,1fr,auto]`}>
				{children}
			</body>
		</html>
	)
}
