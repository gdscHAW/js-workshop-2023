const templateTodoList = document.createElement("template");

templateTodoList.innerHTML = `
  <style>
    ul {
      display: grid;
      gap: 10px;
      border: 2px lightblue solid;
      padding: 30px;
      border-radius: 8px;
      list-style-type: none;
    }
  </style>
  <h1>Todos</h1>
  <ul></ul>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(templateTodoList.content.cloneNode(true));

    this.list = shadow.querySelector("ul");
    this.getTodos();

    this.initEventListeners();
  }

  list = null;

  initEventListeners() {
    console.log("initEventListeners");
    window.addEventListener("todoAdded", (event) => {
      this.list.innerHTML = "";
      this.getTodos();
    });
  }

  getTodos() {
    const json = sessionStorage.getItem("todos");

    if (!json) return;

    const todos = JSON.parse(json).todos;

    todos.forEach((todo) => {
      const todoItem = this.getTodoItemElement(todo);
      this.list.appendChild(todoItem);
    });
  }

  getTodoItemElement(todo) {
    const todoItem = document.createElement("todo-item");
    todoItem.setAttribute("todo-id", todo.id);
    todoItem.setAttribute("checked", todo.done);
    todoItem.innerText = todo.todo;

    todoItem.addEventListener("onChange", () => this.updateTodo(todo.id));

    const listItem = document.createElement("li");
    listItem.appendChild(todoItem);

    return listItem;
  }

  updateTodo(todoId) {
    if (!todoId) return;

    const json = sessionStorage.getItem("todos");
    const todos = JSON.parse(json);

    todos.todos.every((todo) => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
        return false;
      }
      return true;
    });

    sessionStorage.setItem("todos", JSON.stringify(todos));
  }
}

customElements.define("todo-list", TodoList);
