/**
 * Logman takes a message, and logs it to the console
 * only if the environment is "dev".
 *
 * @param message The message to log.
 * @author frigvid
 */
function logman(message: string): void {
	 if (process.env.ENVIRONMENT === 'dev') {
		  console.log(message);
	 }
}

// Inform that debug logging is enabled.
logman("Logman loaded.");

export default logman;
