// server.js
import "dotenv/config";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";


const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization", "x-cookie-token"],
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  bodyParser.json(),
  expressMiddleware(server)
);

app.get("/", (req, res) => {
  res.send("🐱 CatFact GraphQL server is running! CORS limited to localhost:3000");
});

app.get("/me", async (_req, res) => {
  console.log("[REST] /api/randomnfact → executing schema directly");

  const query = `
    query {
      getRandomnfact {
        status
        user { email name stack }
        timestamp
        fact
      }
    }
  `;

  try {
    const result = await graphql({
      schema,
      source: query,
    });

    if (result.errors?.length) {
      console.error("[REST] GraphQL execution errors:", result.errors);
      return res.status(500).json(result.errors);
    }

    console.log("[REST] Success — returning GraphQL data");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(result.data.getRandomnfact);
  } catch (error) {
    console.error("[REST] Executable schema failed:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log("✅ CORS: Only http://localhost:3000 is permitted");
});
