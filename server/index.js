const express = require("express");
require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;
const base_url = process.env.BASE_URL || "http://localhost";

const app = express();

// Connect to DB
connectDB();

// CORS middleware
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.node_ENV === "development",
  })
);

app.listen(port, () =>
  console.log(`Server running on port: `.yellow + `${base_url}:${port}`.white)
);
