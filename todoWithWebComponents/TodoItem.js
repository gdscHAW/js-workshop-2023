const templateTodoItem = document.createElement("template");

templateTodoItem.innerHTML = `
  <input type="checkbox" />
  <span><slot></slot></span>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(templateTodoItem.content.cloneNode(true));

    this.todoId = this.getAttribute("todo-id");

    this.checkbox = shadow.querySelector("input");
    this.initEventListeners();
    this.getTodoInitialState();
  }

  initEventListeners() {
    this.checkbox.addEventListener("change", () => this.updateTodo());
  }

  updateTodo() {
    const currentValue = this.checkbox.checked;
    sessionStorage.setItem(this.todoId, currentValue);
  }

  getTodoInitialState() {
    const todo = sessionStorage.getItem(this.todoId);
    if (todo !== null) {
      const isCheckboxChecked = todo === 'true';
      this.checkbox.checked = isCheckboxChecked;
    }
  }
}

customElements.define("todo-item", TodoItem);
