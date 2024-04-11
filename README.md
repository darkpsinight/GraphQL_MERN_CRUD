# GraphQL CRUD Application

This project contains a MERN application, it allows querying and mutating data related to clients and projects and then consumes a GraphQL API.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repo
   ```sh
    git clone https://github.com/darkpsinight/GraphQL_MERN_CRUD.git
    ```
2. Install NPM packages
    ```sh
        npm install
    ```

3. Start the dev server
    ```sh
        npm run dev
    ```

### Usage

This application allows you to manage clients and projects stored in a MongoDB database through a user-friendly interface. Here's what you can do:

- View Clients and Projects
Upon launching the application, you'll see a list of all clients and their associated projects.

Each project is linked to its corresponding client for easy navigation and reference.

- Add New Client or Project

You can add a new client or project using the provided form.

Simply fill in the required details and submit the form to add the client or project to the database.

- View Project Details

Clicking on a project will take you to a detailed view where you can see all the information about the project, including its associated client.

This detailed view provides a comprehensive overview of the project's status, deadlines, and other relevant details.

- Update Project Details

If you need to make changes to a project, you can do so directly from the detailed view.

Simply edit the project details and save your changes to update the database.

- Delete Projects or Clients

Projects and clients can be deleted from the database if they're no longer needed.

Use the provided delete functionality to remove projects or clients from the system.

---
With this intuitive interface, managing clients and projects becomes a seamless process, allowing you to focus on your core tasks without hassle.

It uses Apollo Client to connect to the GraphQL API. The queries and mutations are defined in `src/graphql`.

### Backend Tech Stack
* Node.js
* Express
* MongoDB
* Mongoose
* GraphQL

### Frontend Built With
* React - Front-end framework
* Apollo Client - GraphQL client
* Vite - Front-end build tool
* Bootstrap

### Features
- Fetch clients and projects data with GraphQL queries
- Mutate clients and projects data with GraphQL mutations
- Define GraphQL schema with types and resolvers
- Connect to MongoDB database with Mongoose models

### License
This project is licensed under the MIT License - see the LICENSE.md file for details.
