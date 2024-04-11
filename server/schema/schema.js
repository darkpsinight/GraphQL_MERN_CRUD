const { Client, Project } = require("../models");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Clients resolver
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find();
      },
    },

    // Client resolver
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Client.findById(args.id);
      },
    },

    // Project resolver
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Project.findById(args.id);
      },
    },

    // Projects resolver
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    // add client properties
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        let client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },

    // add project properties
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus", // Mandatory, useful for usage in frontend (check "client\src\graphql\mutations\addProject.js")
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              finish: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        let project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },

    // delete client properties
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove();
          });
        });
        return Client.findByIdAndDelete(args.id);
      },
    },

    // delete project properties
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },

    // update project properties
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate", // "client\src\graphql\mutations\project\updateProject.js" uses 'ProjectStatusUpdate'
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              finish: { value: "Completed" },
            },
          }),
        },
      },
      resolve(_, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            // here we specify what the mutation returns
            name: args.name,
            description: args.description,
            status: args.status,
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
