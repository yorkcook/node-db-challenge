module.exports = {
  findResources,
  findTasks,
  getProjects
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
    .innerJoin("tasks as t", "p.id", "t.id")
    .select(
      "t.task_description",
      "t.project_completed",
      "p.project_name",
      "p.project_description"
    );
}

//  adding tasks.
//  retrieving a list of tasks. The list of tasks should include the project name and project description.
//  When returning project or task information, the completed property should be true or false.
