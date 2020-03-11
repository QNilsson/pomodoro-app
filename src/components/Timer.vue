<template>
  <div id="timer2" class="container">
<div class="buttons">
  <v-btn small color="primary" dark @click="timerRun" v-if="!timerRunning">Start</v-btn>
  <v-btn small color="warning" dark @click="timerPause" v-if="timerRunning">Pause</v-btn>
  <v-btn small color="error" dark @click="timerReset" v-if="timerRunning">Restart</v-btn>
</div>

  </div><!--end timer2 div-->
</template>

<script>
export default {
  
  computed:{
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
  },
  methods:{
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
