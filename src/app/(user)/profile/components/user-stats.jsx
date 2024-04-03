/**
 * User profile's stat component.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function UserStats() {
	
	const {flag, code, name, countries} = require("country-emoji");
	
	return (
		<div className="flex justify-around text-center space-x-4">
			<div>
				<h3 className="text-lg font-bold">ELO Rating</h3>
				<p>1107</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Games Played</h3>
				<p>120</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Wins</h3>
				<p>89</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Losses</h3>
				<p>31</p>
			</div>
			<div>
				<h3 className="text-lg font-bold">Draws</h3>
				<p>31</p>
			</div>
			{/* TODO: If the user does not have a set nationality, hide this. */}
			<div>
				<h3 className="text-lg font-bold">Nationality</h3>
				{/* FIXME: Unicode country codes does not render as an emoji. Might be prudent to switch to SVG. */}
				<p>{flag("Norway")}</p>
			</div>
		</div>
	);
}
