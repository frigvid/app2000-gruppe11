/**
 * Logman takes a message, and logs it to the console
 * only if the environment is "dev".
 *
 * @param message The message to log.
 * @author frigvid
 */
function logman(message: string) {
	 if (process.env.ENVIRONMENT === 'dev') {
		  console.log(message);
	 }
}

export default logman;
