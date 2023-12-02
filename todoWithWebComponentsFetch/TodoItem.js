const templateTodoItem = document.createElement("template");

templateTodoItem.innerHTML = `
  <style>
    #todo-container {
        display: flex;
    }
    input {
        margin-right: 10px;
    }
  </style>
  <div id="todo-container">
  <input type="checkbox" />
  <span>
    <div><slot name="title"></slot></div>
    <div><slot name="description"></slot></div>
    <div><slot name="due-date"></slot></div>
  </span>
  </div>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(templateTodoItem.content.cloneNode(true));

    this.checkbox = shadow.querySelector("input");
    this.initEventListeners();
  }

  initEventListeners() {
    this.checkbox.addEventListener("change", () => {
      this.dispatchEvent(new CustomEvent("delete", {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    });
  }
}

customElements.define("todo-item", TodoItem);
