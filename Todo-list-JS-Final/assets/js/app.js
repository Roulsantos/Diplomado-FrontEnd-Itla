const taskList = document.getElementById('task-list');
const checkList = document.getElementById('checked-list');

eventListeners();

function eventListeners() {

    document.querySelector('#form').addEventListener('submit', newTask);


    taskList.addEventListener('click', completeTask);


    taskList.addEventListener('click', removeTask);


    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

function newTask(e) {
    e.preventDefault();



    const task = document.getElementById('addtask').value;


    const checkBtn = document.createElement('a');
    checkBtn.classList = 'checked-task';
    checkBtn.textContent = '✓';


    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-task';
    removeBtn.textContent = 'X';


    const li = document.createElement('li');
    li.textContent = task;



    li.appendChild(removeBtn);

    li.appendChild(checkBtn);


    taskList.appendChild(li);


    addTaskLocalStorage(task);


    alert('Tarea Agregada');

    this.reset();
}


function removeTask(e) {
    if (e.target.classList.contains('remove-task')) {
        e.target.parentElement.remove();
    }


    removeTaskLocalStorage(e.target.parentElement.textContent);
}

function addTaskLocalStorage(task) {
    let tasks = getTaskFromStorage();


    tasks.push(task);


    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskFromStorage() {
    let tasks;
    const tasksLS = localStorage.getItem('tasks');

    if (tasksLS === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasksLS);
    }
    return tasks;
}


function localStorageOnLoad() {
    let tasks = getTaskFromStorage();


    tasks.forEach(function(task) {

        const checkBtn = document.createElement('a');
        checkBtn.classList = 'checked-task';
        checkBtn.textContent = '✓';


        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-task';
        removeBtn.textContent = 'X';



        const li = document.createElement('li');
        li.textContent = task;


        li.appendChild(removeBtn);

        li.appendChild(checkBtn);


        taskList.appendChild(li);
    });
}



function removeTaskLocalStorage(task) {

    let tasks = getTaskFromStorage();



    const taskDelete = task.substring(0, task.length - 1);

    tasks.forEach(function(taskLS, index) {
        if (taskDelete === taskLS) {
            tasks.splice(index, 1);
        }
    });


    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function completeTask(e) {
    if (e.target.classList.contains('checked-task')) {
        let taskText = e.target.parentElement.textContent;
        let taskDone = taskText.substring(0, taskText.length - 2);

        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-task';
        removeBtn.textContent = 'X';


        //crear <li>
        const li = document.createElement('li');
        li.textContent = taskDone;


        li.appendChild(removeBtn);


        //agrregar a list
        checkList.appendChild(li);
        checkList.classList = 'complete-task';

        //remover de  todo list
        e.target.parentElement.remove();

        //remover de  Storage 
        removeTaskLocalStorage(e.target.parentElement.textContent);

    }
}