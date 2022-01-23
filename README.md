# MultiTwitch

Watch multiple Twitch tv streams.

Example: https://goerwin.github.io/multitwitch/stream1/stream2

## Development

```sh
# start a dev server
$ npm run start-dev
```

## Deployment

The website will be updated everytime the index.html/404.html files are changed.
Make sure to run the `deploy` script before pushing to the main branch, otherwise you will not see the changes.

```sh
# This will move built files from dist folder
# to the root so that the website works
$ npm run deploy
```

## TODO

- Layouts (Eg. Toggle chat)
- Hotkeys (Eg. Mute streams, toggle chat)
