const express = require("express");

const Projects = require("./project-model.js");

const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.getProjects();
    projects.map(projects => {
      projects.project_completed == 0
        ? (projects.project_completed = "false")
        : (projects.project_completed = "true");
    });
    if (projects) {
      res.json(projects);
    } else {
      res
        .status(404)
        .json({ message: "Could not find steps for given scheme" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get steps" });
  }
});

// router.get("/", (req, res) => {
//   db("projects")
//     .then(projects => {
//         projects.map(projects => {
//       projects.project_completed == 0
//         ? (projects.project_completed = "false")
//         : (projects.project_completed = "true");
//       res.status(200).json(projects);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ message: "No, no, no you don't get to see dem projects" });
//     });
// });

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

router.get("/resources", async (req, res) => {
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

// router.get("/tasks", (req, res) => {
//   const task = req.params.id;
//   db("tasks")
//     //Projects.findTasks()
//     .then(tasks => {
//       res.status(200).json(tasks);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ message: "No, no, no you don't get to see dem projects" });
//     });
// });

router.get("/tasks", async (req, res) => {
  try {
    const task = await Projects.findTasks();
    task.map(task => {
      task.project_completed == 0
        ? (task.project_completed = "false")
        : (task.project_completed = "true");
    });
    if (task) {
      res.json(task);
    } else {
      res
        .status(404)
        .json({ message: "Could not find steps for given scheme" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get steps" });
  }
});

module.exports = router;
