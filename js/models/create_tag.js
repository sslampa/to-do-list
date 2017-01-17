// Creates a Tag object that holds an array of every task
// count and add() are used to add IDs to every new task
function createTag(name) {
  return {
    name: name,
    tasks: [],
    count: 0,
    add: function() {
      this.count++;
    }
  };
}

// Initializes "All" tag that holds every new task
var allTasks = new createTag("All");

// Initializes default tags
var allTags = [allTasks.name, "Studying", "Exercise", "Shopping"];
