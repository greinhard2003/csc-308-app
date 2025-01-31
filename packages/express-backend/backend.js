import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// GET all users or filter by name/job
app.get("/users", async(req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  try {
    if (name && job) {
      const result = await userServices.findUserByNameAndJob(name, job);
      res.send({ users_list: result });
    } else if (name) {
      const result = await userServices.findUserByName(name);
      res.send({ users_list: result });
    } else if (job) {
      const result = await userServices.findUserByJob(job);
      res.send({ users_list: result });
    } else {
      const result = await userServices.getUsers();
      res.send({ users_list: result });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send("Internal Server Error");
  }
});

// GET user by ID
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userServices.findUserById(id);
    if (!user) {
      res.status(404).send({ message: `User with id ${id} not found.` });
    } else {
      res.send(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// POST a new user
app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  try {
    const newUser = await userServices.addUser(userToAdd);
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed to add user.");
  }
});

// DELETE user by ID
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userServices.findUserById(id);
    if (!user) {
      res.status(404).send({ message: `User with id ${id} not found.` });
    } else {
      await userServices.deleteUser(id);
      res.status(204).send(); // No content on successful deletion
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});