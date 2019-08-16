module.exports = {
  findResources
};

const express = require("express");

const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

function findResources() {
  return db("projects as p")
    .innerJoin("resources as r", "p.id", "r.id")
    .select("r.resource_name");
}

//  adding tasks.
//  retrieving a list of tasks. The list of tasks should include the project name and project description.
//  When returning project or task information, the completed property should be true or false.
