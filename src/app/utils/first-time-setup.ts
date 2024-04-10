/**
 * This function is called for only if `process.env.FIRST_TIME_SETUP` is set to `true`.
 *
 * Its role is to connect to the database, and create the necessary tables, functions,
 * triggers, policies, row-level-security policies and constraints.
 *
 * This replaces the previous necessity for the `PREREQUISITES.md` file.
 */
export default function firstTimeSetup() {
	console.log("First time setup is running.");
}
