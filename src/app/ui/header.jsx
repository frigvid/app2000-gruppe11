import LoginLogoutButton from "@ui/auth/login-logout-button"; // Importing the LoginLogoutButton component
import logoIcon from "/public/logo.svg"; // Importing the logo icon
import Image from "next/image"; // Importing Image component from Next.js
import Link from "next/link"; // Importing Link component from Next.js

/**
 * Header component.
 *
 * Only used in root-layout.
 *
 * @author frigvid
 */
export default function Header() {
	return (
		<header className="bg-main lg:h-auto h-24 lg:py-2 py-4 md:py-0">
			<nav className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between lg:p-2 lg:px-8 lg:justify-start">
				<div className="flex lg:flex-1">
					<Link href={'/'} className="hidden lg:block">
						<Image className="h-16" src={logoIcon} alt={"Chess Buddy logo image."}/>
					</Link>
				</div>
				<div className="lg:flex lg:gap-x-12 lg:mt-0 md:mt-4">
					<div className="flex space-x-4 lg:space-x-12 lg:space-y-0">
						<Link
							className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
							href="/"
						>
							Home
						</Link>
						<span className="text-navseparator text-xl font-semibold leading-6">|</span>
						<Link
							className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
							href="/news"
						>
							News*
						</Link>
						<span className="text-navseparator text-xl font-semibold leading-6">|</span>
						<Link
							className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
							href="/docs"
						>
							Docs*
						</Link>
					</div>
				</div>
				<div className="lg:flex lg:flex-1 lg:justify-end">
					<div className="mt-4 lg:mt-0 lg:inline-block">
						<LoginLogoutButton/>
					</div>
				</div>
			</nav>
		</header>
	)
}
