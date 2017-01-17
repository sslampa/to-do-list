$(document).ready(function() {

  // Adds all tags for sorting at the start
  // Has default tags of "All", "Studying", "Exercise", and "Shopping"
  sort_tags(".sort", allTags)

  // Filters the listings based on what tag was clicked
  $('.sort').on("click", ".sort-tags", function() {
    var sortBy = $(this).text();
    var toSort = [];

    // Finds all tasks that have the clicked tag
    toSort = allTasks.tasks.filter(function(task) {
      return task.tags.includes(sortBy);
    })

    // Clears div.list to show filtered listings
    $('.task-list').empty();

    // Shows all tasks for given tag
    toSort.forEach(function(e) {
      // Function, show_task(), found in add_task.js
      show_task(e.title, e.desc, e.date, e.time, e.tags, e.id);
    })
  })
});

// Adds sort tags to given div.className
function sort_tags(className, allTags) {
  allTags.forEach(function(e) {
    $(className).append("<button class='sort-tags btn btn-default'>" + e + "</button>");
  })
}
