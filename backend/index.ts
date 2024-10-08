import { Sequelize } from "sequelize-typescript";
import Content from "./models/Content.model";
import User from "./models/User.model";
import express, { Request, Response } from "express";
import cors from "cors";
import { ContentStatus } from "./enums/ContentStatus.enum";

const app = express();
const PORT = 4000;

// Enable JSON parsing for incoming requests
// This function allows to work with JSON data in the routes, API and database
app.use(express.json());

const sequelize = new Sequelize("HFC", "root", "HFC2023", {
  host: "35.239.125.245",
  dialect: "mysql",
});

sequelize.addModels([User, Content]);

// Create table if not exists
sequelize.sync();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Add this route for testing
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running" });
});

// Get users route
app.get("/users", async (req: Request, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Route to get content for a specific user
// This is used to display a user's content on their card/profile
// req.params is used to get the userId from the URL
// res.json is used to send the content as a JSON response
app.get(
  "/content/:userId",
  async (
    req: Request<{
      userId: number;
    }>,
    res: Response<
      {
        id: number;
        url: string;
        status: string;
        userId: number;
      }[]
    >
  ) => {
    const userId = req.params["userId"];

    try {
      // Find all content associated with this user
      // findAll() is a method that finds all records that match the criteria
      // where is used to specify the criteria
      // userId is the criteria
      // userId is the foreign key in the Content model that references the User model
      const content = await Content.findAll({
        where: {
          userId: userId,
        },
      });

      // Return the content or an empty array if no content found
      // content is the array of content that matches the criteria
      // If no content is found, return an empty array
      // If something goes wrong, send back an empty array
      // res.json is used to send the content as a JSON response
      res.json(content);
    } catch (error) {
      console.error(error);
      res.status(500).json([]);
    }
  }
);

// Route to update the status of a piece of content
// This is used when moderators approve or reject content
// req.params is used to get the contentId from the URL
// req.body is used to get the status from the body of the request
// res.json is used to send the content as a JSON response
app.patch(
  "/content/:contentId/status",
  async (
    req: Request<{ contentId: number }, {}, { status: string }>,
    res: Response
  ) => {
    const { contentId } = req.params;
    const { status } = req.body;

    console.log(`Attempting to update content ${contentId} to status ${status}`);

    // Check if the provided status is valid
    if (!Object.values(ContentStatus).includes(status as ContentStatus)) {
      console.log(`Invalid status: ${status}`);
      return res.status(400).json({ message: "status is not valid" });
    }

    // Fetch content by ID
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ message: "content does not exist" });
    }

    console.log("Current content status:", content.status);
    console.log("Requested status:", status);

    // Update content status
    await content.update({ status: status as ContentStatus });
    
    console.log("Updated content status:", content.status);
    res.json({ message: "status updated" });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
