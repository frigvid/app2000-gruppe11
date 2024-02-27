import Link from "next/link";
import {FaChessKnight, FaPlay, FaHistory, FaArrowDown} from 'react-icons/fa';

/**
 * Homepage.
 *
 * @author frigvid, KarstenKebba
 */
export default function Home() {
	return (
		<main className="flex flex-col bg-gray-100">
			<div className="flex items-center justify-center h-screen -mt-20 sm:-mt-10 md:mt-0">
				<div className="space-x-4 flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-4">
					<div className="text-center">
						<Link
							className="flex justify-center items-center bg-blue-500 text-white rounded h-40 w-40 sm:h-48 sm:w-48 hover:bg-blue-600 transition duration-300 ease-in-out"
							href="/chess/train"
						>
							<FaChessKnight className="text-5xl sm:text-6xl"/>
						</Link>
						<p className="mt-2 text-sm text-gray-600">Tren Åpninger</p>
					</div>
					<div className="text-center">
						<Link
							className="flex justify-center items-center bg-green-500 text-white rounded h-40 w-40 sm:h-48 sm:w-48 hover:bg-green-600 transition duration-300 ease-in-out"
							href="/chess"
						>
							<FaPlay className="text-5xl sm:text-6xl"/>
						</Link>
						<p className="mt-2 text-sm text-gray-600">Spill Nå</p>
					</div>
					<div className="text-center">
						<Link
							className="flex justify-center items-center bg-red-500 text-white rounded h-40 w-40 sm:h-48 sm:w-48 hover:bg-red-600 transition duration-300 ease-in-out"
							href="/chess/history"
						>
							<FaHistory className="text-5xl sm:text-6xl"/>
						</Link>
						<p className="mt-2 text-sm text-gray-600">Din Historikk</p>
					</div>
				</div>
				<div className="absolute bottom-5 w-full text-center">
					<FaArrowDown className="animate-bounce mx-auto text-2xl"/>
				</div>
			</div>
			<div className="flex flex-col items-center px-4 py-8 mb-20">
				<section className="max-w-4xl text-center">
					<h1 className="text-4xl font-bold text-center mb-6">Om Chess Buddy</h1>
					<p className="text-lg text-center mb-4">
						Chess Buddy er en innovativ webapplikasjon designet for å styrke dine sjakkåpninger og forbedre ditt
						generelle spill.
					</p>
					<p className="text-lg mb-4">
						Ved å bruke Chess Buddy, kan spillere av alle nivåer utforske et bredt spekter av sjakkåpninger, lære
						seg strategiene bak dem, og øve på å implementere dem i sine egne spill. Vår applikasjon er bygget med
						en intuitiv forståelse for sjakkspilleres behov, og tilbyr personlig tilpassede læringsstier som gjør
						det mulig for brukere å forbedre seg i sitt eget tempo.
					</p>
					<p className="text-lg">
						Funksjoner inkluderer interaktive leksjoner, praktiske utfordringer, og muligheten til å spille mot en
						AI for å teste ut nye åpninger i realistiske scenarier. Chess Buddy er ikke bare et verktøy for
						læring; det er en partner i din sjakkutvikling.
					</p>
				</section>
				<section className="max-w-4xl mt-10">
					<h2 className="text-3xl font-bold text-center mb-6">Hvordan Chess Buddy Hjelper Deg</h2>
					<ul className="list-disc space-y-2 pl-5">
						<li className="text-lg">Tilpassede læringsstier som matcher ditt ferdighetsnivå og læringsmål.</li>
						<li className="text-lg">Interaktive leksjoner som dyptgående forklarer hver åpning og dens variabler.</li>
						<li className="text-lg">Utfordringer og spill mot AI for å praktisere og forsterke læringen.</li>
						<li className="text-lg">Feedback og analyser som hjelper deg å forstå dine styrker og svakheter.</li>
					</ul>
				</section>
			</div>
		</main>
	);
}
