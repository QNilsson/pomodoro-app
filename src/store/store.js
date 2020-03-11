import Vue from 'vue';
import Vuex from 'vuex';

Vue.use (Vuex);

//create a store
export default new Vuex.Store ({
  state: {
    //curent state of application
    todos: [],
    newTodo: '',
    totalTime: (25 * 60),
    timerRunning: false,
    timerPaused: false,
    interval: null
  },

  mutations: {
    //mutate the current state
    GET_TODO(state, todo){
        state.newTodo = todo
    },
    ADD_TODO(state){
        state.todos.push({
            body:state.newTodo,
            completed:false
        })
    },
    EDIT_TODO(state, todo){
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1)
        state.todos = todos
        state.newTodo = todo.body
    },
    REMOVE_TODO(state, todo){
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1)

    },
    COMPLETE_TODO(state,todo){
        todo.completed =!todo.completed
    },
    CLEAR_TODO(state){
        state.newTodo = ''
    }
  },
  actions: {
    //get data from server and send that to mutations to mutate current statee
    getTodo({commit}, todo){
        commit('GET_TODO', todo)
    },
    addTodo({commit}, todo){
        commit('ADD_TODO', todo)
    },
    editTodo({commit}, todo){
        commit('EDIT_TODO', todo)
    },
    removeTodo({commit}, todo){
        commit('REMOVE_TODO', todo)
    },
    completeTodo({commit}, todo){
        commit('COMPLETE_TODO', todo)
    },
    clearTodo({commit}){
        commit('CLEAR_TODO')
    }

  },
  getters: {
    //compute derived state based on current state
    newTodo: state => state.newTodo,
    todos: state=> state.todos.filter((todo) =>{return !todo.completed}),
    completedTodos: state => state.todos.filter((todo)=>{return todo.completed})
  },
});

//you can assign a store to variable and export
// export const store = new Vuex.Store ({});
//import the store
