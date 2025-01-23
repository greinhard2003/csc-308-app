// backend.js
import express, { json } from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const generateId = () => {
  return Math.random().toString();
};

const addUser = (user) => {
  user.id = generateId();
  users["users_list"].push(user);
  return user;
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJobAndName = (job, name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.use(cors());

app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (job != undefined && name != undefined) {
    let result = findUserByJobAndName(job, name);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  console.log("DELETE request received for ID:", req.params.id);
  const userid = req.params.id;
  const userIndex = users.users_list.findIndex((user) => user.id === userid);

  if (userIndex !== -1) {
    users.users_list.splice(userIndex, 1); 
    console.log(`User with ID ${userid} deleted.`);
    res.status(204).send(); 
  } else {
    console.log(`User with ID ${userid} not found.`);
    res.status(404).send({ message: `User with id ${userid} not found.` });
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
