# Vercel notes for those using that for hosting

## Ignore Build Step
Most of Vercel is pretty basic, and little configuration is needed to be up and running. However, if you need to ensure that it only builds for the master branch (which means no preview builds) _and_ doesn't build for changes outside of `src/`, then you can use this `bash` command using the "Custom" input.

```bash
[ "$VERCEL_ENV" == "production" ] && git diff HEAD^ HEAD --quiet ./src || exit 0
```

Note: This was made by combining different command templates provided by Vercel for the Ignore Build Step.
