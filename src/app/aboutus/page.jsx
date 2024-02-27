import React from 'react';

/**
 * About us page.
 *
 * @author KarstenKebba
 * @contributor frigvid
 */
export default function AboutUs() {
	return (
		<main className="flex flex-col items-center text-center px-4 py-8">
			<section className="max-w-4xl text-justify space-y-4 space-x-12 text-lg">
				<h1 className="text-4xl text-center font-bold mb-6">Velkommen til Chess Buddy</h1>
				<p>
					Her hos Chess Buddy, er vi drevet av en enkel visjon: <em>Å gjøre sjakkundervisning av høy kvalitet
					tilgjengelig for alle</em>. Vår lidenskap for sjakk og en klar forståelse av markedets behov inspirerte oss
					til å skape et verktøy som spesifikt fokuserer på åpningstrekk; en vital, men ofte undervurdert, del av
					spillet.
				</p>
				<p>
					Vi anerkjente et gap i markedet for et dedikert verktøy som kunne tilby dypere innsikt og praktisk
					trening i sjakkåpninger. Dette førte oss til å utvikle Chess Buddy, en plattform som kombinerer den
					nyeste teknologien med omfattende sjakkekspertise for å tilby en unik læringsopplevelse.
				</p>
				<p>
					Ved å utvikle Chess Buddy, ønsket vi å tilby et intuitivt og brukervennlig verktøy som demystifiserer
					sjakkåpningene og gir spillere på alle nivåer muligheten til å forbedre sine åpningsstrategier og
					generelle spill.
				</p>
			</section>
			<section className="max-w-4xl mt-10 text-justify space-y-4 space-x-12">
				<h2 className="text-3xl text-center font-bold mb-6">Vår Visjon</h2>
				<p className="text-lg">
					Vår visjon er å fremme sjakkundervisning ved å fokusere på åpningsstrategier. Med Chess Buddy strever vi
					etter å utruste sjakkentusiaster med kunnskapen og ferdighetene de trenger for å heve spillet sitt. Vi er
					stolte over å bidra til å bygge et samfunn hvor spillere kan dele, utforske, og vokse sammen. Bli med oss
					på denne reisen for å utforske sjakkens verden og ta dine ferdigheter til nye høyder.
				</p>
			</section>
		</main>
	);
}
