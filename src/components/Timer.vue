<template>
  <div>
    <p
      v-if="running || (!running && !currentDate)"
      class="mb-0"
    >{{hours | formatTime}}:{{minutes | formatTime}}:{{seconds |formatTime}}</p>
    <p v-else-if="currentDate !== 0" class="mb-0">Pausado</p>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: ["running", "restart", "currentDate"],
  computed: {
    hours() {
      return Math.floor((this.currentDate / (1000 * 60 * 60)) % 24);
    },
    minutes() {
      return Math.floor((this.currentDate / (1000 * 60)) % 60);
    },
    seconds() {
      return Math.floor((this.currentDate / 1000) % 60);
    }
  },
  watch: {
    restart() {
      this.$emit("update:currentDate", 0);
    }
  },
  filters: {
    formatTime(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    }
  },
  mounted() {
    setInterval(() => {
      if (!this.running) {
        return;
      }
      this.$emit("update:currentDate", this.currentDate + 1000);
      this.$emit("timeChange", {
        millis: this.currentDate,
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours
      });
    }, 1000);
  }
};
</script>

<style scoped>
</style>
