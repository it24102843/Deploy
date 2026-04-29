import dns from "dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

import express from "express"; // Import Express framework for HTTP server routing
import dotenv from "dotenv"; // Import dotenv to load environment variables from .env file
import cors from "cors"; // Import CORS middleware to enable cross-origin requests
import mongoose from "mongoose"; // Import Mongoose for MongoDB object modeling
import itemRoutes from "./routes/itemRoutes.js"; // Import item-related API route handlers

dotenv.config(); // Load environment variables from .env into process.env

const app = express(); // Create an Express application instance

app.use(cors()); // Enable CORS for all routes to allow frontend access
app.use(express.json()); // Parse incoming JSON request bodies automatically

app.get("/", (req, res) => {
  // Respond to requests at the root path with a simple status message
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes); // Mount item routes at /api/items path

const PORT = process.env.PORT || 5000; // Use configured PORT or fall back to 5000

mongoose
  .connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from environment variables
  .then(() => {
    console.log("MongoDB connected"); // Log success when the database connection is established
    app.listen(PORT, () => {
      // Start the Express server once MongoDB is connected
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message); // Log any connection errors
    process.exit(1); // Exit the process with failure code if DB connection fails
  });