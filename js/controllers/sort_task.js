$(document).ready(function() {
  sort_tags(".sort", allTags)

  $('.sort').on("click", ".sort-tags", function() {
    var sortBy = $(this).text();
    var toSort = [];

    toSort = allTasks.tasks.filter(function(task) {
      return task.tags.includes(sortBy);
    })

    $('.list').empty();

    console.log(toSort);
    var z = 0;
    toSort.forEach(function(e) {
      show_task(e.title, e.desc, e.date, e.time, e.tags, e.id);
      console.log(z++);
    })
  })
});

function sort_tags(className, allTags) {
  allTags.forEach(function(e) {
    $(className).append("<button class='sort-tags'>" + e + "</button>");
  })
}
