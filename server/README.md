# Server

This folder contains the backend server code for the project. 

## Tech Stack

- [Node.js](https://nodejs.org/en/) - Runtime environment for JavaScript
- [Express](https://expressjs.com/) - Web application framework for Node.js
- [MongoDB](https://www.mongodb.com/) - Document-oriented NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [GraphQL](https://graphql.org/) - Query language for APIs 

## Files

- `index.js` - Entry point and server setup
- `config/db.js` - Database connection and configuration
- `models/` - Data models 
  - `Client.js` - Client model
  - `Project.js` - Project model
- `schema/schema.js` - GraphQL schema and resolvers  
- `sampleData.js` - Sample data for seeding the database

## File Structure

.
    server
    ├── config                                  # `config/` - Database configuration
    │ └── db.js                                 # `db` - MongoDB connection
    ├── models                                  # `models/` - Data models
    │ ├── Client.js
    │ └── Project.js
    ├── schema                                  # `schema/` - GraphQL schema and resolvers
    │ └── schema.js
    ├── index.js                                # `index.js` - Server entry point
    └── sampleData.js                           # `sampleData.js` - Sample data (for testing)

## Usage

Install dependencies
`npm install`

Run server
`npm run server`


The server will start on http://localhost:5000.

GraphQL playground available at http://localhost:5000/graphql.