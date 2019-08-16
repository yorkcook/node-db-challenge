module.exports = {
  findResources,
  findTasks,
  getProjects,
  addTasks
};

const express = require("express");

const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

function getProjects() {
  return db("projects");
}

function findResources() {
  return db("projects as p")
    .innerJoin("resources as r", "p.id", "r.id")
    .select("r.resource_name");
}

function findTasks() {
  return db("projects as p")
    .innerJoin("tasks as t", "p.id", "t.project_id")
    .select(
      "t.task_description",
      "t.project_completed",
      "p.project_name",
      "p.project_description"
    );
}

// function addTasks() {
//   return db("projects as p")
//     .innerJoin("tasks as t", "p.id", "t.project_id")
//     .select("t.task_description", "p.id", "t.project_id");
// }

function addTasks(task) {
  return db("tasks").insert(task);
}
