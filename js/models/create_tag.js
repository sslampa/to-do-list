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

var allTasks = new createTag("All");
var allTags = [allTasks.name, "Xavier", "baag"];
