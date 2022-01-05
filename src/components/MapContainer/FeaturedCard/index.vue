<template>
  <div class="card" style="width: 18rem; margin: 2px;">
    <a :href="land.link" target="_blank">
      <img class="card-img-top" :src="land.img" alt="Card image cap">
    </a>
    <div class="card-body">
      <p class="card-text">{{ land.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturedCard",
  props: {
    land: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
