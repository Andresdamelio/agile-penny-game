<template>
    <div class="rounded-circle bg-warning coin border border-dark"
         @click="press" :class="{
             pressed: isPressed,
             moved: moved
         }" v-show="!moved && received">
    </div>
</template>

<script>
    export default {
        name: "Coin",
        props: ['canBePressed', 'moved', 'received', 'height', 'width'],
        data(){
          return {
            isPressed: false,
          }
        },
      mounted(){
          this.$el.style.width = this.width;
          this.$el.style.height = this.height;
      },
        methods: {
            press(){
                if(this.isPressed){
                    /* update the deselection to parent*/
                    this.$emit('deselection');
                    this.isPressed = false;
                }
                else{
                    if(!this.canBePressed){
                        return;
                    }
                    /* Update selection to parent*/
                    this.$emit('selection');
                    this.isPressed = true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .coin {
      width: 30px;
      height: 30px;
        display: inline-block;
        cursor: pointer;
        transition: transform 0.5s;
    }

    .pressed {
        transform: rotateY(180deg);
        background-color: $main-color !important;
    }


</style>
