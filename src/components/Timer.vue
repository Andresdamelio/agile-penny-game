<template>
  <div>
    <p v-if="running || (!running && !currentDate)">
      {{hours | formatTime}}:{{minutes | formatTime}}:{{seconds |formatTime}}
    </p>
    <p v-else-if="currentDate !== 0">
      PAUSADO
    </p>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: ['running', 'restart'],
  data(){
    return {
      currentDate: 0
    }
  },
  mounted(){
    setInterval(() => {
      if(!this.running){
        return;
      }
      this.currentDate += 1000;
      this.$emit('timeChange', {
        millis: this.currentDate,
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
      });
    }, 1000);
  },
  computed: {
    hours(){
      return Math.floor((this.currentDate / (1000 *60 *60)) % 24);
    },
    minutes(){
      return Math.floor((this.currentDate/ (1000* 60)) % 60);
    },
    seconds(){
      return Math.floor((this.currentDate/1000) % 60);
    },
  },
  watch: {
    restart(){
      this.currentDate = 0;
    }
  },
  filters: {
    formatTime(value) {
      if (value < 10) {
        return '0' + value;
      }
      return value;
    }
  }
}
</script>

<style scoped>

</style>
