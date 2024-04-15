const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      events: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

app.get("/event", async (req, res) => {
  const event = await prisma.event.findMany();
  res.json(event);
});

app.get("/event/:id", async (req, res) => {
  const { id } = req.params;
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!event) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(event);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
