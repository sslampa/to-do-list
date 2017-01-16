/*
** Purpose: Create a Task object
** title: String - Title of task
** desc: String - Description of task
** endDate: String - End Date of task
** endTime: String - End Time of task
** complete: Boolean - Whether task is completed or not
** tags: [String] - Which groups task is a part of
*/

function createTask(newTitle, newDesc, newEndDate, newEndTime, newComplete, newTags) {
  return {
    title: newTitle,
    desc: newDesc,
    endDate: newEndDate,
    complete: newComplete,
    tags: newTags
  };
}
