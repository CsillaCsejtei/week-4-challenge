var task = document.getElementById("task");
var addTask = document.getElementById("addTask");
addTask.addEventListener("click", onClickAddTask);

function onClickAddTask() {
  var toDo = task.value.trim();

  if (toDo === "") {
    alert("Please enter a task.");
    return;
  }

  var listEl = document.getElementById("list");
  var listItems = listEl.getElementsByTagName("li");
  for (var i = 0; i < listItems.length; i++) {
    var existingTask = listItems[i]
      .querySelector("span")
      ?.textContent.trim()
      .toLowerCase();
    if (existingTask === toDo.toLowerCase()) {
      alert("This task already exists.");
      return;
    }
  }

  var newLiEl = document.createElement("li");
  newLiEl.style.marginBottom = "10px";
  var taskSpan = document.createElement("span");
  taskSpan.textContent = toDo;
  newLiEl.appendChild(taskSpan);

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.style.marginLeft = "10px";
  deleteButton.addEventListener("click", function () {
    listEl.removeChild(newLiEl);
  });

  var editButton = document.createElement("button");
  editButton.textContent = "🖍";
  editButton.style.marginLeft="10px";
  editButton.addEventListener("click", function () {
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskSpan.textContent;
    newLiEl.replaceChild(editInput, taskSpan);

    editInput.focus();

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        var editedValue = editInput.value.trim();
        if (editedValue === "") {
          alert("Task cannot be empty.");
          return;
        }
        for (var i = 0; i < listItems.length; i++) {
          var existingTask = listItems[i]
            .querySelector("span")
            ?.textContent.trim()
            .toLowerCase();
          if (
            existingTask === editedValue.toLowerCase() &&
            listItems[i] !== newLiEl
          ) {
            alert("This task already exist.");
            return;
          }
        }
        taskSpan.textContent = editedValue;
        newLiEl.replaceChild(taskSpan, editInput);
      }
    });
  });
  newLiEl.appendChild(editButton);
  newLiEl.appendChild(deleteButton);
  listEl.appendChild(newLiEl);
  task.value = "";
}
