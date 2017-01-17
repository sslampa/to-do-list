$(document).ready(function() {

  // Removes task from listing view and allTasks array
  $(".task-list").on("click", ".remove", function() {
    var currentId = $(this).parent().parent().attr('id');
    var idToRemove = parseInt(currentId.split("-")[1]);

    // Searches for the index of task in allTasks array
    var index = allTasks.tasks.findIndex(function(e) {
      return e.id === idToRemove;
    });

    // Removes task from allTasks array
    allTasks.tasks.splice(index, 1);

    // Removes task from listing area
    $("#" + currentId).empty();
    $("#" + currentId).remove();
  })
})
