<template>
  <nav>
    <div class="brand">
      <img src="@/assets/icons/logos/brand.png">
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style lang="scss" scoped>
nav {
  background: $primary-color;
  display: flex;
  justify-content: space-between;
  .brand img {
    height: 50px;
  }
  a {
    display: inline-block;
    margin: 0px 10px;
    color: white;
  }
}
</style>
