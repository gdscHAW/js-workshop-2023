const templateAddTodo = document.createElement("template");

templateAddTodo.innerHTML = `
  <style>
    #add-todo {
        display: flex;
        flex-direction: column;
    }
    input {
        margin: 5px;
    }
  </style>
  <div id="add-todo">
  <input type="text" id="title" placeholder="Title" />
  <input type="text" id="description" placeholder="Description" />
  <input type="text" id="deadline" placeholder="Deadline" />
  <button>Add</button>
  </div>
`;

class AddTodo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(templateAddTodo.content.cloneNode(true));

    this.todoTitle = shadow.querySelector("#title");
    this.description = shadow.querySelector("#description");
    this.deadline = shadow.querySelector("#deadline");
    this.addButton = shadow.querySelector("button");
    this.initEventListeners();
  }

  initEventListeners() {
    this.addButton.addEventListener("click", () => this.addTodo());
  }

  async addTodo() {
    const [day, month, year] = this.deadline.value.split('.');

    const todo = {
      title: this.todoTitle.value,
      description: this.description.value,
      dueDate: new Date(`${year}-${month}-${day}`),
      completed: false
    }

    if (!todo) return;

    const todoJson = JSON.stringify(todo);

    await this.postTodo(todoJson)

    this.todoTitle.value = "";
    this.description.value = "";
    this.deadline.value = "";

    document.dispatchEvent(
        new CustomEvent("todoChanged", {
          bubbles: true,
          cancelable: false,
          composed: true,
        })
    );
  }

  async postTodo(todo) {
    const BASE_URL = "https://menju.co/api/todos";
    const AUTH_USERNAME = "gdsc";
    const AUTH_PASSWORD = "haw";

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Basic ${btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`)}`,
        }),
        body: todo
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`Failed to post todo. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error posting todo: ${error.message}`);
      return null;
    }
  }
}

customElements.define("add-todo", AddTodo);
