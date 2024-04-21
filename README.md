<!-- Listen, I know align=center is basically deprecated, but it's GitHub. You use what you can, because there's not a lot of that going around. -->
<div align="center">
	<img src="./public/logo.svg" alt="Logo" width="80" height="80">
	<h3 align="center">APP2000 Group 11</h3>
	<p align="center">
		A chess training app made with React.js and Next.js.
		<br><br>
		<a href="https://a2g11.vercel.app">View Demo</a>
		◈
		<a href="https://github.com/frigvid/app2000-gruppe11/issues/new?assignees=&labels=bug&projects=&template=bug-report.yml&title=bug%3A+">Report Bug</a>
		◈
		<a href="https://github.com/frigvid/app2000-gruppe11/issues/new?assignees=&labels=needs+triage%2Cenhancement&projects=&template=feature-request.yml&title=feature%3A+">Request Feature</a>
		<br><br>
		<a href="docs/README.md"><strong>Explore the docs »</strong></a>
	</p>
</div>

<details>
<summary>Table of Contents</summary>

* [About The Project](#about-the-project)
	* [Built With](#built-with)
* [Getting Started](#getting-started)
	* [Prerequisites](#prerequisites)
	* [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [License](#license)

</details>
<br>

# About the project
Chess has various strategies to for both proactive and reactive actions for the early-game, mid-game and late-game.

Chess Buddy is a web-application designed to teach its users opening strategies.

Saying that, it's important to note that it is a bit bare-bones at the moment.

Features:
- Play full games of Chess against a random-type machine opponent.
- You are able to create opening strategies visually, and train against them.
- You are able to create repertoires, groups of openings, and train against them.
- You are able to modify your user profile, and add other users as friends.
- You are able to view, author, edit, delete and publish/unpublish news, documentation and FAQ.

## Built with

The project is developed using:

- React + Next.js.
- Tailwind CSS.
- Supabase.

# Getting started
## Prerequisites
### Database

Getting this project up and running for the first time, requires some manual labour. You're going to have to copy-and-paste the contents of the [PREREQUISITES.sql](./PREREQUISITES.sql) file into the SQL Editor in the Supabase GUI. Once you've pasted it all there, all you need to do is to run it, and then proceed with the rest of the prerequisites. Also note [the extras document](./EXTRAS.md) for other functions and the like that may be nice to use, but are not included by default.

> **Reasoning:** While it would be nice to automate this, of course, it's not really possible. Supabase treats every client as "untrusted" and thus does not allow for plain SQL execution. We could have made a SQL function for this, but having a function that lets you execute arbitrary SQL code sounds like a rather big potential security problem. Hence why it's necessary to do this manually.

### Environment file

1. Create a `.env.local` file in the root directory.
2. Grab your Supabase URL and add it as the value of `NEXT_PUBLIC_SUPABASE_URL`.
3. Grab your Supabase anonymous API key and add it as the value of `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

It'll look something like this:
```environment
NEXT_PUBLIC_SUPABASE_URL=https://somesubdomain.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=some kind of secret here
```

### Additional notes

Currently, our developer documentation is available through the `docs` folder and through `jsdoc` code documentation. We do plan on moving onto  [GitHub's repository-level Wiki](https://github.com/frigvid/app2000-gruppe11/wiki), but that is for the future.

## Installation

```bash
npm install
```

## Running DEBUG

```bash
npm run dev
```

Once it's up, open [http://localhost:3000](http://localhost:3000).

# Usage

Usage of the web-application should be relatively straight forward. It is designed to be mostly intuitive, but also contains internal user-aligned documentation.

# Roadmap

Our roadmap can be viewed through our [GitHub Project](https://github.com/users/frigvid/projects/1).

# License

The repository `LICENSE` file, as you may have noticed, marks this repository as MIT. However, due to the nature of its contents, it's actually multi-licensed. Unless otherwise specified, the licenses below apply to their respective areas:

- Code: `MIT`
- Documentation: `CC0`
- Resources (e.g. images): `CC0`

As mentioned, this is not withstanding resources that have other licenses. E.g. the react logo in use in the project logo is MIT while the chess piece is CC0.
