<template>
  <div id="app">
    <h4 class="bg-primary text-white text-center p-4">{{title}}</h4>
    <div class="container-fluid p-4">
      <div class="row" v-if="filteredTasks.length == 0">
        <div class="col text-center">
          <b>Nothing to do.</b>
        </div>
      </div>
      <template v-else>
        <div class="row">
          <div class="col font-weight-bold">Task</div>
          <div class="col-2 font-weight-bold">Done</div>
        </div>
        <div class="row" v-for="t in filteredTasks" v-bind:key="t.action">
          <div class="col">{{t.title}}</div>
          <div class="col-2 text-center">
            <input type="checkbox" v-model="t.done" class="form-check-input">
            {{t.done}}
          </div>
        </div>
        <div class="row py-2">
          <div class="col">
            <input v-model="newTask" type="text" class="form-control">
          </div>
          <div class="col-2">
            <button class="btn btn-primary" v-on:click="addNewTask">Add</button>
          </div>
        </div>
        <div class="row bg-secondary p-2 mt-2 text-white">
          <div class="col text-center">
            <input type="checkbox" v-model="hideCompleted" class="form-check-input">
            <label class="form-check-label font-weight-bold">Hide Completed Task</label>
          </div>
          <div class="col text-center">
            <button class="btn btn-sm btn-danger" @click="deleteAll">
              Delete All
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "Fazt Todo App",
      tasks: [],
      hideCompleted: true,
      newTask: ""
    };
  },
  created() {
    let data = localStorage.getItem("tasks");
    if (data != null) {
      this.tasks = JSON.parse(data);
    }
  },
  methods: {
    addNewTask() {
      this.tasks.push({
        title: this.newTask,
        done: false
      });
      this.storeData();
      this.newTask = "";
    },
    storeData() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteAll() {
      this.tasks = this.tasks.filter(t => !t.done);
      this.storeData();
    }
  },
  computed: {
    filteredTasks() {
      return this.hideCompleted ? this.tasks.filter(t => !t.done) : this.tasks;
    }
  }
};
</script>