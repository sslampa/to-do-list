$(document).ready(function() {

  // On click, changes the clicked task's information to show edit forms
  $(".task-list").on("click", ".edit", function() {
    var currentId = $(this).parent().parent().attr("id");
    var idToEdit = parseInt(currentId.split("-")[1]);

    // Finds the index of the current task in the allTasks array
    var index = allTasks.tasks.findIndex(function(e) {
      return e.id === idToEdit;
    });
    var currentTask = allTasks.tasks[index];

    // Hides the clicked task's information and shows edit forms
    $(this).parent().children().hide();
    show_edit(currentId, currentTask.title, currentTask.desc,
      currentTask.endDate, currentTask.endTime);
  })

  // Edits task in the allTasks array and then updates it in the view
  $(".task-list").on("click", ".submit-edit", function() {
    var title = $('.edit-title').val();
    var desc = $('.edit-desc').val();
    var date = $('.edit-date').val();
    var time = $('.edit-time').val();
    var id = $('.edit-id').val();

    // Returns true/false based on if the given values are valid
    var valid_d = validate_date(date);
    var valid_t = validate_time(time);

    // Either alerts the user of invalid date/time or edits/shows the edited task
    if (!valid_d.pass || !valid_t.pass) {
      if (!valid_d.pass) {
        alert(valid_d.message);
      }

      if (!valid_t.pass) {
        alert(valid_t.message);
      }
    } else {
      // Updates the view
      edit_task(id, title, desc, date, time);
      edit_list(id, title, desc, date, time);
      $(this).parent().parent().children().show();
      $(this).parent().empty();
    }
  })
})

function show_edit(id, title, desc, date, time) {
  $("#" + id + " .to-close").append("<div class='edit-input input-group'></div>");
  $("#" + id + " .edit-input")
    .append("<input class='edit-title' type='text' placeholder='Title' value='" + title + "'>");
  $("#" + id + " .edit-input").append("<input class='edit-desc' type='text' placeholder='Description' value='" + desc + "'>");
  $("#" + id + " .edit-input").append("<input class='edit-date' type='text' placeholder='Ex. 01/31/2017' value='" + date + "'>");
  $("#" + id + " .edit-input").append("<input class='edit-time' type='text' placeholder='Ex. 15:30' value='" + time + "'>");
  $("#" + id + " .edit-input").append("<input class='edit-id' type='hidden' value='" + id.split("-")[1] + "'>");
  $("#" + id + " .edit-input").append("<button class='submit-edit btn btn-default btn-sm'>Save</button>");
}

function edit_task(id, title, desc, date, time) {
  var index = allTasks.tasks.findIndex(function(e) {
    return e.id === parseInt(id);
  })
  var editTask = allTasks.tasks[index];
  editTask.title = title;
  editTask.desc = desc;
  editTask.endDate = date;
  editTask.endTime = time;
}

function edit_list(id, title, desc, date, time) {
  $("#all-" + id + " .show-title").text(title);
  $("#all-" + id + " .show-desc").text(desc);
  $("#all-" + id + " .show-end").text(date + " " + time);
  $("#all-" + id + " button.open h2").text(title);
}
