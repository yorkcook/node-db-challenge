exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          task_description: "Please do the work",
          notes: "I will buy you ice cream",
          project_id: 1,
          project_completed: false
        }
      ]);
    });
};
