const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await prisma.user.findFirst({ 
        where: {
          id: 2
        }, select: {
            name: true,
            email: true,
            event: true
      }
  });
  res.json(users);
});


app.get('/event', async (req, res) => {
    const event = await prisma.event.findMany();
    res.json(event);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
