import { Sequelize } from "sequelize-typescript";
import Content from "./models/Content.model";
import User from "./models/User.model";
import express, { Request, Response } from "express";
import cors from "cors";
import { ContentStatus } from "./enums/ContentStatus.enum";

const app = express();
const PORT = 4000;

//parse JSON file
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

// View content for user
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
      // Fetch content where userId matches the provided userId
      const content = await Content.findAll({
        where: {
          userId: userId,
        },
      });

      // Return the content or an empty array if no content found
      res.json(content);
    } catch (error) {
      console.error(error);
      res.status(500).json([]);
    }
  }
);

// Update content status
app.patch(
  "/content/:contentId/status",
  async (
    req: Request<{ contentId: number }, {}, { status: string }>,
    res: Response
  ) => {
    const { contentId } = req.params;
    const { status } = req.body;

    // Testing console.log to check contentId and status
    console.log(`content ID: ${contentId}, status: ${status}`);

    // Check status using the enum
    if (!Object.values(ContentStatus).includes(status as ContentStatus)) {
      return res.status(400).json({ message: "status is not valid" });
    }

    // Fetch content by ID
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ message: "content does not exist" });
    }

    // If the content is already approved, you can't change the status
    if (content.status === ContentStatus.APPROVED) {
      return res.status(400).json({
        message: "content is already approved, you can't change the status",
      });
    }

    // Update content status by casting the string to the ContentStatus enum
    await content.update({ status: status as ContentStatus });
    res.json({ message: "Status updated" });

    // For testing purposes: res.json can return received contentId and status
    // res.json({ message: `received contentId: ${contentId} with status: ${status}` });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
