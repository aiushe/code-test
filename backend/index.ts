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

    const content = await Content.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(content);
  }
);

// Update content status
app.put(
  "/content/:contentId/status",
  async (
    req: Request<{ contentId: number }>,
    res: Response<{ message: string }>
  ) => {
    const contentId = req.params["contentId"];
    const { status } = req.body;

    //testing console.log(`content ID: ${contentId}, status: ${status}`);
    // Check status using the enum
    if (!Object.values(ContentStatus).includes(status)) {
      return res.status(400).json({ message: "status is not valid" });
    }

    // If the status is not valid, return 400 status code
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ message: "content does not exist" });
    }

    // If the content is already approved, you can't change the status, return 400 status code  
    if (content.status === ContentStatus.APPROVED) {
      return res.status(400).json({ message: "content is already approved, you can't change the status" });
    }

    // Update status
    await content.update({ status });
    res.json({ message: "Status updated" });
    //test json res.json({ message: `received contentId: ${contentId} with status: ${status}` });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
