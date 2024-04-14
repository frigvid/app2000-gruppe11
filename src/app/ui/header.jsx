import AccountMenu from "@auth/components/account-menu";
import logoIcon from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

/**
 * Header component.
 *
 * Only used in root-layout.
 *
 * @author frigvid
 * @contributor jarle0
 * @warning There's a known issue of including this in the root layout, as it rarely re-draws, which makes the
 * 			{@link #AccountMenu} slow to update.
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
				{/* FIXME: On viewports like the iPhone SE, it appears the Link elements stop being clickable. */}
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
						<AccountMenu/>
					</div>
				</div>
			</nav>
		</header>
	)
}
