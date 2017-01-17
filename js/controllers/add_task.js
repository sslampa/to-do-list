$(document).ready(function() {

  // At the beginning
  add_tags(".tags", allTags);

  $(".submit-tag").on("click", function() {
    var newTag = [$(".add-tag").val()];
    console.log(newTag);
    if ((newTag !== null) && (newTag != "") && (!allTags.includes(newTag[0]))) {
      add_tags(".tags", newTag);
      allTags.push(newTag[0]);
    }
  })
  
  // Data can be saved
  $(".submit-task").on("click", function() {
    var title = $('.add-title').val();
    var desc = $('.add-desc').val();
    var date = $('.add-date').val();
    var time = $('.add-time').val();
    var tags = ["All"];
    $('input[name="tags"]:checked').each(function() {
      tags.push($(this).val());
    })

    console.log(tags);

    valid_d = validate_date(date);
    valid_t = validate_time(time);

    if (!valid_d.pass && !valid_t.pass) {
      console.log(valid_d.message);
      console.log(valid_t.message);
    } else {
      $(".add-title").val("");
      $(".add-desc").val("");
      //$(".add-date").val("");
      //$(".add-time").val("");
      add_task(title, desc, date, time, tags);
      console.log(allTasks.count);
      console.log(valid_d.message);
      console.log(valid_t.message);
      console.log(allTasks.tasks);
    }
    console.log(title);
    console.log(desc);
    console.log(date);
    console.log(time);
  })

  // Shows form field
  $(".add-task").on("click", function() {
    $(".add-open").slideToggle();
  })

  // Dynamically creates things magically
  $(".list").on("click", ".open", function() {
    $(this).next('.to-close').slideToggle()
  })
});

// Adds tags to the right place
function add_tags(className, allTags) {
  allTags.forEach(function(e) {
    if (e !== "All") {
      $(className).prepend("<label>" + e + "</label>")
      $(className).prepend("<input name='tags' type='checkbox' value='" + e + "'>")
    }
  })
}

// Show tasks in list
function show_task(title, desc, date, time, tags, id) {
  $(".list").append("<div class='listings' id='all-" + id.toString() + "'></div>");
  $("#all-" + id.toString()).append("<h1 class='open'>" + title + "</h1>");
  $("#all-" + id.toString()).append("<p class='to-close'>" + desc + "</p>");
  $("#all-" + id.toString()).append("<button class='remove'>Remove</button>")
}

// Adds to list
function add_task(title, desc, date, time, tags) {
  var newTask = new createTask(title, desc, date, time, tags, allTasks.count);
  allTasks.tasks.push(newTask);
  show_task(title, desc, date, time, tags, newTask.id);
  allTasks.add();
}

// Validates time
function validate_time(time) {
  var regex = /[0-9]{2}:[0-9]{2}/;
  if (time.match(regex) === null) {
    return {pass: false, message: "Wrong format"};
  }

  timeSplit = time.split(":");
  if (parseInt(timeSplit[0]) > 24 || parseInt(timeSplit[0]) < 0) {
    return {pass: false, message: "Hour not in range"};
  }

  if (parseInt(timeSplit[1]) > 59 || parseInt(timeSplit[1]) < 0) {
    return {pass: false, message: "Minutes not in range"};
  }

  return {pass: true, message: "Success!"};
}

// console.log(validate_time("03:30")); //true
// console.log(validate_time("3:30"));
// console.log(validate_time("25:01"));
// console.log(validate_time("00:00")); //true

// Validates date
function validate_date(date) {
  var regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
  if (date.match(regex) === null) {
    return {pass: false, message: "Wrong format"};
  }

  dateSplit = date.split('/');
  if (parseInt(dateSplit[0]) <= 0 || parseInt(dateSplit[0]) > 12) {
    return {pass: false, message: "Month not in range"};
  }

  longMonths = ["01", "03", "05", "07", "08", "10", "12"];
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

  now = new Date();
  if (dateSplit[2] < now.getFullYear()) {
    return {pass: false, message: "Year not in range"};
  }

  return {pass: true, message: "Success!"};
}

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
