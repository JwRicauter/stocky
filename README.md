# Stocky

Application made for the Schroders test, a uk based asset management company. You must have Node, installed in your computer.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_URI`

`REACT_APP_FINHUB_SECRET`

The first one, its the uri base of finnhub and the second one is the secret code to access to the finnhub api.

## Installation

The only thing you need to run this project is:

```bash
  npm i
  npm run start
```

## Tech Stack

React,
TypeScript,
Jest,
React Testing Library

Charts with _reachart_

## Architecture Desing

The application consists of three main directories, the first, pages, where the application pages are stored (in our case only one because it is a single app page, but this architecture is left in case you want to restructure it in the future to something else). The components directory, where the components that use the pages are, and finally, the services directory, where the api services are.
