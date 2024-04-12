"use client";

import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';
import i18n from "i18next";

/**
 * A mapping of language codes to translation resources.
 *
 * This object contains translation strings for each supported language in the application.
 * Each language is represented by a language code (e.g., 'en' for English, 'no' for Norwegian),
 * and contains an object with translation keys and their corresponding text.
 *
 * @author oldpopcorn
 * @contributor frigvid
 * @created 2024-04-06
 * @type {Object<string, Object>} An object mapping language codes to translation resources.
 */
const resources = {
	en: {
		translation: {// Translation keys and their English text
			"home": "Home",
			"news": "News",
			"docs": "Docs",
			"title": "Chess Buddy",
			"train_openings": "Train Openings",
			"play_now": "Play Now",
			"your_history": "Your History",
			"about_chess_buddy": "About Chess Buddy",
			"chess_buddy_description_1": "Chess Buddy is an innovative web application designed to strengthen your chess openings and improve your overall game.",
			"chess_buddy_description_2": "By using Chess Buddy, players of all levels can explore a wide range of chess openings, learn the strategies behind them, and practice implementing them in their own games.",
			"chess_buddy_description_3": "Features include interactive lessons, practical challenges, and the ability to play against one AI to test out new openings in realistic scenarios. Chess Buddy is not just a tool for learning; it is a partner in your chess development.",
			"home_link": "You can read more ",
			"about_us_here": "about us here",
			"ch_help_you1": "How Chess Buddy Helps You",
			"ch_help_you2": "Customized learning paths that match your skill level and learning goals.",
			"ch_help_you3": "Interactive lessons that in-depth explain each slot and its variables.",
			"ch_help_you4": "Challenges and games against AI to practice and reinforce learning.",
			"ch_help_you5": "Feedback and analyzes that help you understand your strengths and weaknesses.",
			"faq_title": "FAQ",
			"faq1_question": "Is Chess Buddy free to use?",
			"faq1_answer": "chess buddy is a free websites for learning chess and chess openings.",
			"faq2_question": "Can I use the website without an account?",
			"faq2_answer": "You can use the website without having a account, but if you dont have a account your progress wont be saved when you exit the application",
			"faq3_question": "How do I start a game?",
			"faq3_answer": "You start a game by going to the home page and pressing start game.",
			"faq4_question": "Can I play against the computer?",
			"faq4_answer": "Yes, you can play againts a computer and later we are going to make it possible to play against people also",
			"faq5_question": "Do you offer chess lessons or tutorials?",
			"faq5_answer": "Chess Buddy is a webpage dedicated to help players learn openings for the game of chess, and you can even make your own openings later when you have learned some.",
			"welcome_title": "Welcome to Chess Buddy",
			"welcome_paragraph_1": "Here at Chess Buddy, we are driven by a simple vision: To make high-quality chess instruction available to everyone. Our passion for chess and a clear understanding of the market's needs inspired us to create a tool that specifically focuses on opening moves; a vital, but often underrated, part of the game.",
			"welcome_paragraph_2": "We recognized a gap in the market for a dedicated tool that could offer deeper insight and practical training in chess openings. This led us to develop Chess Buddy, a platform that combines the latest technology with extensive chess expertise to offer a unique learning experience.",
			"welcome_paragraph_3": "In developing Chess Buddy, we wanted to provide an intuitive and user-friendly tool that demystifies chess openings and gives players of all levels the opportunity to improve their opening strategies and overall play.",
			"our_vision_title": "Our Vision",
			"our_vision_paragraph": "Our vision is to promote chess teaching by focusing on opening strategies. With Chess Buddy, we strive to equip chess enthusiasts with the knowledge and skills they need to elevate their game. We are proud to help build a community where players can share, explore, and grow together. Join us on this journey to explore the world of chess and take your skills to new heights.",
			"password_requirements": "The password must contain/be:",
			"password_uppercase": "1 uppercase letter.",
			"password_lowercase": "1 lowercase letter.",
			"password_number": "1 number.",
			"password_symbol": "1 symbol.",
			"password_length": "6+ characters long.",
			"email_label": "E-mail",
			"email_placeholder": "you@example.com",
			"password_label": "Password",
			"log_in_button": "Log in",
			"forgot_password": "Forgot password?",
			"or": "Or",
			"do_not_have_account": "Don't have an account?",
			"register_button": "Register",
			"sign_up__button": "Sign up",
			"sign_up__return": "Back to login",
			"sign_up__check_message": "Check email to continue the sign up process.",
			"sign_up__check_return": "Back to home",
			"error_500__title": "Internal Server Error.",
			"error_500__message": "Something went wrong.",
			"generic__signup__return": "Return to sign up",
			"generic": {
				"return_somewhere": "Return to",
				"return_to": "Go back to",
				"email": {
					"label": "E-mail",
					"placeholder": "you@example.com"
				},
				"password": {
					"label": "Password"
				}
			},
			"error": {
				"500": {
					"title": "Intern Server Feil.",
					"message": "Noe gikk galt."
				}
			},
			"signup": {
				"error": {
					"button": "$t(generic.return_somewhere) sign up"
				},
				"check": {
					"message": "Vennligst sjekk e-posten din for å bekrefte kontoen din.",
					"return": "$t(generic.return_to) hjemmesiden"
				},
				"button": {
					"register": "Registrer deg",
					"return": "$t(generic.return_to) innlogging"
				},
				"button_register": "Registrer deg"
			},
			"signin": {
				"error": {
					"button": "$t(generic.return_somewhere) sign in"
				}
			},
			"password_change": {
				"title1": "New password",
				"title2": "Verify new password",
				"button": "Change password"
			}
		}
	},
	no: {
		translation: {// Translation keys and their Norwegian text
			"home": "Hjem",
			"news": "Nyheter",
			"docs": "Dokumentasjon",
			"title": "Chess Buddy",
			"train_openings": "Tren Åpninger",
			"play_now": "Spill Nå",
			"your_history": "Din Historikk",
			"about_chess_buddy": "Om Chess Buddy",
			"chess_buddy_description_1": "Chess Buddy er en innovativ webapplikasjon designet for å styrke dine sjakkåpninger og forbedre ditt generelle spill.",
			"chess_buddy_description_2": "Ved å bruke Sjakkvenn kan spillere på alle nivåer utforske et bredt spekter av sjakkåpninger, lære strategiene bak dem, og øve på å implementere dem i sine egne spill.",
			"chess_buddy_description_3": "Funksjoner inkluderer interaktive leksjoner, praktiske utfordringer, og muligheten til å spille mot en AI for å teste ut nye åpninger i realistiske scenarioer. Sjakkvenn er ikke bare et verktøy for læring; det er en partner i din sjakkutvikling.",
			"home_link": "Du kan lese mer ",
			"about_us_here": "om oss her",
			"ch_help_you1": "Hvordan Chess Buddy Hjelper Deg",
			"ch_help_you2": "Tilpassede læringsveier som matcher ditt ferdighetsnivå og læringsmål.",
			"ch_help_you3": "Interaktive leksjoner som forklarer hver åpning og dens variabler i dybden.",
			"ch_help_you4": "Utfordringer og spill mot AI for å øve og forsterke læringen.",
			"ch_help_you5": "Tilbakemelding og analyser som hjelper deg å forstå dine styrker og svakheter.",
			"faq_title": "FAQ",
			"faq1_question": "Er Chess Buddy gratis å bruke?",
			"faq1_answer": "ChessBuddy er et gratis nettsted for å lære sjakk og sjakkåpninger.",
			"faq2_question": "Kan jeg bruke nettstedet uten en konto?",
			"faq2_answer": "Du kan bruke nettstedet uten å ha en konto, men hvis du ikke har en konto vil ikke fremgangen din lagres når du avslutter programmet",
			"faq3_question": "Hvordan starter jeg et spill?",
			"faq3_answer": "Du starter et spill ved å gå til hjemmesiden og trykke start spill.",
			"faq4_question": "Kan jeg spille mot datamaskinen?",
			"faq4_answer": "Ja, du kan spille mot en datamaskin og hvis vi skal gjøre det mulig å spille mot folk også",
			"faq5_question": "Tilbyr du sjakktimer eller -veiledninger?",
			"faq5_answer": "Chess Buddy er en nettside dedikert til å hjelpe spillere å lære åpninger for sjakkspillet, og du kan til og med lage dine egne åpninger senere når du har lært noen.",
			"welcome_title": "Velkommen til Chess Buddy",
			"welcome_paragraph_1": "Her hos Chess Buddy, er vi drevet av en enkel visjon: Å gjøre sjakkundervisning av høy kvalitet tilgjengelig for alle. Vår lidenskap for sjakk og en klar forståelse av markedets behov inspirerte oss til å skape et verktøy som spesifikt fokuserer på åpningstrekk; en vital, men ofte undervurdert, del av spillet.",
			"welcome_paragraph_2": "Vi anerkjente et gap i markedet for et dedikert verktøy som kunne tilby dypere innsikt og praktisk trening i sjakkåpninger. Dette førte oss til å utvikle Chess Buddy, en plattform som kombinerer den nyeste teknologien med omfattende sjakkekspertise for å tilby en unik læringsopplevelse.",
			"welcome_paragraph_3": "Ved å utvikle Chess Buddy, ønsket vi å tilby et intuitivt og brukervennlig verktøy som demystifiserer sjakkåpningene og gir spillere på alle nivåer muligheten til å forbedre sine åpningsstrategier og generelle spill.",
			"our_vision_title":"Vår Visjon.",
			"our_vision_paragraph": "Vår visjon er å fremme sjakkundervisning ved å fokusere på åpningsstrategier. Med Chess Buddy strever vi etter å utruste sjakkentusiaster med kunnskapen og ferdighetene de trenger for å heve spillet sitt. Vi er stolte over å bidra til å bygge et samfunn hvor spillere kan dele, utforske, og vokse sammen. Bli med oss på denne reisen for å utforske sjakkens verden og ta dine ferdigheter til nye høyder.",
			"password_requirements": "Passordet må inneholde/være:",
			"password_uppercase": "1 stor bokstav.",
			"password_lowercase": "1 liten bokstav.",
			"password_number": "1 tall.",
			"password_symbol": "1 symbol.",
			"password_length": "6+ tegn langt.",
			"email_label": "E-post",
			"email_placeholder": "deg@eksempel.com",
			"password_label": "Passord",
			"log_in_button": "Logg inn",
			"forgot_password": "Glemt passord?",
			"or": "Eller",
			"do_not_have_account": "Har du ikke en konto?",
			"register_button": "Registrer deg",
			"generic": {
				"return_somewhere": "Dra tilbake til",
				"return_to": "Tilbake til",
				"email": {
					"label": "E-post",
					"placeholder": "deg@eksempel.com"
				},
				"password": {
					"label": "Passord"
				}
			},
			"error": {
				"500": {
					"title": "Intern Server Feil.",
					"message": "Noe gikk galt."
				}
			},
			"signup": {
				"error": {
					"button": "$t(generic.return_somewhere) registrering"
				},
				"check": {
					"message": "Vennligst sjekk e-posten din for å bekrefte kontoen din.",
					"return": "$t(generic.return_to) hjemmesiden"
				},
				"button": {
					"register": "Registrer deg",
					"return": "$t(generic.return_to) innlogging"
				},
				"button_register": "Registrer deg"
			},
			"signin": {
				"error": {
					"button": "$t(generic.return_somewhere) innlogging"
				}
			},
			"password_change": {
				"title1": "Nytt passord",
				"title2": "Verifiser nytt passord",
				"button": "Bytt passord"
			}
		}
	}
};

/**
 * Initializes i18next with the translation resources and configuration.
 *
 * This setup uses the `initReactI18next` plugin to integrate i18next with React.
 * It specifies the initial language to be Norwegian ('no') and sets English ('en') as the fallback language.
 * Interpolation configuration ensures that values inserted into translation strings are not escaped,
 * which is important for inserting dynamic content.
 */
void i18n.use(Backend)
			.use(LanguageDetector)
			.use(initReactI18next) // Uses initReactI18next module to init i18next.
			.init({
				resources, // The resources used for translation.
				lng: "no", // Initial language.
				fallbackLng: "en", // Fallback language if the first language translation are not found or not functioning.
				interpolation: {
					escapeValue: false // Prevents the inserted values from escaping.
				},
				detection: {
					order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
					caches: ['cookie']
				},
				react: {
					useSuspense: false
				}
			});

export default i18n;
