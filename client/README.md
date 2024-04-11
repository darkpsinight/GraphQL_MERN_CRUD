# Client

This folder contains the client-side React app for the project.

## Tech Stack

- [React](https://reactjs.org/) - Front-end library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling. It's fast!
- [Apollo Client](https://www.apollographql.com/docs/react/) - Fully-featured, production ready caching GraphQL client
- [GraphQL](https://graphql.org/) - Query language for APIs  

## Folder Structure

.
    client
    ├── README.md
    ├── index.html
    ├── package.json
    ├── src                           # `src` contains all the source code
    │   ├── App.jsx                   # `App.jsx` - Main App component
    │   ├── index.jsx                 # `index.jsx` - Entry point for the app
    │   ├── components                # `components` - Reusable React components
    │   ├── graphql                   # `graphql` - GraphQL queries and mutations
    │   │   ├── queries
    │   │   └── mutations
    └── vite.config.js

## Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run preview` - locally preview production build

## Learn More

To learn more about the technologies used, take a look at the following resources:

- [React documentation](https://reactjs.org/docs/getting-started.html) - learn React
- [Vite documentation](https://vitejs.dev/guide/) - learn Vite 
- [Apollo Client documentation](https://www.apollographql.com/docs/react/) - learn Apollo Client
- [GraphQL documentation](https://graphql.org/learn/) - learn GraphQL