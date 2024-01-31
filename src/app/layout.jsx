import {Inter} from 'next/font/google'
import Header from "@ui/header";
import Footer from "@ui/footer";
import "@/app/globals.css";


const inter = Inter({subsets: ['latin']})

/**
 * @author frigvid
 */
export const metadata = {
	title: 'Chess Buddy',
	description: 'Chess trainer app',
}

/**
 * @author frigvid
 */
export default function RootLayout({children}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialised grid h-screen grid-cols-1 grid-rows-[auto,1fr,auto]`}>
				<Header/>
				{children}
				<Footer/>
			</body>
		</html>
	)
}
