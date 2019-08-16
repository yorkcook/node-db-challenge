exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .string("project_name", 255)
        .notNullable()
        .unique();
      tbl.string("project_description", 255);
      tbl
        .boolean("project_completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .string("resource_name", 255)
        .notNullable()
        .unique();
      tbl.string("resource_description", 255);
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl
        .string("task_description", 255)
        .notNullable()
        .unique();
      tbl.string("notes", 255);
      tbl.integer("project_id").notNullable();
      tbl
        .boolean("project_completed")
        .notNullable()
        .defaultTo(false);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
