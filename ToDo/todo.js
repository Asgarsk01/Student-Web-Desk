document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const filterSelect = document.getElementById('filterSelect');

  // Load tasks from local storage
  loadTasks();

  addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
      const task = {
        text: taskText,
        date: new Date().toLocaleString()
      };

      // Add task to local storage
      saveTask(task);

      // Add task to the list
      addTaskToList(task);

      // Clear input field
      taskInput.value = '';
    }
  });

  taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      const taskItem = e.target.parentNode;
      const taskIndex = Array.from(taskList.children).indexOf(taskItem);

      // Remove task from local storage
      removeTask(taskIndex);

      // Remove task from the list
      taskItem.remove();
    }
  });

  filterSelect.addEventListener('change', function() {
    const filterValue = filterSelect.value;

    // Clear task list
    taskList.innerHTML = '';

    // Load tasks based on selected filter
    loadTasks(filterValue);
  });

  function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.text}
      <span class="task-date">${task.date}</span>
      <button class="delete-btn"></button>
    `;
    taskList.appendChild(li);
  }

  function loadTasks(filter = 'all') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(task) {
      if (filter === 'all' || isTaskWithinFilter(task, filter)) {
        addTaskToList(task);
      }
    });
  }

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function isTaskWithinFilter(task, filter) {
    const currentDate = new Date();
    const taskDate = new Date(task.date);

    switch (filter) {
      case 'today':
        return taskDate.toDateString() === currentDate.toDateString();
      case 'this-week':
        const startOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay()
        );
        return taskDate >= startOfWeek;
      case 'this-month':
        return (
          taskDate.getFullYear() === currentDate.getFullYear() &&
          taskDate.getMonth() === currentDate.getMonth()
        );
      default:
        return true;
    }
  }
});
