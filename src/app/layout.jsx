import {Inter} from 'next/font/google'
import Header from "@ui/header";
import Footer from "@ui/footer";
import "@/app/globals.css";
import i18n from '@/app/i18next.js';// Ikke fjern, blir brukt til oversettelse


const inter = Inter({subsets: ['latin']})

/**
 * Metadata for the application.
 *
 * @author frigvid
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
 */
export default function RootLayout({children}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={`${inter.className} antialised grid h-screen grid-cols-1 grid-rows-[auto,1fr,auto]`}>
				<Header/>
				{children}
				<Footer/>
			</body>
		</html>
	)
}
