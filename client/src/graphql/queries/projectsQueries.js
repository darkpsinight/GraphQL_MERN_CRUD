import { gql } from "@apollo/client";

// get all projects list
const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      description
      status
    }
  }
`;

// get one project by id
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
