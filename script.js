document.addEventListener('DOMContentLoaded', () => {
  const todoinput = document.getElementById("todo-input");
  const addtaskbtn = document.getElementById("add-task-button");
  const todolist = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('task')) || [];

  tasks.forEach(task => renderTask(task));

  addtaskbtn.addEventListener(`click`, () => {
    const tasktxt = todoinput.value.trim();
    if (tasktxt === "") {
      alert("No task entered");
      return;
    }

    const newtask = {
      id: Date.now(),
      text: tasktxt,
      completed: false
    };
    tasks.push(newtask);
    saveTask();
    renderTask(newtask);
    todoinput.value = "";
    console.log(tasks);
  });

  function renderTask(taskObj) {
    const li = document.createElement(`li`);
    li.setAttribute('data-id', taskObj.id);
    li.className = "flex justify-between items-center px-4 py-3 rounded-md hover:bg-gray-100 transition";
    if (taskObj.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="flex items-center gap-3">
        <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500" ${taskObj.completed ? "checked" : ""} />
        <span class="text-lg">${taskObj.text}</span>
      </div>
      <button class="text-gray-400 hover:text-red-500 transition">✖</button>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      taskObj.completed = checkbox.checked;
      li.classList.toggle('completed', taskObj.completed);
      saveTask();
    });

    li.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== taskObj.id);
      li.remove();
      saveTask();
    });

    todolist.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem('task', JSON.stringify(tasks));
  }
});
