$(document).ready(function() {
  $(".list").on("click", ".remove", function() {
    var currentId = $(this).parent().attr('id');
    var idToRemove = parseInt(currentId.split("-")[1]);
    var index = allTasks.tasks.findIndex(function(e) {
      return e.id === idToRemove;
    });

    // Removes task from all tasks
    allTasks.tasks.splice(index, 1);

    $("#" + currentId).empty();
    $("#" + currentId).remove();
  })
})
