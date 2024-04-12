/**
 * This file represents the Header component of the application.
 * It includes navigation links, logo display, and login/logout button.
 * This component ensures responsiveness by adjusting layout and styles based on screen size.
 *
 * TailwindCSS is used to style this component, providing utility classes for responsive design.
 * Tailwind CSS classes used:
 * 1. Responsive Utilities: Adjust layout based on screen size.
 * 2. Flexbox Utilities: Control layout and alignment of elements.
 * 3. Spacing Utilities: Manage spacing between elements.
 * 4. Color and Background Utilities: Set colors for elements.
 * 5. Size Utilities: Control the size of elements.
 * 6. Hover and Transition Effects: Add hover effects and transitions.
 * 7. Text Style Utilities: Style text elements with various properties.
 * 8. Absolute Positioning: Position elements absolutely within their containers.
 */
import LoginLogoutButton from "@ui/auth/login-logout-button"; // Importing the LoginLogoutButton component
import logoIcon from "/public/logo.svg"; // Importing the logo icon
import Image from "next/image"; // Importing Image component from Next.js
import Link from "next/link"; // Importing Link component from Next.js

/**
 * Represents the Header component of the application.
 * This component includes navigation links, logo display, and login/logout button.
 * It ensures responsiveness by adjusting layout and styles based on screen size.
 * @returns {JSX.Element} The JSX code representing the Header component.
 */
export default function Header() {
	return (
		<header className="bg-main lg:h-auto h-24 lg:py-2 py-4"> {/* Set height to auto for lg and specific height for mobile, adjust padding */}
			<nav className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between lg:p-2 lg:px-8 lg:justify-start"> {/* Adjusted padding here */}
				<div className="flex lg:flex-1">
					{/* Hide logo on mobile screens */}
					<Link className="hidden lg:block" href={'/'}>
						<Image className="h-16" src={logoIcon} alt={"Chess Buddy logo image."}/>
					</Link>
				</div>
				<div className="lg:flex lg:gap-x-12 lg:mt-0 md:mt-4"> {/* Adjusted margin here */}
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
					{/* Move login button below navigation links on mobile */}
					<div className="mt-4 lg:mt-0"> {/* Adjusted margin here */}
						<LoginLogoutButton className="lg:inline-block" /> {/* Adjusted margin here */}
					</div>
				</div>
			</nav>
		</header>
	)
}


























