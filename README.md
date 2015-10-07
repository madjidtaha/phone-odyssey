Vintage Phone
=============

The project we made for the Arduino workshop at [Gobelins, l'école de l'image](http://www.gobelins.fr)

## Install

1. Clone this repository

2. Change your node version to the v0.12 using [NVM](https://github.com/creationix/nvm)

3. Install the dependencies
```bash
npm install
```

## Development

Start the dev server
```bash
npm run dev:server
```

and build the client files
```bash
npm run dev:build
```

## Production

Build and minify the client files
```bash
npm run prod
```

and then upload all the files to your server
