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
    this.apiBaseURL = apiBaseURL;
  }

  async get(id) {
    const response = fetch(`${this.apiBaseURL}/tasks/${id}}`);
    return await response.json;
  }

  async create(task) {
    const response = await fetch(`${this.apiBaseURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  }

  async update(id, updatedTask) {
    const response = await fetch(`${this.apiBaseURL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    return await response.json();
  }

  async delete(id) {
    const response = await fetch(`${this.apiBaseURL}/tasks/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }

  async getAll() {
    const response = await fetch(`${this.apiBaseURL}/tasks`);
    return await response.json();
  }
}
