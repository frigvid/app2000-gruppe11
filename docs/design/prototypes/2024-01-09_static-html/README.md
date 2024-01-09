# What are the various files for?

- `homepage.html` is equivalent to `index.html` and is the homepage for the website.
- `login.html` is the login page, where you can insert a username and password to login. Reset an old password, or register. These last two things may require a `reset.html` and `register.html` file for this static html prototype.
    - The login button should be available on all pages, but, for the sake of simplicity, it does not need to change when you've logged in. That can come later.
- `userprofile.html` is the page that shows public details about the user. E.g. user icon, descriptive text, friends, etc. Not all of these needs to be public, as these can be left blank by users in practice, and visibility should be togglable through `settings.html`. For this prototype, every field should have data, to properly display how things will look.
- `settings.html` should contain account toggles. E.g. security toggles, visibility toggles, and the ability to permanently-and immediately-delete the account. All these buttons should be non-functional for now.
- `news.html` is the news page. Remember that it's up to the website hosters to update this, and it's not meant to be updated automatically by subscribing to other websites.
- `faq.html` is "often asked" questions and answers about the website and its purpose. These should explain more than the homepage does, because the homepage should only describe what is necessary to get the point across.
- `aboutus.html` is a generic "about us" page, that describes the team members (either with real names or psuedonyms) and about the project.
- `docs.html` contains two sections. The software documentation (meant for end users) and the developer documentation (meant for devs). You can use lorem ipsum for these, but they need to be clearly separated from each other.
- `stages.html` is where you can select stages, read about them and their strategy, and so on.
- `chessboard.html` is the game board page. You can simply display an image or SVG of the chess board or whatever you feel is necessary here. So long as it's properly designed. Essentially, don't worry about making the chess board from scratch just yet.