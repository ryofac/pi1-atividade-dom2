document.addEventListener("DOMContentLoaded", main);

class Repository {
  create(item) {
    throw new Error("Method not implemented");
  }

  get(id) {
    throw new Error("Method not implemented");
  }

  update(id, item) {
    throw new Error("Method not implemented");
  }

  delete(id) {
    throw new Error("Method not implemented");
  }

  getAll() {
    throw new Error("Method not implemented");
  }
}

export class LocalRepository extends Repository {
  tasks = [];
  create(task) {
    task.id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    this.tasks.push(task);
  }
  delete(id) {
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return null;
  }
  update(id, task) {
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedItem };
      return this.tasks[index];
    }
    return null;
  }

  get(id) {
    return this.tasks.find((element) => element.id === id);
  }

  getAll() {
    return this.tasks;
  }
}

export class APIRepository extends Repository {
  constructor(apiBaseURL) {
    super();
    this.apiBaseURL = apiBaseURL;
  }

  toTask(rawTask) {
    return {
      id: rawTask.id,
      description: rawTask.description,
      startAt: rawTask.created_at,
      endAt: rawTask.end_at,
    };
  }

  async get(id) {
    const response = fetch(`${this.apiBaseURL}/tasks/${id}}/`);
    return response.json().then((data) => this.toTask(data));
  }

  async create(task) {
    const response = await fetch(`${this.apiBaseURL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    console.log(response);

    return response.json().then((data) => this.toTask(data));
  }

  async update(id, updatedTask) {
    const response = await fetch(`${this.apiBaseURL}/tasks/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    return response.json().then((data) => this.toTask(data));
  }

  async delete(id) {
    const response = await fetch(
      `${this.apiBaseURL}/tasks/${id}/` /
        {
          method: "DELETE",
        }
    );
    return response.json().then((data) => this.toTask(data));
  }

  async getAll() {
    const response = await fetch(`${this.apiBaseURL}/tasks`);
    const jsonResponse = await response.json();

    const tasks = [];
    jsonResponse.forEach((element) => tasks.push(this.toTask(element)));
    return tasks;
  }
}

const tasksRepo = new APIRepository("https://api-todo-dbdr.onrender.com/api");

async function main() {
  const addBtn = document.getElementById("adicionarBtn");
  addBtn.addEventListener("click", async () => {
    const taskDescription = document.getElementById("descricaoTarefa").value;
    await tasksRepo.create({
      description: taskDescription,
      created_at: formatDate(new Date()),
      end_at: formatDate(new Date()),
      is_active: true,
    });
  });
  await populateTaskTable();
}

async function populateTaskTable() {
  const allTasks = await tasksRepo.getAll();
  console.log(allTasks);
  allTasks.forEach((task) => {
    createTaskElement(task.id, task);
  });
}

function createTaskElement(id, task) {
  const tableBody = document.querySelector("#tabelaTarefas tbody");
  const row = document.createElement("tr");

  const rowId = document.createElement("td");
  rowId.textContent = id;

  const taskDesc = document.createElement("td");
  taskDesc.textContent = task.description;

  const taskDateInit = document.createElement("td");
  taskDateInit.textContent = task.startAt;

  const taskDateEnd = document.createElement("td");
  taskDateEnd.textContent = task.endAt;

  const actions = document.createElement("td");

  const deleteBtn = document.createElement("button");

  deleteBtn.addEventListener("click", async () => {
    console.log(task.id);
    await tasksRepo.delete(task.id);
    row.remove();
  });

  actions.appendChild(deleteBtn);

  tableBody.appendChild(row);

  row.appendChild(rowId);
  row.appendChild(taskDesc);
  row.appendChild(taskDateInit);
  row.appendChild(taskDateEnd);
  row.appendChild(actions);
}

function formatDate(dateObj) {
  const year = dateObj.getFullYear();

  // getMonth() retorna o mês de 0 a 11, por isso somamos 1
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");

  // getDate() retorna o dia do mês de 1 a 31
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
