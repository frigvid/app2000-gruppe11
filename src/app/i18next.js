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
				"read_more": "Read more",
				"email": {
					"label": "E-mail",
					"placeholder": "you@example.com"
				},
				"password": {
					"label": "Password"
				}
			},
			"cookie_banner": {
				"label": "This website uses cookies",
				"body": "This website relies on cookies for authentication. These are critical cookies, and cannot be disabled; unless you do not want to be able to log in.",
				"button": "Okay"
			},
			"header": {
				"home": "Home",
				"news": "News",
				"docs": "Docs",
			},
			"footer": {
				"notice": "All rights reserved."
			},
			"error": {
				"500": {
					"title": "Intern Server Feil.",
					"message": "Noe gikk galt."
				}
			},
			"actions": {
				"confirm": {
					"title": "Confirm action",
					"yes": "Yes",
					"no": "No"
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
			},
			"delete_account": {
				"label": "You are about to delete your account.",
				"notice": "Are you sure?",
				"button": "Yes, delete my account"
			},
			"user_profile": {
				"generics": {
					"fragment": {
						"user_id": "User ID of"
					},
					"about_me": "Om meg",
					"nationality": "Nasjonalitet"
				},
				"friend_list": {
					"label": "Friends",
					"no_friends": "You do not have any friends.",
					"tooltip": {
						"open_profile": "Open profile",
						"user_id_fragment": "$t(user_profile.generics.fragment.user_id)",
						"remove_friend": "Remove friend"
					}
				},
				"friend_requests": {
					"label": "Any pending friend requests?",
					"no_pending": "Currently, no friend requests pending.",
					"tooltip": {
						"button": "Pending friend requests.",
						"reject": "Reject friend request.",
						"accept": "Accept friend request.",
						"user_id": "$t(user_profile.generics.fragment.user_id)"
					}
				},
				"search_users": {
					"label": "Want to add some friends?",
					"info": {
						"part1": "You can do that by inputting a user display name",
						"part2": "(found under their profile picture)",
						"part3": "or through their ID (the long text in the link to their profile",
						"part4": "e.g."
					},
					"search": {
						"hint": "Input an ID or display name",
						"user_not_found": "User not found!",
						"befriend_self": "Sorry, you cannot befriend yourself.",
						"request_sent": "Friend request is sent, but there is no reply yet.",
						"already_friends": "You are already friends.",
						"button": "Send a friend request"
					},
					"tooltip": {
						"button": "Search for users or new friends."
					}
				},
				"editor": {
					"label": "Edit your profile",
					"avatar_url": {
						"label": "Avatar URL",
						"tooltip": "This is a direct link to some kind of picture or GIF on the internet.",
						"placeholder": "https://example.com/my-fancy-avatar"
					},
					"display_name": {
						"label": "Display name",
						"tooltip": "This is the name you display your account with.",
						"placeholder": "Fancy Name"
					},
					"about_me": {
						"label": "$t(user_profile.generics.about_me)",
						"tooltip": "Here you can write a little about yourself.",
						"placeholder": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
					},
					"nationality": {
						"label": "$t(user_profile.generics.nationality)",
						"tooltip": "Choose which country flag appears on your profile.",
						"default": "Select Country"
					},
					"visibility": {
						"label": "Profile visibility",
						"option_true": "Yes, I want my profile to be visible to others",
						"option_false": "No, I do not want my profile to be visible to others"
					},
					"visibility_friends_list": {
						"label": "Friend list visibility",
						"option_true": "Yes, I want my friends list to be visible to others",
						"option_false": "No, I do not want my friends list to be visible to others"
					},
					"save": {
						"label": "Save details",
						"warning": "(Saving will reload the page)"
					},
					"tooltip": {
						"button": "User profile editor and profile settings."
					}
				},
				"user_stats": {
					"elo_rank": "ELO Rating",
					"games_played": "Games Played",
					"games_won": "Wins",
					"games_lost": "Losses",
					"games_drawn": "Draws",
					"nationality": "$t(user_profile.generics.nationality)"
				},
				"about_me": "$t(user_profile.generics.about_me)",
				"error": {
					"return": "$t(generic.return_somewhere) Home"
				}
			},
			"user_settings": {
				"email": {
					"label": "Change your email.",
					"tooltip": "You can change your login email here.",
					"placeholder": "example@example.com",
					"notice": "You will have to confirm your new email."
				},
				"password": {
					"label": "Change your password",
					"tooltip": "You can change your login password here."
				},
				"delete": {
					"notice": "Clicking this button will not immediately delete your account."
				},
				"button": {
					"email": "Save new email",
					"password": "Save new password",
					"delete": "Delete your account"
				}
			},
			"admin_dashboard": {
				"users": {
					"label": "Delete or promote user to admin?",
					"notice": "You will not be able to see your own account here.",
					"warning": "Aside from yours, there are no other users found.",
					"promote": {
						"tooltip": "This will promote the user to administrator."
					},
					"demote": {
						"tooltip": "This will demote the administrator to regular user."
					},
					"delete": {
						"label": "Delete user",
						"tooltip": "This will permanently delete the user.",
						"body": "You are about to permanently delete a user! Are you certain you want to delete user with this ID?",
						"button": {
							"yes": "Yes",
							"no": "No"
						}
					}
				}
			},
			"chess": {
				"generics": {
					"status": {
						"game": "Game Status"
					},
					"delete_data": "Delete all gamedata"
				},
				"create_opening": {
					"label": "You can also create your own openings.",
					"title": "$t(chess.create_opening.button.open)!",
					"button": {
						"open": "Create an opening",
						"save": "Save opening"
					},
					"placeholder": {
						"name": "Name of the opening",
						"desc": "Description of the opening"
					},
					"feedback": {
						"missing": "Missing name, description or moves",
						"error": "An error occurred while saving to the database",
						"success": "New opening saved successfully"
					},
					"groups": {
						"label": "Openings"
					},
					"confirm": {
						"part1": "You are about to delete the opening",
						"part2": "Are you sure you want to proceed?"
					}
				},
				"repertoire": {
					"generics": {
						"fragment": {
							"group": "repertoire"
						},
					},
					"header": {
						"label": "$t(chess.repertoire.generics.fragment.group), a group of openings.",
						"button": {
							"save": "Save the $t(chess.repertoire.generics.fragment.group)",
							"create": "Create a $t(chess.repertoire.generics.fragment.group)"
						}
					},
					"groups": {
						"label": "Your $t(chess.repertoire.generics.fragment.group)s",
						"title": "Openings in this $t(chess.repertoire.generics.fragment.group)",
						"button": "$t(generic.read_more)",
						"train": "Practice this $t(chess.repertoire.generics.fragment.group)",
						"delete": {
							"tooltip": "Delete $t(chess.repertoire.generics.fragment.group)"
						},
						"edit": "Edit $t(chess.repertoire.generics.fragment.group)",
						"opening_delete": "Remove opening from this $t(chess.repertoire.generics.fragment.group)",
						"confirm": {
							"part1": "Are you sure you want to remove",
							"part2": "from the $t(chess.repertoire.generics.fragment.group)?"
						}
					},
					"editor": {
						"label": "Editing $t(chess.repertoire.generics.fragment.group)",
						"edit": {
							"title": "Edit title",
							"desc": "Edit description",
							"openings": "Select openings"
						},
						"save": "Save details",
						"confirm": "Are you sure you want to delete the $t(chess.repertoire.generics.fragment.group)"
					}
				},
				"stages": {
					"read_more": "$t(generic.read_more)",
					"practice": "Practice",
					"delete": "Delete opening",
					"title": {
						"edit": "Edit the title",
						"save": "Save the title"
					},
					"desc": {
						"edit": "Edit the description",
						"save": "Save the description"
					}
				},
				"train_chess": {
					"status": {
						"start": "Start practicing!",
						"complete": "Opening completed!",
						"wrong": "Wrong move!",
						"white_move": "White to move",
					},
					"panel": {
						"label": "$t(chess.generics.status.game)",
						"move": {
							"part1": "You have moved",
							"part2": "times, and the amount of moves in the opening is"
						},
						"return": "Back to stage selection",
						"openings": "Select opening here"
					}
				},
				"full_game": {
					"status": {
						"fragments": {
							"winner": "wins by checkmate",
							"check": "is in check",
							"wins": "Wins",
							"losses": "Losses",
							"draws": "Draws"
						},
						"ongoing": "Game ongoing",
						"drawn": "Game drawn",
					},
					"panel": {
						"label": "$t(chess.generics.status.game)",
						"reset": "Reset board",
						"undo": "Undo move"
					},
					"alert": "Can't undo. game has already been completed."
				}
			},
			"news": {
				"generics": {
					"fragment": {
						"required": "Required field"
					}
				},
				"title": "$t(header.news)",
				"publishing": {
					"part1": "Are you sure you want to",
					"part2": "the news item",
					"alt1": "Do you want to",
					"alt2": "this?",
					"publish": "publish",
					"unpublish": "unpublish"
				},
				"item": {
					"created_by": "Written by",
					"created_at": "Created",
					"modified_at": "Modified",
					"summary": "Summary"
				},
				"delete": {
					"confirmation": "Are you sure you want to delete this news item?",
					"tooltip": "Delete news item?"
				},
				"creator": {
					"info": {
						"label": "If you want to create some news, click the button below.",
						"button": "Create a new news item"
					},
					"modal": {
						"label": "Create a news post",
						"save": {
							"confirmation": "Are you sure you want to create a new news post?",
							"button": "Save news"
						},
						"title": {
							"label": "Add a title to the news",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "News title"
						},
						"summary": {
							"label": "Add a summary to the news",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "News summary"
						},
						"content": {
							"label": "Add content to the news",
							"placeholder": "News content"
						}
					}
				},
				"editor": {
					"info": {
						"tooltip": "Edit this news item?"
					},
					"modal": {
						"label": "Edit a news post",
						"save": {
							"button": "Save changes",
							"tooltip": "Are you sure you want to update this news post?"
						},
						"title": {
							"label": "Edit the news title",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "News title"
						},
						"summary": {
							"label": "Edit the news summary",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "News summary"
						},
						"content": {
							"label": "Edit the news content",
							"placeholder": "News content"
						}
					}
				}
			},
			"docs": {
				"generics": {
					"fragment": {
						"required": "Required field"
					}
				},
				"title": "$t(header.docs)",
				"faq": {
					"label": "We also have an FAQ section.",
					"button": "FAQ"
				},
				"publishing": {
					"part1": "Are you sure you want to",
					"part2": "the doc",
					"alt1": "Do you want to",
					"alt2": "this?",
					"publish": "publish",
					"unpublish": "unpublish"
				},
				"item": {
					"created_at": "Created",
					"modified_at": "Modified",
					"summary": "Summary"
				},
				"delete": {
					"confirmation": "Are you sure you want to delete this doc?",
					"tooltip": "Delete doc?"
				},
				"creator": {
					"info": {
						"label": "If you want to create new documentation, click the button below.",
						"button": "Create a new doc"
					},
					"modal": {
						"label": "Create new documentation",
						"save": {
							"confirmation": "Are you sure you want to create a new doc?",
							"button": "Save doc"
						},
						"title": {
							"label": "Add a title to the doc",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Doc title"
						},
						"summary": {
							"label": "Add a summary to the doc",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Doc summary"
						},
						"content": {
							"label": "Add content to the doc",
							"placeholder": "Doc content"
						}
					}
				},
				"editor": {
					"info": {
						"tooltip": "Edit this doc?"
					},
					"modal": {
						"label": "Edit a doc",
						"save": {
							"button": "Save changes",
							"tooltip": "Are you sure you want to update this doc?"
						},
						"title": {
							"label": "Edit the doc's title",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Doc title"
						},
						"summary": {
							"label": "Edit the doc's summary",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Doc summary"
						},
						"content": {
							"label": "Edit the doc's content",
							"placeholder": "Doc content"
						}
					}
				}
			},
			"faq": {
				"generics": {
					"fragment": {
						"required": "Required field"
					}
				},
				"title": "Frequently Asked Questions",
				"publishing": {
					"part1": "Are you sure you want to",
					"part2": "the FAQ",
					"alt1": "Do you want to",
					"alt2": "this?",
					"publish": "publish",
					"unpublish": "unpublish"
				},
				"item": {
					"created_at": "Created",
					"modified_at": "Modified",
					"summary": "Summary"
				},
				"delete": {
					"confirmation": "Are you sure you want to delete this FAQ?",
					"tooltip": "Delete FAQ?"
				},
				"creator": {
					"info": {
						"label": "If you want to create a new FAQ, click the button below.",
						"button": "Create a new FAQ"
					},
					"modal": {
						"label": "Create new FAQ",
						"save": {
							"confirmation": "Are you sure you want to create a new FAQ?",
							"button": "Save FAQ"
						},
						"title": {
							"label": "Add a title to the FAQ",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ title"
						},
						"summary": {
							"label": "Add a summary to the FAQ",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ summary"
						},
						"content": {
							"label": "Add content to the FAQ",
							"placeholder": "FAQ content"
						}
					}
				},
				"editor": {
					"info": {
						"tooltip": "Edit this FAQ?"
					},
					"modal": {
						"label": "Edit a FAQ",
						"save": {
							"confirmation": "Are you sure you want to update this FAQ?",
							"button": "Save changes"
						},
						"title": {
							"label": "Edit the FAQ's title",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ title"
						},
						"summary": {
							"label": "Edit the FAQ's summary",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ summary"
						},
						"content": {
							"label": "Edit the FAQ's content",
							"placeholder": "FAQ content"
						}
					}
				}
			}
		}
	},
	no: {
		translation: {// Translation keys and their Norwegian text
			"title": "Chess Buddy",
			"train_openings": "Tren Åpninger",
			"play_now": "Spill Nå",
			"your_history": "Din Historikk",
			"about_chess_buddy": "Om Chess Buddy",
			"chess_buddy_description_1": "Chess Buddy er en innovativ webapplikasjon designet for å styrke dine sjakkåpninger og forbedre ditt generelle spill.",
			"chess_buddy_description_2": "Ved å bruke Chess Buddy kan spillere på alle nivåer utforske et bredt spekter av sjakkåpninger, lære strategiene bak dem, og øve på å implementere dem i sine egne spill.",
			"chess_buddy_description_3": "Funksjoner inkluderer interaktive leksjoner, praktiske utfordringer, og muligheten til å spille mot en AI for å teste ut nye åpninger i realistiske scenarioer. Chess Buddy er ikke bare et verktøy for læring; det er en partner i din sjakkutvikling.",
			"home_link": "Du kan lese mer ",
			"about_us_here": "om oss her",
			"ch_help_you1": "Hvordan Chess Buddy Hjelper Deg",
			"ch_help_you2": "Tilpassede læringsveier som matcher ditt ferdighetsnivå og læringsmål.",
			"ch_help_you3": "Interaktive leksjoner som forklarer hver åpning og dens variabler i dybden.",
			"ch_help_you4": "Utfordringer og spill mot AI for å øve og forsterke læringen.",
			"ch_help_you5": "Tilbakemelding og analyser som hjelper deg å forstå dine styrker og svakheter.",
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
				"read_more": "Les mer",
				"email": {
					"label": "E-post",
					"placeholder": "deg@eksempel.com"
				},
				"password": {
					"label": "Passord"
				}
			},
			"cookie_banner": {
				"label": "Denne nettsiden benytter informasjonskapsler",
				"body": "$t(cookie_banner.label) for brukerautentisering. Disse er kritiske informasjonskapsler, og kan ikke deaktiveres; foruten at du ikke ønsker å kunne logge inn.",
				"button": "Ok"
			},
			"header": {
				"home": "Home",
				"news": "News",
				"docs": "Docs",
			},
			"footer": {
				"notice": "Alle rettigheter forbeholdt."
			},
			"error": {
				"500": {
					"title": "Intern Server Feil.",
					"message": "Noe gikk galt."
				}
			},
			"actions": {
				"confirm": {
					"title": "Bekreft handling",
					"yes": "Ja",
					"no": "Nei"
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
			},
			"delete_account": {
				"label": "Du skal til å slette kontoen din.",
				"notice": "Er du sikker?",
				"button": "Ja, Slett kontoen min"
			},
			"user_profile": {
				"generics": {
					"fragment": {
						"user_id": "Bruker ID av"
					},
					"about_me": "Om meg",
					"nationality": "Nasjonalitet"
				},
				"friend_list": {
					"label": "Venner",
					"no_friends": "Du har ingen venner.",
					"tooltip": {
						"open_profile": "Åpne profil",
						"user_id_fragment": "$t(user_profile.generics.fragment.user_id)",
						"remove_friend": "Fjern venn"
					}
				},
				"friend_requests": {
					"label": "Noen ventende venneforespørsler?",
					"no_pending": "Det er ingen ventende forespørsler akkurat nå.",
					"tooltip": {
						"button": "Ventende venneforespørsler.",
						"reject": "Avslå venneforespørsel.",
						"accept": "Godta venneforespørsel.",
						"user_id": "$t(user_profile.generics.fragment.user_id)"
					}
				},
				"search_users": {
					"label": "Vil du legge til noen venner?",
					"info": {
						"part1": "Du kan gjøre det ved å skrive inn en brukers visningsnavn",
						"part2": "(du finner det under profilbildet)",
						"part3": "eller gjennom deres ID (den lange teksten i linken til profilen deres",
						"part4": "f.eks."
					},
					"search": {
						"hint": "Skriv inn en ID eller ett visningsnavn",
						"user_not_found": "Bruker ikke funnet!",
						"befriend_self": "Beklager, du kan ikke bli venn med deg selv.",
						"request_sent": "Venneforespørsel er sent, men det ventes på svar.",
						"already_friends": "Dere er allerede venner.",
						"button": "Send en venneforespørsel"
					},
					"tooltip": {
						"button": "Søk etter brukere eller nye venner."
					}
				},
				"editor": {
					"label": "Rediger profilen din",
					"avatar_url": {
						"label": "Profilbilde link",
						"tooltip": "Dette er en direkte link til ett bilde eller en GIF på internett.",
						"placeholder": "https://eksempel.no/mitt-kule-profilbilde"
					},
					"display_name": {
						"label": "Visningsnavn",
						"tooltip": "Dette er navnet du viser på kontoen din.",
						"placeholder": "Kult navn"
					},
					"about_me": {
						"label": "$t(user_profile.generics.about_me)",
						"tooltip": "Her kan du skrive litt om deg selv.",
						"placeholder": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
					},
					"nationality": {
						"label": "$t(user_profile.generics.nationality)",
						"tooltip": "Velg hvilket flagg som skal vises på profilen din.",
						"default": "Velg land"
					},
					"visibility": {
						"label": "Brukerprofilsynlighet",
						"option_true": "Ja, jeg vil at profilen min skal være synlig for andre",
						"option_false": "Nei, jeg vil ikke at profilen min skal være synlig for andre"
					},
					"visibility_friends_list": {
						"label": "Vennelistesynlighet",
						"option_true": "Ja, jeg vil at vennelisten min skal være synlig for andre",
						"option_false": "Nei, jeg vil ikke at vennelisten min skal være synlig for andre"
					},
					"save": {
						"label": "Lagre detaljer",
						"warning": "(Lagring fører til at siden lastes om)"
					},
					"tooltip": {
						"button": "Brukerprofilredaktør og brukerprofilinnstillinger."
					}
				},
				"user_stats": {
					"elo_rank": "ELO-rangering",
					"games_played": "Antall spill",
					"games_won": "Antall vinn",
					"games_lost": "Antall tap",
					"games_drawn": "Antall uavgjort",
					"nationality": "$t(user_profile.generics.nationality)"
				},
				"about_me": "$t(user_profile.generics.about_me)",
				"error": {
					"return": "$t(generic.return_somewhere) hjemmesiden"
				}
			},
			"user_settings": {
				"email": {
					"label": "Bytt din e-post.",
					"tooltip": "Du kan endre din innlogging epost her.",
					"placeholder": "eksempel@eksempel.no",
					"notice": "Du blir nødt til å verifisere den nye e-posten."
				},
				"password": {
					"label": "Bytt ditt passord",
					"tooltip": "Du kan bytte ditt innloggingspassord her."
				},
				"delete": {
					"notice": "Om du klikker denne knappen, vil den ikke slette kontoen din ummidelbart."
				},
				"button": {
					"email": "Lagre ny e-post",
					"password": "Lagre nytt passord",
					"delete": "Slett kontoen din"
				}
			},
			"admin_dashboard": {
				"users": {
					"label": "Slett eller oppgradere brukeren til administrator?",
					"notice": "Du vil ikke kunne se din egen konto her.",
					"warning": "Utenom din konto, ble ingen andre funnet.",
					"promote": {
						"tooltip": "Dette vil oppgradere brukeren til administrator."
					},
					"demote": {
						"tooltip": "Dette vil nedgradere administratoren til en vanlig bruker."
					},
					"delete": {
						"label": "Slett bruker",
						"tooltip": "Dette vil permanent slette kontoen.",
						"body": "Du holder på å permanent slette en bruker! Er du sikker på at du vil slette brukeren med denne IDen?",
						"button": {
							"yes": "Ja",
							"no": "Nei"
						}
					}
				}
			},
			"chess": {
				"generics": {
					"status": {
						"game": "Spill Status"
					},
					"delete_data": "Slett all spilldataa"
				},
				"create_opening": {
					"label": "Du kan også lage dine egne åpninger.",
					"title": "$t(chess.create_opening.button.open)!",
					"button": {
						"open": "Lag en åpning",
						"save": "Lagre åpning"
					},
					"placeholder": {
						"name": "Navn på åpningen",
						"desc": "Beskrivelse av åpningen."
					},
					"feedback": {
						"missing": "Mangler navn, beskrivelse eller trekk",
						"error": "En feil oppstod ved skriving til databasen",
						"success": "Ny åpning lagret"
					},
					"groups": {
						"label": "Åpninger"
					},
					"confirm": {
						"part1": "Du er i ferd med å slette åpningen",
						"part2": "Er du sikker på at du vil fortsette?"
					}
				},
				"repertoire": {
					"generics": {
						"fragment": {
							"group": "repertoar"
						},
					},
					"header": {
						"label": "$t(chess.repertoire.generics.fragment.group), en gruppe av åpninger.",
						"button": {
							"save": "Lagre $t(chess.repertoire.generics.fragment.group)en",
							"create": "Lag en $t(chess.repertoire.generics.fragment.group)"
						}
					},
					"groups": {
						"label": "Dine $t(chess.repertoire.generics.fragment.group)",
						"title": "Åpninger i denne $t(chess.repertoire.generics.fragment.group)en",
						"button": "$t(generic.read_more)",
						"train": "Øv på denne $t(chess.repertoire.generics.fragment.group)en",
						"delete": {
							"tooltip": "Slett $t(chess.repertoire.generics.fragment.group)"
						},
						"edit": "Rediger $t(chess.repertoire.generics.fragment.group)",
						"opening_delete": "Fjern åpning fra $t(chess.repertoire.generics.fragment.group)et",
						"confirm": {
							"part1": "Er du sikker på at du vil fjerne",
							"part2": "fra $t(chess.repertoire.generics.fragment.group)et?"
						}
					},
					"editor": {
						"label": "Redigerer $t(chess.repertoire.generics.fragment.group)",
						"edit": {
							"title": "Rediger tittel",
							"desc": "Rediger beskrivelsen",
							"openings": "Velg åpninger"
						},
						"save": "Lagre detaljer",
						"confirm": "Er du sikker på at du vil slette $t(chess.repertoire.generics.fragment.group)et"
					}
				},
				"stages": {
					"read_more": "$t(generic.read_more)",
					"practice": "Øv på",
					"delete": "Slett åpning",
					"title": {
						"edit": "Rediger tittelen",
						"save": "Lagre tittelen"
					},
					"desc": {
						"edit": "Rediger beskrivelsen",
						"save": "Lagre beskrivelsen"
					}
				},
				"train_chess": {
					"status": {
						"start": "Start øving!",
						"complete": "Åpning gjennomført!",
						"wrong": "Feil trekk!",
						"white_move": "Hvit skal trekke",
					},
					"panel": {
						"label": "$t(chess.generics.status.game)",
						"move": {
							"part1": "Du har flyttet deg",
							"part2": "ganger, og antallet trekk i denne åpningen er"
						},
						"return": "Tilbake til banevalg",
						"openings": "Velg åpning her"
					}
				},
				"full_game": {
					"status": {
						"fragments": {
							"winner": "Vinner med sjakkmatt",
							"check": "er i sjakk",
							"wins": "Vinn",
							"losses": "Tap",
							"draws": "Uavgjort"
						},
						"ongoing": "Spill pågående",
						"drawn": "Spill uavgjort",
					},
					"panel": {
						"label": "$t(chess.generics.status.game)",
						"reset": "Nullstill bordet",
						"undo": "Angre trekk"
					},
					"alert": "Kan ikke angre trekk, spiller er fullført."
				}
			},
			"news": {
				"generics": {
					"fragment": {
						"required": "Obligatorisk felt"
					}
				},
				"title": "Nyheter",
				"publishing": {
					"part1": "Er du sikker på at du vil",
					"part2": "denne nyheten",
					"alt1": "Ønsker du å",
					"alt2": "denne nyheten?",
					"publish": "publisere",
					"unpublish": "upublisere"
				},
				"item": {
					"created_by": "Skrevet av",
					"created_at": "Opprettet",
					"modified_at": "Endret",
					"summary": "Sammendrag"
				},
				"delete": {
					"confirmation": "Er du sikker på at du vil slette denne nyheten?",
					"tooltip": "Slett nyhet?"
				},
				"creator": {
					"info": {
						"label": "Om du ønsker å lage en ny nyhet, kan du klikke knappen under.",
						"button": "Lag en ny nyhet"
					},
					"modal": {
						"label": "Lag en nyhet",
						"save": {
							"confirmation": "Er du sikker på at du vil gjennomføre opprettelsen av denne nye nyheten?",
							"button": "Lagre nyhet"
						},
						"title": {
							"label": "Lag en tittel til nyheten",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Nyhet titel"
						},
						"summary": {
							"label": "Lag ett sammendrag for nyheten",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Nyhet sammendrag"
						},
						"content": {
							"label": "Lag innhold for nyheten",
							"placeholder": "Nyhet innhold"
						}
					}
				},
				"editor": {
					"info": {
						"tooltip": "Rediger denne nyheten?"
					},
					"modal": {
						"label": "Rediger nyhet",
						"save": {
							"confirmation": "Er du sikker på at du vil oppdatere denne nyheten?",
							"button": "Lagre endringer"
						},
						"title": {
							"label": "Rediger nyhetens titel",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Nyhet titel"
						},
						"summary": {
							"label": "Rediger nyhetens sammendrag",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Nyhet sammendrag"
						},
						"content": {
							"label": "Rediger nyhetens innhold",
							"placeholder": "Nyhet innhold"
						}
					}
				}
			},
			"docs": {
				"generics": {
					"fragment": {
						"required": "Obligatorisk felt"
					}
				},
				"title": "Dokumentasjon",
				"faq": {
					"label": "Vi har også en ofte-spurte-spørsmål seksjon.",
					"button": "FAQ"
				},
				"publishing": {
					"part1": "Er du sikker på at du vil",
					"part2": "denne dokumentasjonen",
					"alt1": "Ønsker du å",
					"alt2": "denne dokumentasjonen?",
					"publish": "publisere",
					"unpublish": "upublisere"
				},
				"item": {
					"created_at": "Opprettet",
					"modified_at": "Endret",
					"summary": "Sammendrag"
				},
				"delete": {
					"confirmation": "Er du sikker på at du vil slette denne dokumentasjonen?",
					"tooltip": "Slett dokumentasjon?"
				},
				"creator": {
					"info": {
						"label": "Om du ønsker å lage ny dokumentasjon, kan du klikke knappen under.",
						"button": "Lag en ny dokumentasjon"
					},
					"modal": {
						"label": "Lag dokumentasjon",
						"save": {
							"confirmation": "Er du sikker på at du vil gjennomføre opprettelsen av denne nye dokumentasjon?",
							"button": "Lagre dokumentasjon"
						},
						"title": {
							"label": "Lag en tittel til dokumentasjonen",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Dokumentasjon titel"
						},
						"summary": {
							"label": "Lag ett sammendrag for dokumentasjonen",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Dokumentasjon sammendrag"
						},
						"content": {
							"label": "Lag innhold for dokumentasjonen",
							"placeholder": "Dokumentasjon innhold"
						}
					}
				},
				"editor": {
					"info": {
						"tooltip": "Rediger denne dokumentasjonen?"
					},
					"modal": {
						"label": "Rediger dokumentasjon",
						"save": {
							"confirmation": "Er du sikker på at du vil oppdatere denne dokumentasjonen?",
							"button": "Lagre endringer"
						},
						"title": {
							"label": "Rediger dokumentasjonens titel",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Dokumentasjon titel"
						},
						"summary": {
							"label": "Rediger dokumentasjonens sammendrag",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "Dokumentasjon sammendrag"
						},
						"content": {
							"label": "Rediger dokumentasjonens innhold",
							"placeholder": "Dokumentasjon innhold"
						}
					}
				}
			},
			"faq": {
				"generics": {
					"fragment": {
						"required": "Obligatorisk felt"
					}
				},
				"title": "Ofte Spurte Spørsmål",
				"publishing": {
					"part1": "Er du sikker på at du vil",
					"part2": "denne FAQen",
					"alt1": "Ønsker du å",
					"alt2": "denne FAQen?",
					"publish": "publisere",
					"unpublish": "upublisere"
				},
				"item": {
					"created_at": "Opprettet",
					"modified_at": "Endret",
					"summary": "Sammendrag"
				},
				"delete": {
					"confirmation": "Er du sikker på at du vil slette denne FAQen?",
					"tooltip": "Slett FAQ?"
				},
				"creator": {
					"info": {
						"label": "Om du ønsker å lage en ny FAQ, kan du klikke knappen under.",
						"button": "Lag ny FAQ"
					},
					"modal": {
						"label": "Lag FAQ",
						"save": {
							"confirmation": "Er du sikker på at du vil gjennomføre opprettelsen av denne nye FAQen?",
							"button": "Lagre FAQ"
						},
						"title": {
							"label": "Lag en tittel til FAQen",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ titel"
						},
						"summary": {
							"label": "Lag ett sammendrag for FAQen",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ sammendrag"
						},
						"content": {
							"label": "Lag innhold for FAQen",
							"placeholder": "FAQ innhold"
						}
					}
				},
				"editor": {
					"info": {
						"tooltip": "Rediger denne FAQen?"
					},
					"modal": {
						"label": "Rediger FAQ",
						"save": {
							"confirmation": "Er du sikker på at du vil oppdatere denne FAQen?",
							"button": "Lagre endringer"
						},
						"title": {
							"label": "Rediger FAQens titel",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ titel"
						},
						"summary": {
							"label": "Rediger FAQens sammendrag",
							"tooltip": "$t(news.generics.fragment.required)",
							"placeholder": "FAQ sammendrag"
						},
						"content": {
							"label": "Rediger FAQens innhold",
							"placeholder": "FAQ innhold"
						}
					}
				}
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
