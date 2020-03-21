<template>
  <v-container fluid class="text-center ml-auto mr-auto deep-orange lighten-2">
    <v-row>
      <v-col background-color="red">
        <p class="mt-0 pt-4 display-1 white--text">Number of Items on List</p>
        <p class="mt-0 pt-0 display-2 white--text">{{this.$store.state.todos.length}}</p>
      </v-col>
      
      <v-col>
        <div>
      <section id="app">
        <div>
          <div class="container">
            <span id="type" class="display-1 white--text"> {{ currentStatus() }}</span>
            <div id="timer" class="display-2 font-weight-regular white--text">
              <span id="minutes">{{ getMinutes() }}</span>
              <span id="middle">:</span>
              <span id="seconds">{{ getSeconds() }}</span>
            </div>
            

            <div id="buttons" class="mt-3 deep-orange lighten-3"> 
              <button
                id="start"
                class="mx-3 my-3"
                v-if="!timer"
                @click="playPause()"
              >
                <p class="font-weight-medium green--text">PAUSED</p>
              </button>

              <button id="stop" class="mx-3 my-3" v-if="timer" @click="pause()">
                <p class="font-weight-medium green--text">PAUSE</p>
              </button>

              <button id="reset" class="mx-3 my-3" @click="reset()">
                <p class="font-weight-medium yellow--text">RESTART</p>
              </button>

              <button id="reset" class="mx-3 my-3" @click="complete()">
                <p class="display-1 red--text">SKIP TO 0:00</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
      </v-col>
      
      <v-col>
        <p class="mt-0 pt-4 display-1 white--text">Completed Pomodoros</p>
        <p class="mt-0 pt-4 display-2 white--text">{{this.$store.state.totalTodo}}</p>
      </v-col>
    </v-row>    
    
    
    <v-row>
      <v-col cols="12">
        
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on }">
            <v-btn x-large class="mb-2 white--text" color="teal lighten-2" v-on="on">
              New Todo
            </v-btn>
            
          </template>
          <v-card class="teal lighten-4 white--text">
            <v-card-title>
              <span class="headline white--text">Add your Todo</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                  solo
                    v-model="editedItem.task"
                    label="Add here.."
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="close">Cancel</v-btn>
              <v-btn color="green" text @click="save">Add this Todo</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn x-large class="mb-2 py-3 ml-4 white--text" color="teal lighten-2"  @click="play">
              Start Break
            </v-btn>
        <v-data-table
          :headers="headers"
          :items="todos"

          class="deep-orange teal--text lighten-4 my-6 ml-4 mr-4"
        >
          <template v-slot:item.start="{ item }">
            <v-btn 
              class="mt-4 mb-4 teal lighten-2 white--text" 
              @click="playPause(item)">
                Start Todo {{ item.start }}
            </v-btn>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn x-small color="yellow"
              @click="editItem(item)"
              class="teal--text"
            >
              Edit
            </v-btn>
            <v-btn x-small color="red" class="white--text ml-3" @click="deleteItem(item)" >
              Delete
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    defaultTime: 60 * 25,
    defaultBreak: 60 * 5,
    pomodoro: true,
    bigBreak: 60 * 20,
    break: false,
    breakStart: false,
    pomodoroCount: 0,
    time: 0,
    completeTime: 0,
    timer: null,
    todos: [],
    editedIndex: -1,
    dateTime: null,
    headers: [
      { text: "Start Todo Item", value: `start`},
      { text: "Todo", value: "task"},
      { text: "Pomodoros Completed", value: "count"},
      { text: "Edit/Delete", value: "action"}
    ],
    editedItem: {
      task: "",
      count: 0
    },
    defaultItem: {
      task: "Default Item",
      count: 0
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
    this.time = this.defaultTime;
  },
  methods: {
    currentStatus() {
      return this.pomodoro ? "Work Time!" : "Break Time!";
    },
    getNumber(num) {
      return (num < 10 ? "0" : "") + num.toString();
    },
    getMinutes() {
      return this.getNumber(Math.floor(this.time / 60));
    },
    getSeconds() {
      return this.getNumber(this.time % 60);
    },
    
    playPause(item) {
      this.$store.state.current = this.todos.indexOf(item)
      console.log(this.$store.state.current)
      if (!this.timer) {
        this.play(item.count);
      } else {
        this.pause();
      }
    },
    play() {
      if (this.time <= 0) this.time = this.defaultTime;
      this.timer = setInterval(() => {
        this.time -= 1;
        if (this.time <= 0) this.playPause();
      }, 1000);
    },
    pause() {
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      !this.pomodoro
        ? (this.time = this.defaultBreak)
        : (this.time = this.defaultTime)
        this.playPause();
    },
    complete() {
      this.pomodoro = !this.pomodoro;
      if(!this.pomodoro) {
        this.$store.state.completed++
        this.$store.state.totalTodo++
        this.$store.state.todos[`${this.$store.state.current}`].count++ 
      }
      if (this.$store.state.completed === 4) { 
        this.time = 60 * 20;
        this.$store.state.completed = 0; 
        alert("Congrats! you completed 4 pomodoros! Enjoy your 20 minute break")
      } else {
        this.pomodoro
          ? (this.time = this.defaultTime)
          : (this.time = this.defaultBreak)
      }
      this.pause()
    },
    
    // get data from the store
    initialize() {
      this.todos = this.$store.state.todos
    },
    editItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.todos.indexOf(item);
      confirm("are you sure you want to delete this todo?") &&
        this.todos.splice(index, 1);
    },
   
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.todos[this.editedIndex], this.editedItem);
      } else {
        this.todos.push(this.editedItem);
      }
      this.close();
    },
  }
};
</script>

<style>
.v-data-table-header {
  background-color: teal;
  
}
.v-data-table-header span {
  color: white;
}



</style>