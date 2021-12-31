<template>
   <i :style="style" :class="size" v-bind="$props"></i>
</template>

<script>
export default {
   name: 'svg-icon-wrapper',
   props: {
      color: {
         type: String,
         default: '#373737'
      },
      size: {
         type: String,
         default: 'medium',
         validator: value => [ "x-small","small", "medium", "large","x-large"].includes(value),
      },
      url: {
         type: String,
         required: true,
      }
   },
   computed: {
      style()
      {
         return {
            mask:            `url(${this.url}) no-repeat center / contain`,
            '-webkit-mask':  `url(${this.url}) no-repeat center / contain`,
            backgroundColor: this.color,
         };
      }
   }
}
</script>

<style lang="scss" scoped>
i {
   display: inline-block;
   @include setIconSizeClasses();
}
</style>
