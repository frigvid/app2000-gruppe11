import React from 'react';

/**
 * Homepage for the application.
 *
 * @author KarstenKebba
 */
export default function AboutUs() {
	return (
		<main className="flex flex-col items-center px-4 py-8">
			<section className="max-w-4xl text-center">
				<h1 className="text-4xl font-bold mb-6">Velkommen til ChessBuddy</h1>
				<p className="text-lg mb-4">
					Her hos ChessBuddy, er vi drevet av en enkel visjon: Å gjøre sjakkundervisning av høy kvalitet tilgjengelig for alle. Vår lidenskap for sjakk og en klar forståelse av markedets behov inspirerte oss til å skape et verktøy som spesifikt fokuserer på åpningstrekk - en vital, men ofte undervurdert, del av spillet.
				</p>
				<p className="text-lg mb-4">
					Vi anerkjente et gap i markedet for et dedikert verktøy som kunne tilby dypere innsikt og praktisk trening i sjakkåpninger. Dette førte oss til å utvikle ChessBuddy, en plattform som kombinerer den nyeste teknologien med omfattende sjakkekspertise for å tilby en unik læringsopplevelse.
				</p>
				<p className="text-lg">
					Ved å utvikle ChessBuddy, ønsket vi å tilby et intuitivt og brukervennlig verktøy som demystifiserer sjakkåpningene og gir spillere på alle nivåer muligheten til å forbedre sine åpningsstrategier og generelle spill.
				</p>
			</section>

			<section className="max-w-4xl mt-10 text-center">
				<h2 className="text-3xl font-bold mb-6">Vår Visjon</h2>
				<p className="text-lg">
					Vår visjon er å fremme sjakkundervisning ved å fokusere på åpningsstrategier. Med ChessBuddy streber vi etter å utruste sjakkentusiaster med kunnskapen og ferdighetene de trenger for å heve spillet sitt. Vi er stolte over å bidra til å bygge et samfunn hvor spillere kan dele, utforske, og vokse sammen. Bli med oss på denne reisen for å utforske sjakkens verden og ta dine ferdigheter til nye høyder.
				</p>
			</section>
		</main>
	);
}
