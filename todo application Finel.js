let todoItemsContainerElement = document.getElementById("todoItemsContainer");
let userInputEle = document.getElementById("todoUserInput");
let addButtonELe = document.getElementById("addButton");
let saveButtonEle = document.getElementById("saveButton");

function parsedValueFromLs() {
    let stringifiedValueFromLS = localStorage.getItem("todoElementsList");
    let parsedValue = JSON.parse(stringifiedValueFromLS);

    if (parsedValue === null) {
        return [];
    } else {
        return parsedValue;
    }
}

let todoElementsList = parsedValueFromLs();

saveButtonEle.onclick = function() {
    localStorage.setItem("todoElementsList", JSON.stringify(todoElementsList));
};

function parsedValueFromLs() {
    let stringifiedValueFromLS = localStorage.getItem("todoElementsList");
    let parsedValue = JSON.parse(stringifiedValueFromLS);

    if (parsedValue === null) {
        return [];
    } else {
        return parsedValue;
    }
}


function ondeleteTodod(todoId) {
    let todoContEle = document.getElementById(todoId);
    todoItemsContainerElement.removeChild(todoContEle);

    let todoIdIndex = todoElementsList.findIndex(function(eachItem) {
        let id = "todo" + eachItem.uniqueId;
        if (id === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoElementsList.splice(todoIdIndex, 1);
}

function onTodoStatusChange(labelEleId, checkBoxId, todo) {
    let checkBoxEle = document.getElementById(checkBoxId);
    let lableEle = document.getElementById(labelEleId);
    let checked_status = checkBoxEle.checked;

    if (checked_status === true) {
        lableEle.classList.add("task-checked");
    } else {
        lableEle.classList.remove("task-checked");
    }

    if (todo.is_checked === false) {
        todo.is_checked = true;
    } else {
        todo.is_checked = false;
    }


}

function createAndAppend(todo) {
    let checkBoxId = "checckBox" + todo.uniqueId;
    let labelEleId = "label" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");

    todoItemsContainerElement.appendChild(todoElement);

    let checkBoxElement = document.createElement("input");
    checkBoxElement.id = checkBoxId;
    checkBoxElement.type = "checkbox";
    checkBoxElement.classList.add("checkbox-input");
    if (todo.is_checked === true) {
        checkBoxElement.checked = true;
    }

    checkBoxElement.onclick = function() {

        onTodoStatusChange(labelEleId, checkBoxId, todo);
    };

    todoElement.appendChild(checkBoxElement);

    let labelContainerElement = document.createElement("div");
    labelContainerElement.classList.add("label-container");

    todoElement.appendChild(labelContainerElement);

    let anotherDivELe = document.createElement("div");
    anotherDivELe.classList.add("d-flex", "flex-row");
    labelContainerElement.appendChild(anotherDivELe);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelEleId;
    if (todo.is_checked === true) {
        labelElement.classList.add("task-checked");
    }
    labelElement.textContent = todo.text;

    anotherDivELe.appendChild(labelElement);

    let deleteIconContainerEle = document.createElement("div");
    deleteIconContainerEle.classList.add("delete-icon-container");
    deleteIconContainerEle.onclick = function() {
        ondeleteTodod(todoId);
    };

    anotherDivELe.appendChild(deleteIconContainerEle);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainerEle.appendChild(deleteIcon);
}

for (let todo of todoElementsList) {
    createAndAppend(todo);
}

addButtonELe.onclick = function() {
    let userEnteredValue = userInputEle.value;
    let uniquesNUms = todoElementsList.length;

    if (userEnteredValue === "") {
        alert("Enter Correct Input");
        return;
    }

    let newTodo = {
        text: userEnteredValue,
        uniqueId: uniquesNUms + 1,
        is_checked: false
    };

    todoElementsList.push(newTodo);
    createAndAppend(newTodo);
    userInputEle.value = "";
};