import LoginLogoutButton from "@ui/auth/login-logout-button";
import logoIcon from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

/**
 * Header component.
 *
 * Only used in root-layout.
 *
 * @author frigvid
 */
export default function Header() {
	return (
		<header className="bg-main">
			{/* You can remove "max-w-7xl" to remove buffers on the sides. */}
			<nav className="mx-auto flex flex-wrap items-center justify-between p-2 lg:px-8 lg:justify-start" aria-label="Global">
				<div className="flex justify-center lg:justify-start w-full lg:w-auto mb-4 lg:mb-0">
					<Link href={'/'}>
						<Image className="h-16" src={logoIcon} alt={"Chess Buddy logo image."} />
					</Link>
				</div>
				<div className="flex justify-center lg:justify-start w-full lg:w-auto mb-4 lg:mb-0">
					<Link
						className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8 mr-4 lg:mr-12"
						href="/"
					>
						Home
					</Link>
					<span className="text-navseparator text-xl font-semibold leading-6">|</span>
					<Link
						className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8 mx-4 lg:mx-12"
						href="/news"
					>
						News*
					</Link>
					<span className="text-navseparator text-xl font-semibold leading-6">|</span>
					<Link
						className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8 ml-4 lg:ml-12"
						href="/docs"
					>
						Docs*
					</Link>
				</div>
				<div className="flex justify-center lg:justify-end w-full lg:w-auto">
					<LoginLogoutButton />
				</div>
			</nav>
		</header>
	);
}

