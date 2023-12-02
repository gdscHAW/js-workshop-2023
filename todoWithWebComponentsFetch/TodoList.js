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
    this.baseURL = "https://menju.co/api/todos";
    this.authUsername = "gdsc";
    this.authPassword = "haw";
    this.getTodos();

    this.initEventListeners();
  }

  initEventListeners() {
    window.addEventListener("todoChanged", async () => {
      this.list.innerHTML = "";
      await this.getTodos();
    });
  }

  async getTodos() {
    const todos = await this.fetchTodos();

    if (todos) {
      todos.forEach((todo) => {
        const todoItem = this.getTodoItemElement(todo);
        this.list.appendChild(todoItem);
      });
    } else {
      console.log("Failed to fetch todos.");
    }
  }

  getTodoItemElement(todo) {
    const todoItem = document.createElement("todo-item");

    todoItem.setAttribute("todo-id", todo.id);
    todoItem.setAttribute("checked", todo.completed); // Assuming completed is the equivalent of done

    const formattedDueDate = new Date(todo.dueDate).toLocaleDateString("de-DE");
    const titleSlot = document.createElement("span");
    titleSlot.setAttribute("slot", "title");
    titleSlot.textContent = 'Titel: ' + todo.title;

    const descriptionSlot = document.createElement("span");
    descriptionSlot.setAttribute("slot", "description");
    descriptionSlot.textContent = 'Beschreibung: ' + todo.description;

    const dueDateSlot = document.createElement("span");
    dueDateSlot.setAttribute("slot", "due-date");
    dueDateSlot.textContent = 'Deadline: ' + formattedDueDate;

    todoItem.appendChild(titleSlot);
    todoItem.appendChild(descriptionSlot);
    todoItem.appendChild(dueDateSlot);

    todoItem.addEventListener("delete", () => this.checkedTodo(todo.id));

    const listItem = document.createElement("li");
    listItem.appendChild(todoItem);

    return listItem;
  }

  async checkedTodo(todoId) {
    if (!todoId) return;

    await this.deleteTodo(todoId)

    this.dispatchEvent(new CustomEvent("todoChanged", {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  async fetchTodos() {
    try {
      const response = await fetch(this.baseURL, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Basic ${btoa(`${this.authUsername}:${this.authPassword}`)}`,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch todos. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching todos: ${error.message}`);
      return null;
    }
  }
  async deleteTodo(todoId) {
    try {
      const response = await fetch(`${this.baseURL}?id=${todoId}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Basic ${btoa(`${this.authUsername}:${this.authPassword}`)}`,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to delete Todo. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting todo: ${error.message}`);
      return null;
    }
  }
}

customElements.define("todo-list", TodoList);
