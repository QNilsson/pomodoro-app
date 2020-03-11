<template>
  <div>
    <div id="timer2" class="container">
      <div class="buttons">
        <v-btn class="btn btn-primary"  @click="timerRun" v-if="!timerRunning">Start</v-btn>
        <v-btn small color="warning" dark @click="timerPause" v-if="timerRunning">Pause</v-btn>
        <v-btn small color="error" dark @click="timerReset" v-if="timerRunning">Restart</v-btn>
      </div>
      <!--end buttons-->
    </div>
    <!--end timer2 div-->
    <div id="get-todo" class="container">
      <input class="form-control" :value="newTodo" @change="getTodo" placeholder="I need to..." />
      <v-btn class="btn btn-primary" @click="addTodo">Add Todo</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getTodo(e) {
      this.$store.dispatch("getTodo", e.target.value);
    },
    addTodo() {
      this.$store.dispatch("addTodo");
      this.$store.dispatch("clearTodo");
    },

    //timer methods
    timerRun(){
      this.timerRunning = true;
      this.interval = setInterval(this.countdownTimer, 100);
      console.log(this.totalTime);
    },
    timerPause(){
      this.timerRunning = false;
      clearInterval(this.interval);
    },
    timerReset(){
      this.timerRunning = false;
      clearInterval(() => { this.interval; });
      this.totalTime = (25 * 60);
    },
    timerCountdown(){
      console.log('working');
      this.timerRunning = true;
      this.interval = setInterval(this.updateCurrentTime, 1000);
      //counts down from 60 seconds * 1000
      setInterval(() => {
        this.timerMinutes--
      }, 60*1000)

      //check if seconds at double zero and then make it a 59 to countdown from
      //need another method of checking the number while in the loop then then 
      //adding a zero on the number under 10
      if(this.timerSeconds == '00'){
        this.timerSeconds = 59;
        setInterval(() => {
          this.timerSeconds--
        }, 1000);
      }else{
        setInterval(() => {
          this.timerSeconds--
        },1000)
      }
    },
    countdownTimer(){
      if(this.timerRunning == true){
        this.totalTime--;
      }
    }
  
  },
  computed: {
    newTodo() {
      return this.$store.getters.newTodo;
    },
    time: function(){
      return this.minutes + " : " + this.seconds;
    },
    minutes: function(){
      var min = Math.floor(this.totalTime / 60);
      return min >= 10 ? min : '0' + min;
    },
    seconds: function(){
      var sec = this.totalTime - (this.minutes * 60);
      return sec >= 10 ? sec : '0' + sec;
    }
  }
};
</script>