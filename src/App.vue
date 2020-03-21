<template>
  <v-app>
    
    <v-content>
      <Pomodoro />
    </v-content>
   
  </v-app>
</template>

<script>
import Pomodoro from './components/Pomodoro';
export default {
  name: 'App',
  computed: {
  },
  components: {
    Pomodoro,
  }
};
</script>
