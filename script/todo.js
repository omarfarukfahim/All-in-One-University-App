document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTodoButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
  
    // Function to add a new todo item
    function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText === "") return; // Prevent adding empty items
  
      const li = document.createElement("li");
      li.className = "flex items-center justify-between p-2 border rounded";
      li.innerHTML = `
        <span>${todoText}</span>
        <button class="btn btn-sm btn-error delete-todo">Delete</button>
      `;
      
      // Attach event listener to the delete button
      li.querySelector(".delete-todo").addEventListener("click", () => {
        li.remove();
      });
  
      todoList.appendChild(li);
      todoInput.value = "";
    }
  
    // Add todo on button click
    addTodoButton.addEventListener("click", addTodo);
  
    // Also allow adding todo by pressing Enter in the input field
    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTodo();
      }
    });
  });
  