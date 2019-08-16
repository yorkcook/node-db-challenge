module.exports = {};

const express = require("express");

const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);
