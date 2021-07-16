interface Itodo {
    lists: Array<{ task?: string, completed?: boolean }>
    add(task: string, completed: boolean): void
    delete(id: string): void
    update(oldTask: string, updatedValue: { newTask?: string }): void
}
let obj: Itodo = {
    lists: [],
    add(task: string, completed: boolean): void {
        this.lists.push({ task, completed })
    },
    delete(name): void {
        this.lists = this.lists.filter((list) => list['task'] !== name ? list : false)
    },
    update(name, updatedValue: { newTask: string }): void {
        this.lists = this.lists.map(list => {
            if (list['task'] === name) {
                return list = {
                    task: updatedValue['newTask']

                }
            } else return list
        })

    }

}
// Variables
const flag = {
    isLogin: false
}, loginBtn = <HTMLElement>document.querySelector('#btnLogin')
let oldValue: string;

loginBtn.addEventListener('click', () => {
    if (!flag.isLogin) {
        flag.isLogin = true
        showAddTaskBox()
        loginBtn.textContent = 'LOGOUT'
        loginBtn.classList.add('bg-danger')
        loginBtn.classList.remove('bg-success')
    } else {
        flag.isLogin = false
        showWelcomeBox()
        loginBtn.textContent = 'LOGIN'
        loginBtn.classList.add('bg-succes')
        loginBtn.classList.remove('bg-danger')
    }
})
// SAVE TASKS
function showAddTaskBox(): void {
    const welcomeBox = <HTMLElement>document.querySelector('.title'),
        addTaskBox = <HTMLElement>document.querySelector('.form')
    welcomeBox.classList.add('d-none');
    addTaskBox.classList.remove('d-none')
}
function showWelcomeBox(): void {
    const welcomeBox = <HTMLElement>document.querySelector('.title'),
        addTaskBox = <HTMLElement>document.querySelector('.form')
    welcomeBox.classList.remove('d-none');
    addTaskBox.classList.add('d-none')
}
function saveTask() {
    let taskInputValue = (document.querySelector('#floatingInput') as (HTMLInputElement)).value;
    obj.add(taskInputValue, false)
    Render()
}
// DELETE TASK
function deleteTask(element: any) {
    const value = (element.parentNode?.parentNode?.querySelector('#task').textContent);
    obj.delete(value)
    Render()
}
// FINISH TASK
function editTask(element: any): void {
    const task = element.parentNode?.parentNode.querySelector('#task'),
        card = element.parentNode?.parentNode.querySelector('#actions');
    oldValue = task.textContent
    task.innerHTML = `<input type="text" id="updateTaskValue" />`;
    card.innerHTML = `<button class="btn btn-warning"  onclick="editObject()">EDIT</button>`

}
function editObject(): void {
    const newTaskValue = (document.querySelector('#updateTaskValue')) as HTMLInputElement;
    obj.update(oldValue, { newTask: newTaskValue.value })
    Render()
}
function doneTask(element: any): void {
    const task = element.parentNode?.parentNode.querySelector('#task');
    task.style = 'text-decoration: line-through;'
}
function Render() {
    const tableTbody = ((document.querySelector('.tasks-show') as (HTMLTableElement)));
    tableTbody.innerHTML = ""
    obj.lists.forEach((task, index) => {

        tableTbody.innerHTML += `<tr>
        <div class="col-12 card d-flex align-items-center justify-content-between flex-row p-3">
                    <div>
                        <h4 id="task">${task['task']}</h4>
                    </div>
                    <div id="actions"><button class="btn btn-success mx-3" id="done" onclick="doneTask(this)">DONE</button>
                        <button class="btn btn-warning" id="edit" onclick="editTask(this)">EDIT</button>
                        <button class="btn btn-danger mx-3" id="delete" onclick="deleteTask(this)">DELETE</button></div>

                </div>`
    })
}