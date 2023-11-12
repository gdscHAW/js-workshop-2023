const templateAddTodo = document.createElement("template");

templateAddTodo.innerHTML = `
  <input type="text" placeholder="Todo" />
  <button>Add</button>
`;

class AddTodo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(templateAddTodo.content.cloneNode(true));

    this.input = shadow.querySelector("input");
    this.addButton = shadow.querySelector("button");
    this.initEventListeners();
  }

  initEventListeners() {
    this.addButton.addEventListener("click", () => this.addTodo());
    this.input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") this.addTodo();
    });
  }

  addTodo() {
    const todo = this.input.value;

    if (!todo) return;

    const json = sessionStorage.getItem("todos") ?? '{ "todos": [] }';

    const todos = JSON.parse(json).todos;

    const newTodo = {
      id: crypto.randomUUID(),
      todo,
      done: false,
    };

    const newTodos = {
      todos: [...todos, newTodo],
    };

    sessionStorage.setItem("todos", JSON.stringify(newTodos));

    document.dispatchEvent(
      new CustomEvent("todoAdded", {
        bubbles: true,
        cancelable: false,
        composed: true,
      })
    );

    this.input.value = "";
  }
}

customElements.define("add-todo", AddTodo);
