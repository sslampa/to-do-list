$(document).ready(function() {

  // Adds all tags to form field area at the start
  add_tags(".tags", allTags);

  // Adds newly created tags to both the add tasks and listings areas
  $(".submit-tag").on("click", function() {
    var newTag = [$(".add-tag").val()];

    if ((newTag !== null) && (newTag != "") && (!allTags.includes(newTag[0]))) {
      add_tags(".tags", newTag);
      allTags.push(newTag[0]);
      $(".sort").empty();
      sort_tags(".sort", allTags);
      $(".add-tag").val("");
    }
  })

  // Adds task to the allTasks array and shows in listings
  $(".submit-task").on("click", function() {
    var title = $('.add-title').val();
    var desc = $('.add-desc').val();
    var date = $('.add-date').val();
    var time = $('.add-time').val();
    var tags = ["All"]; // Every task given "All" tag

    // Gets all tags to add to new task
    $('input[name="tags"]:checked').each(function() {
      tags.push($(this).val());
    })

    // Returns true/false based on if the given values are valid
    var valid_d = validate_date(date);
    var valid_t = validate_time(time);

    // Either alerts the user of invalid date/time or adds a new task
    // Possible feature: Add to actual page instead of alerts
    if (!valid_d.pass && !valid_t.pass) {
      alert(valid_t.message);
      alert(valid_t.message);
    } else {
      $(".add-title").val("");
      $(".add-desc").val("");
      //$(".add-date").val("");
      //$(".add-time").val("");
      add_task(title, desc, date, time, tags);
    }
  })

  // Shows form fields
  $(".add-task").on("click", function() {
    $(".add-open").slideToggle();
  })

  // Toggles the task title to reveal task information
  $(".task-list").on("click", ".open", function() {
    $(this).next('.to-close').slideToggle()
  })

}); // End $(document).ready

// Adds tags to the form field area
function add_tags(className, allTags) {
  allTags.forEach(function(e) {
    if (e !== "All") {
      $(className).prepend("<label>" + e + "</label>")
      $(className).prepend("<input name='tags' type='checkbox' value='" + e + "'>")
    }
  })
}

// Show tasks in listing area
function show_task(title, desc, date, time, tags, id) {
  $(".task-list").append("<div class='listings' id='all-" + id.toString() + "'></div>");
  $("#all-" + id.toString()).append("<h1 class='open text-center'>" + title + "</h1>");
  $("#all-" + id.toString()).append("<div class='to-close'></div>");
  $("#all-" + id.toString() + " .to-close").append("<h4>Task:</h4>");
  $("#all-" + id.toString() + " .to-close").append("<p>" + title + "</p>");
  $("#all-" + id.toString() + " .to-close").append("<h4>Description:</h4>");
  $("#all-" + id.toString() + " .to-close").append("<p>" + desc + "</p>");
  $("#all-" + id.toString() + " .to-close").append("<h4>End:</h4>");
  $("#all-" + id.toString() + " .to-close").append("<p>" + date + " " + time + "</p>");
  $("#all-" + id.toString() + " .to-close")
    .append("<button class='remove btn btn-danger'>Remove</button>");
}

// Adds to list allTasks array
function add_task(title, desc, date, time, tags) {
  var newTask = new createTask(title, desc, date, time, tags, allTasks.count);
  allTasks.tasks.push(newTask);
  show_task(title, desc, date, time, tags, newTask.id);
  allTasks.add();
}

// Validates time
// Tests:
// console.log(validate_time("03:30")); //true
// console.log(validate_time("3:30"));
// console.log(validate_time("25:01"));
// console.log(validate_time("00:00")); //true
function validate_time(time) {
  var regex = /[0-9]{2}:[0-9]{2}/;

  if (time.match(regex) === null) {
    return {pass: false, message: "Wrong format"};
  }

  // Validates hour portion
  var timeSplit = time.split(":");
  if (parseInt(timeSplit[0]) > 24 || parseInt(timeSplit[0]) < 0) {
    return {pass: false, message: "Hour not in range"};
  }

  // Validates minutes portion
  if (parseInt(timeSplit[1]) > 59 || parseInt(timeSplit[1]) < 0) {
    return {pass: false, message: "Minutes not in range"};
  }

  return {pass: true, message: "Success!"};
}

// Validates date
// Tests:
// console.log(validate_date("03/03/2019")); // true
// console.log(validate_date("3/03/2016"));
// console.log(validate_date("03/3/2016"));
// console.log(validate_date("03/03/16"));
// console.log(validate_date("15/03/2016"));
// console.log(validate_date("00/03/2016"));
// console.log(validate_date("02/30/2016"));
// console.log(validate_date("02/28/2019")); //true
// console.log(validate_date("02/29/2015"));
// console.log(validate_date("01/32/2017"));
// console.log(validate_date("01/15/2017")); //true
// console.log(validate_date("04/31/2017"));
// console.log(validate_date("04/30/2017")); //true
// console.log(validate_date("01/01/2020")); //true
// console.log(validate_date("01/01/2006"));
function validate_date(date) {
  var regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
  if (date.match(regex) === null) {
    return {pass: false, message: "Wrong format"};
  }


  // Validates if month is between 1 and 12 months inclusive
  var dateSplit = date.split('/');
  if (parseInt(dateSplit[0]) <= 0 || parseInt(dateSplit[0]) > 12) {
    return {pass: false, message: "Month not in range"};
  }

  // Validates if there are correct amount of days in months
  // Takes into account leap years for February
  var longMonths = ["01", "03", "05", "07", "08", "10", "12"];
  if (dateSplit[0] === "02") {
    if ((parseInt(dateSplit[2]) % 4 === 0) &&
        ((parseInt(dateSplit[1]) > 29) ||
        (parseInt(dateSplit[1]) <= 0))) {
          return {pass: false, message: "Day not in range"};
    } else if (parseInt(dateSplit[1]) > 28 || parseInt(dateSplit[1] <= 0)) {
      return {pass: false, message: "Day not in range"};
    }
  } else if (longMonths.includes(dateSplit[0])) {
    if (parseInt(dateSplit[1]) > 31 || parseInt(dateSplit[1]) < 0) {
      return {pass: false, message: "Day not in range"};
    }
  } else {
    if (parseInt(dateSplit[1]) > 30 || parseInt(dateSplit[1]) < 0) {
      return {pass: false, message: "Day not in range"};
    }
  }

  // Validates if the year is now or in the future
  var now = new Date();
  if (dateSplit[2] < now.getFullYear()) {
    return {pass: false, message: "Year not in range"};
  }

  return {pass: true, message: "Success!"};
}
