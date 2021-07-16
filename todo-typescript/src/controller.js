var obj = {
    lists: [],
    add: function (task, completed) {
        this.lists.push({ task: task, completed: completed });
    },
    "delete": function (name) {
        this.lists = this.lists.filter(function (list) { return list['task'] !== name ? list : false; });
    },
    update: function (name, updatedValue) {
        this.lists = this.lists.map(function (list) {
            if (list['task'] === name) {
                return list = {
                    task: updatedValue['newTask']
                };
            }
            else
                return list;
        });
    }
};
// Variables
var flag = {
    isLogin: false
}, loginBtn = document.querySelector('#btnLogin');
var oldValue;
loginBtn.addEventListener('click', function () {
    if (!flag.isLogin) {
        flag.isLogin = true;
        showAddTaskBox();
        loginBtn.textContent = 'LOGOUT';
        loginBtn.classList.add('bg-danger');
        loginBtn.classList.remove('bg-success');
    }
    else {
        flag.isLogin = false;
        showWelcomeBox();
        loginBtn.textContent = 'LOGIN';
        loginBtn.classList.add('bg-succes');
        loginBtn.classList.remove('bg-danger');
    }
});
// SAVE TASKS
function showAddTaskBox() {
    var welcomeBox = document.querySelector('.title'), addTaskBox = document.querySelector('.form');
    welcomeBox.classList.add('d-none');
    addTaskBox.classList.remove('d-none');
}
function showWelcomeBox() {
    var welcomeBox = document.querySelector('.title'), addTaskBox = document.querySelector('.form');
    welcomeBox.classList.remove('d-none');
    addTaskBox.classList.add('d-none');
}
function saveTask() {
    var taskInputValue = document.querySelector('#floatingInput').value;
    obj.add(taskInputValue, false);
    Render();
}
// DELETE TASK
function deleteTask(element) {
    var _a, _b;
    var value = ((_b = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.querySelector('#task').textContent);
    obj["delete"](value);
    Render();
}
// FINISH TASK
function editTask(element) {
    var _a, _b;
    var task = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode.querySelector('#task'), card = (_b = element.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode.querySelector('#actions');
    oldValue = task.textContent;
    task.innerHTML = "<input type=\"text\" id=\"updateTaskValue\" />";
    card.innerHTML = "<button class=\"btn btn-warning\"  onclick=\"editObject()\">EDIT</button>";
}
function editObject() {
    var newTaskValue = (document.querySelector('#updateTaskValue'));
    obj.update(oldValue, { newTask: newTaskValue.value });
    Render();
}
function doneTask(element) {
    var _a;
    var task = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode.querySelector('#task');
    task.style = 'text-decoration: line-through;';
}
function Render() {
    var tableTbody = document.querySelector('.tasks-show');
    tableTbody.innerHTML = "";
    obj.lists.forEach(function (task, index) {
        tableTbody.innerHTML += "<tr>\n        <div class=\"col-12 card d-flex align-items-center justify-content-between flex-row p-3\">\n                    <div>\n                        <h4 id=\"task\">" + task['task'] + "</h4>\n                    </div>\n                    <div id=\"actions\"><button class=\"btn btn-success mx-3\" id=\"done\" onclick=\"doneTask(this)\">DONE</button>\n                        <button class=\"btn btn-warning\" id=\"edit\" onclick=\"editTask(this)\">EDIT</button>\n                        <button class=\"btn btn-danger mx-3\" id=\"delete\" onclick=\"deleteTask(this)\">DELETE</button></div>\n\n                </div>";
    });
}
