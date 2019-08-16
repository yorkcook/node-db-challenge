const express = require("express");

const Projects = require("./project-model.js");

const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "No, no, no you don't get to see dem projects" });
    });
});

router.get("/tasks", (req, res) => {
  const task = req.params.id;
  db("projects")
    .findTasks(task)
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "No, no, no you don't get to see dem projects" });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  db("projects")
    .insert(project, "id")
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Nobody wants that kind of stinking project." });
    });
});

router.post("/resources", (req, res) => {
  const resource = req.body;
  db("resources")
    .insert(resource, "id")
    .then(resource => {
      res.status(200).json(resource);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Nobody wants that kind of stinking resource." });
    });
});

router.post("/tasks", (req, res) => {
  const task = req.body;
  db("tasks")
    .insert(task, "id")
    .then(task => {
      res.status(200).json(task);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Nobody wants that kind of stinking task." });
    });
});

router.get("/resources", async (req, res) => {
  //const { id } = req.params;

  try {
    const resources = await Projects.findResources();

    if (resources.length) {
      res.json(resources);
    } else {
      res
        .status(404)
        .json({ message: "Could not find steps for given scheme" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get steps" });
  }
});

// router.get("/tasks", async (req, res) => {
//   //const { id } = req.params;

//   try {
//     const tasks = await Projects;

//     if (tasks) {
//       res.json(tasks);
//     } else {
//       res
//         .status(404)
//         .json({ message: "Could not find steps for given scheme" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get steps" });
//   }
// });

module.exports = router;
