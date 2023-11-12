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
  }

  initEventListeners() {
    this.onChange = new CustomEvent("onChange", {
      bubbles: true,
      cancelable: false,
      composed: true,
    });

    this.checkbox.addEventListener("change", () => {
      this.dispatchEvent(this.onChange);
    });
  }

  static get observedAttributes() {
    return ["checked"];
  }

  // Lifecycle Callback
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked" && newValue !== null) {
      const value = newValue === "true";
      this.checkbox.checked = value;
    }
  }
}

customElements.define("todo-item", TodoItem);
