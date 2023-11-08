"use strict";

// ------------------------------------------
// -----ĐỊNH NGHĨA MỘT SỐ BIẾN TRONG TODO----
// ------------------------------------------

const addbtn = document.getElementById("btn-add");
const taskInput = document.getElementById("input-task");
let todoArr = JSON.parse(localStorage.getItem("todoArr")) ?? [];
let todoList = document.getElementById("todo-list");
let checkedListArr = JSON.parse(localStorage.getItem("checkedListArr")) ?? [];
let checkedListValueArr =
    JSON.parse(localStorage.getItem("checkedListValueArr")) ?? [];

class Task {
    constructor(owner, task, isDone) {
        this.owner = owner;
        this.task = task;
        this.isDone = isDone;
    }
}

// ----------------------------------------------------
// -----TẠO HÀM KIỂM TRA TÍNH HỢP LỆ KHI NHẬP TASK-----
// ----------------------------------------------------

function validTodo() {
    let valid = true;
    if (!currentUser[0]) {
        alert(
            "Bạn chưa đăng nhập! Xin hãy đăng nhập để thực hiện chức năng này!"
        );
        valid = false;
        return;
    }
    if (!taskInput.value) {
        alert("Xin hãy nhập Task");
        valid = false;
        return;
    }
    for (let i = 0; i < todoArr.length; i++) {
        if (
            currentUser[0] === todoArr[i].owner &&
            taskInput.value === todoArr[i].task
        ) {
            alert("Task đã tồn tại! Bạn không cần add nữa!");
            valid = false;
            return;
        }
    }

    return valid;
}

// -----------------------------------------
// -----TẠO HÀM RESET FORM TẠO TASK---------
// -----------------------------------------

function clearTodoForm() {
    taskInput.value = "";
}
// --------------------------------------
// ------TẠO HÀM HIỂN THỊ CÁC TASK-------
// --------------------------------------

function displayTodoList() {
    todoList.innerHTML = "";
    let todoArrTheme = [];

    for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].owner === currentUser[0]) {
            todoArrTheme.push(todoArr[i]);
        }
    }

    for (let i = 0; i < todoArrTheme.length; i++) {
        if (
            todoArrTheme[i].isDone === true &&
            todoArrTheme[i].owner === currentUser[0]
        ) {
            const content = `<li onclick="completeTask(${i})" class="checked">${todoArrTheme[i].task}<span class="close" onclick="deleteTask(${i})">×</span></li>`;
            todoList.insertAdjacentHTML("beforeend", content);
        } else if (todoArrTheme[i].owner === currentUser[0]) {
            const content = `<li onclick="completeTask(${i})">${todoArrTheme[i].task}<span class="close" onclick="deleteTask(${i})">×</span></li>`;
            todoList.insertAdjacentHTML("beforeend", content);
        }
    }
}

// --------------------------------
// ------TẠO HÀM XOÁ CÁC TASK------
// --------------------------------

function deleteTask(index) {
    const listLi = document.querySelectorAll("#todo-list li");

    for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].task === listLi[index].childNodes[0].textContent) {
            todoArr.splice(i, 1);
            saveToStorage("todoArr", todoArr);
        }
    }
    displayTodoList();

    event.stopPropagation();
}

// -----------------------------------------------
// -----TẠO HÀM KIỂM TRA CÁC TASK ĐÃ CHECKED------
// -----------------------------------------------

function checkedListValue(checkedListArr) {
    let checkedListValueArr = [];
    for (let i = 0; i < checkedListArr.length; i++) {
        if (Object.keys(checkedListArr[i] === currentUser[0])) {
            checkedListValueArr.push(checkedListArr[i][currentUser[0]]);
        }
    }

    saveToStorage("checkedListValueArr", checkedListValueArr);
}

checkedListValue(checkedListArr);

// --------------------------------------------------
// -----TẠO HÀM ĐỂ HIỂN THỊ CÁC TASK ĐÃ CHECKED------
// --------------------------------------------------

function completeTask(index) {
    const listLi = document.querySelectorAll("#todo-list li");

    if (listLi) {
        listLi[index].classList.toggle("checked");
        for (let i = 0; i < todoArr.length; i++) {
            if (
                todoArr[i].owner === currentUser[0] &&
                todoArr[i].task === listLi[index].childNodes[0].textContent &&
                listLi[index].classList.contains("checked")
            ) {
                todoArr[i].isDone = true;
                saveToStorage("todoArr", todoArr);
                return;
            } else if (
                todoArr[i].owner === currentUser[0] &&
                todoArr[i].task === listLi[index].childNodes[0].textContent
            ) {
                todoArr[i].isDone = false;
                saveToStorage("todoArr", todoArr);
                return;
            }
        }
    }
}

displayTodoList();

// ---------------------------------------------
// ------TẠO SỰU KIỆN LÊN BUTTON THÊM TASK------
// ---------------------------------------------

addbtn.addEventListener("click", function () {
    let task = taskInput.value;
    let owner = currentUser[0];
    let isDone = false;

    const todo = new Task(owner, task, isDone);

    if (validTodo()) {
        todoArr.push(todo);
        saveToStorage("todoArr", todoArr);
        displayTodoList();
    }
    completeTask();
    clearTodoForm();
});
