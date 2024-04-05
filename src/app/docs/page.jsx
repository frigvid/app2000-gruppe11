/**
 * Stub page for user-application documentation.
 *
 * @author frigvid
 */
export default function App()
{
	return (
		<main className="flex justify-center items-center flex-col p-5">
			<h1 className="text-2xl font-bold mb-4">FAQ</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				<div className="p-4 border rounded-lg shadow">
					<p>Is Chess Buddy free to use?</p>
					<p>chess buddy is a free websites for learning chess and chess openings.</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>Can I use the website without an account?</p>
					<p>You can use the website without having a account, but if you dont have a account your progress wont be saved when you exit the application</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>How do I start a game?</p>
					<p>You start a game by goint to the home page and presing start game.</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>Can I play against the computer?</p>
					<p>yes, you can play againts a computer and ater we are going to make it posible to play against people also</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>Do you offer chess lessons or tutorials?</p>
					<p> Chess Buddy is a webpage dedicated to help players learn openings for the game of chess, and you can even make your own openings later when you have learned some.</p>
				</div>
			</div>
		</main>
	);
}
