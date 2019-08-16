exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          project_name: "Pass the sprint",
          project_description: "build the tables",
          project_completed: false
        }
      ]);
    });
};
