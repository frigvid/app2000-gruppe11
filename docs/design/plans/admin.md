# Administrators for first-time setup

Administrators should be able to be created for use in a first-time setup.

The web-application will have an, at least basic, administrator user interface. Which will allow for deletion of users, promoting users to administrator status, and demoting them.

To create an administrator, I think leveraging `.env` is a decent way of going about it. If the environment variables are set, the user will be created using that. If not, it'll do nothing.

Environment variable names:
- `FTS_ADMIN_USERNAME`: Must match username requirements.
- `FTS_ADMIN_PASSWORD`: Must match password requirements.

FTS is just shorthand for first-time setup.
