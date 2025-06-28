var task = document.getElementById("task");
var addTask = document.getElementById("addTask");
addTask.addEventListener("click", onClickAddTask);

function onClickAddTask() {
  var toDo = task.value;

  if (toDo.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  var listEl = document.getElementById("list");
  var newLiEl = document.createElement("li");

  var taskSpan = document.createElement("span");
  taskSpan.textContent = toDo;
  newLiEl.appendChild(taskSpan);

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", function () {
    listEl.removeChild(newLiEl);
  });

  var editButton = document.createElement("button");
  editButton.textContent = "🖍";

  editButton.addEventListener("click", function () {
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskSpan.textContent;
    newLiEl.replaceChild(editInput, taskSpan);

    editInput.focus();

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        taskSpan.textContent = editInput.value;
        newLiEl.replaceChild(taskSpan, editInput);
      }
    });
  });
  newLiEl.appendChild(editButton);
  newLiEl.appendChild(deleteButton);
  listEl.appendChild(newLiEl);
  task.value = "";
}
