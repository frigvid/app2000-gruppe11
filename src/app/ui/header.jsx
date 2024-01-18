import Image from 'next/image'
import Link from "next/link";
import logoIcon from '/public/logo.svg'
import styles from '@/app/ui/bar.module.css'

export default function Header() {
	return (
		<header className={styles.barBackground}>
			{/* You can remove "max-w-7xl" to remove buffers on the sides. */}
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 lg:justify-start" aria-label="Global">
				<div className="flex lg:flex-1">
					<Link className="" href={'/'}>
						<Image className="h-16" src={logoIcon} alt={"Chess Buddy logo image."}/>
					</Link>
				</div>
				<div className="lg:flex lg:gap-x-12">
					<Link className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8" href="/" key="NAME">Home</Link>
					<span className={`${styles.navSeparator} text-xl font-semibold leading-6`}>|</span>
					<Link className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8" href="/news">News</Link>
					<span className={`${styles.navSeparator} text-xl font-semibold leading-6`}>|</span>
					<Link className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8" href="/docs">Docs</Link>
				</div>
				<div className="lg:flex lg:flex-1 lg:justify-end">
					<Link className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8" href="/login">
						Log in <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</nav>
		</header>
	)
}