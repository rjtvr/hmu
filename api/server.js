import Fastify from "fastify";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const fastify = Fastify({ logger: true });

// Connect to MongoDB
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("rajatdb"); // replace with your db name
const users = db.collection("users");

// Example route
fastify.get("/users", async () => {
  return await users.find().toArray();
});

fastify.post("/users", async (req, reply) => {
  const { name, email } = req.body;
  const result = await users.insertOne({ name, email });
  return { id: result.insertedId };
});

// Start server
fastify.listen({ port: process.env.API_PORT }, (err, address) => {
  if (err) throw err;
  fastify.log.info(`Server running at ${address}`);
});
