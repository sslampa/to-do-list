$(document).ready(function() {
  var test = []

  // Shows fullscreen form to add task
  $(".add-task").on("click", function() {
    $("#add").css("height", "100%");
  });

  // Closes fullscreen form to add task
  $(".close-task").on("click", function() {
    $("#add").css("height", "0%");
  });

  // Data can be saved
  $(".submit").on("click", function() {
    var title = $('.add-title').val();
    var desc = $('.add-desc').val();
    var date = $('.add-date').val();
    var time = $('.add-time').val()
    valid_d = validate_date(date);
    if (valid_d.pass) {
      alert(valid_d.message);
    } else {
      alert(valid_d.message);
    }
    console.log(title);
    console.log(desc);
    console.log(date);
    console.log(time);
  })
});

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

  return {pass: true, message: "Success"};
}

// console.log(validate_time("03:30")); //true
// console.log(validate_time("3:30"));
// console.log(validate_time("25:01"));
// console.log(validate_time("00:00")); //true


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
