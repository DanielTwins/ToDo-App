<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Footer from "./components/Footer.vue";

// create a reference with a empty array and a name ref with a empty string
const todos = ref([]);
const name = ref("");

// create input refs
const input_content = ref("");
const input_category = ref(null); // by default cat. is null

// make the list of todos arr. using sort() to an ascending list by date
// the latest todo displays first and the oldest ones afterwards
const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const addTodo = () => {
  if (input_content.value.trim() === "" || input_content.value === null) {
    return;
  }
  // if trim() meaning leaving the field with empty spaces or just leaving empty the field
  // then addToDo func. not running
  console.log("addToDo is trigged");

  // push in/add a new todo task to the todos arr. with the input value, category
  // and the date & time that returns in milliseconds to compare the todos in
  // todos_asc to sort them after time
  // this push/add only to the todos arr. not to local storage
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false, // by default new added todo task is not done
    createdAt: new Date().getTime(),
  });

  // to reset the field and the category button after each time you submit a todo
  input_content.value = ''
  input_category.value = null
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

// watch react to any changes through the "deep" dependency and call the localStorage.setItem()
watch(
  todos,
  (newValue) => {
    localStorage.setItem("todos", JSON.stringify(newValue)); // stringify the new added todo objects
  },
  { deep: true }
); // deep enables to look through everything, any changes in todos arr. element
// then deep will catch it and then watch will invokes again

// using "watch" property to react to changes in the data or computed
// properties of a Vue component
// ** using localStorage.setItem() to store the input values in browsers
// ** localStorage persist the new value in browser after a refresh
watch(name, (newValue) => {
  localStorage.setItem("name", newValue); // the name added is already a string here
});

// to pull the stored data or get the data back from localstorage
onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || []; // parse it back to JS-json from stringified values
});
</script>


<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        What's up, <input type="text" placeholder="Name here" v-model="name" />
      </h2>
    </section>

    <section class="create-todo">
      <h3>CREATE YOUR TASK</h3>

      <form id="new-todo-form" @submit.prevent="addTodo">
        <h4>What's on your todo list?</h4>
        <input
          type="text"
          placeholder="e.g. go to the shop"
          v-model="input_content"
        />

        <h4>Pick a category</h4>
        <div class="options">
          <label>
            <input
              type="radio"
              name="category"
              value="business"
              v-model="input_category"
            />
            <span class="bubble business"></span>
            <div>Business</div>
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="personal"
              v-model="input_category"
            />
            <span class="bubble personal"></span>
            <div>Personal</div>
          </label>

          <!-- {{ input_category }} -->
        </div>
        <input type="submit" value="Add todo" />

        <!-- {{ todos_asc }} -->
      </form>
    </section>

    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list">
        <div
          v-for="todo in todos_asc"
          v-bind:key="todo.id"
          :class="`todo-item ${todo.done && 'done'}`"
        >
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>

    <router-view></router-view>
    <Footer />
  </main>
</template>

<style scoped></style>
