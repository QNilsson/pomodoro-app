<!--App.vue is a Single File Component. It contains three chunks of code:
HTML, CSS, and Javascript-->

<template>
  <div id="app" class="container">
   <CompletedTodos></CompletedTodos>
   <GetTodo></GetTodo>
   <CurrentTodos></CurrentTodos>
  </div>
</template>

<script>
// import Timer from './components/Timer';
import GetTodo from './components/GetTodo';
import CurrentTodos from './components/CurrentTodos';
import CompletedTodos from './components/CompletedTodos';


export default {
  components:{
    GetTodo,
    CurrentTodos,
    CompletedTodos
  }
}
</script>

<style>
body{
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>