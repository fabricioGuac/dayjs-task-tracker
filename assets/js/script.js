// Retrieve tasks and nextId from localStorage and uses the or operator to set  taskList to an empty array and nextId to 1 if the local storage is empty
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;



function generateTaskId() {
  // Increases the value of nextId by one
  nextId++
  // Uptdates the local storage to the new value
  localStorage.setItem('nextId',nextId);
  // Returns the value of nextId in a string form to ensure consistency in data type when dealing with localStorage
  return nextId.toString()
}


function createTaskCard(task) {
// Creates a div using jquery
  const taskCard = $('<div>')
  // Adds the Bootstrap card class to make it a flexible container, the task-class for css, the draggable class for the draggable method and Bootstrap margin in the y axis 
  .addClass('card task-card draggable my-3')
  // Sets the card id
  .attr('data-task-id', task.id);
  // Creates a div with the Bootstrap classes card-header and h4 to be applied to the text that would be the current task title
const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
// Creates a div with the class card-body that is the common bootstrap class to contain the primary contents of a card
const cardBody = $('<div>').addClass('card-body');
//  Creates a p element containing the value of the current task description
const cardDescription = $('<p>').addClass('card-text').text(task.Description);
// Creates another p element with the value of the current dueDate
const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
// Creates a button with Bootstrap btn class and btn-danger makes it red, text saying delete and assigns it the id of the current task
const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger')
  .text('Delete')
  .attr('data-task-id', task.id);
cardDeleteBtn.on('click', handleDeleteTask);

// If the done status is not done applies the following logic
if (task.statusbar !== 'done') {
  // Sets the curent date in now using dayjs 
  const now = dayjs();
  // Sets the due date as days and month in two digits and year in four
  const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

// If now is the same date as the due date adds the classes bg-warning and text-white for a yellow background and withe text
  if (now.isSame(taskDueDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
    // If now is after the due date it add the classes bg-danger and text-white for a red background, withe text and changes the border of the delete btn to a light gray color
  } else if (now.isAfter(taskDueDate)) {
    taskCard.addClass('bg-danger text-white');
    cardDeleteBtn.addClass('border-light');
  }
}

// Appends the contents to the body
cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
// Appends the header and body to the main card div
taskCard.append(cardHeader, cardBody);
// Returns the complete task card
return taskCard;
}


function renderTaskList() {
  // Sets the divs where ther task-cards well be appended into  jquery elements and empties them to avoid repetition
  const todo = $('#todo-cards');
  todo.empty()
  const progress = $('#in-progress-cards');
  progress.empty();
  const done = $('#done-cards');
  done.empty();
// Uses a  forof loop to iterate over the taskList and appends the elements to the divs that matches the statusbar
  for (let task of taskList) {
    if (task.statusbar === 'to-do') {
      todo.append(createTaskCard(task));
    } else if (task.statusbar === 'in-progress') {
   progress.append(createTaskCard(task));
    } else if (task.statusbar === 'done') {
      done.append(createTaskCard(task));
    }
  } 
  // Saves the changes in taskList to the localstorage
    localStorage.setItem('tasks', JSON.stringify(taskList))
  // Uses the method .draggable to make cards draggable and uses aditional options to reduce opacity while dragging and to keep it on top of other elements 
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex:100,
  })
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  // Prevents the page from reloading after the form is submited 
  event.preventDefault();
// Gets the values from the form and uses the trim method to eliminate the spaces before and after the content
  const taskTitle = $('#TaskTitle').val().trim();
  const DueDate = $('#TaskDueDate').val();
  const TaskDescription = $('#Description').val().trim();
// Creates an object in the var newTask using the values from the form, an id using the generateTaskId function and sets the status to a default to-do 
  const newTask = {
    id:generateTaskId(),
    title: taskTitle,
    dueDate: DueDate,
    Description: TaskDescription,
    statusbar: 'to-do'
  }
  // Pushes the newTask object to the taskList
  taskList.push(newTask)
// Clears the form
  $('#TaskTitle').val('');
  $('#TaskDueDate').val('');
  $('#Description').val('')
  // Hides the modal
  $('#formModal').modal('hide');
  // Updates the displayed task-cards 
  renderTaskList()
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  // Retrieves the id of the event target
  const deltarget = ($(event.target).attr('data-task-id'));
  // Uses the filter method to create a new array excluding the object that matches the id 
  const newTaskList = taskList.filter(task => task.id !==deltarget)
  // Sets the value of the taskList to the contents of the array exluding the element to delete
  taskList = newTaskList
  // Updates the displayed task-cards
  renderTaskList()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Gets the id of the dragged item
  const cardstatus = $(ui.draggable[0]).attr('data-task-id');
  // Gets the ide of the target status line 
  const lineStatus =event.target.id;
  // Loops through the taskList to find a task with a matching id and update it's status
  taskList.forEach(task => {
    if(task.id === cardstatus){
      task.statusbar = lineStatus
    }
    // Updates the displayed task-cards after each status update
    renderTaskList()
  });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  //Render task list when the page loads
  renderTaskList();

  // Presents a caledar to pick the date
  $('#TaskDueDate').datepicker({
      changeMonth: true,
      changeYear: true,
    });

  // Makes lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  })
});
