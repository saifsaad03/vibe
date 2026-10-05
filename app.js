const countEl = document.getElementById("count");
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoCount = document.getElementById("todo-count");
const swatch = document.getElementById("swatch");
const hexLabel = document.getElementById("hex");

const STORE_KEY = "git-practice-todos";

let count = Number(localStorage.getItem("git-practice-count") ?? 0);
let todos = loadTodos();

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORE_KEY, JSON.stringify(todos));
  localStorage.setItem("git-practice-count", String(count));
}

function renderCount() {
  countEl.textContent = count;
}

function renderTodos() {
  todoList.replaceChildren(
    ...todos.map((todo, i) => {
      const li = document.createElement("li");
      if (todo.done) li.classList.add("done");

      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = todo.done;
      box.addEventListener("change", () => {
        todos[i].done = box.checked;
        save();
        renderTodos();
      });

      const label = document.createElement("span");
      label.textContent = todo.text;

      const kill = document.createElement("button");
      kill.className = "kill";
      kill.textContent = "\u00d7";
      kill.title = "delete";
      kill.addEventListener("click", () => {
        todos.splice(i, 1);
        save();
        renderTodos();
      });

      li.append(box, label, kill);
      return li;
    })
  );
  todoCount.textContent = todos.filter((t) => !t.done).length;
}

function rollColor() {
  const hex = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  swatch.style.background = hex;
  hexLabel.textContent = hex;
}

document.getElementById("inc").addEventListener("click", () => {
  count += 1;
  save();
  renderCount();
});

document.getElementById("dec").addEventListener("click", () => {
  count -= 1;
  save();
  renderCount();
});

document.getElementById("reset").addEventListener("click", () => {
  count = 0;
  save();
  renderCount();
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  todoInput.value = "";
  save();
  renderTodos();
});

document.getElementById("roll").addEventListener("click", rollColor);

renderCount();
renderTodos();
rollColor();
