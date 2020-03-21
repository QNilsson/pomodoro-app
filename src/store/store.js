import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    completed: 0, 
    totalTodo: 0, 
    longBreak:0,
    current: null, 
    todos: [
      {
          
        task: "Walk the dog",
        count: 0,
        done: false
      },
      {
        task: "Make lunch",
        count: 0,
        done: false
      },
      {
        task: "Do the dishes",
        count: 0,
        done: false
      },
      {
        task: "Finish homework",
        count: 0,
        done: false
      },
      {
        task:"Grocery shopping",
        count: 0,
        done: false
      }
      
    ]
  }
});
