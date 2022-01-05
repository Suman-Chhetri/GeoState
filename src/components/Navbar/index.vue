<template>
  <!-- <nav> -->
  <!--   <div class="brand"> -->
  <!--     <img src="@/assets/icons/logos/brand.png"> -->
  <!--   </div> -->
  <!-- </nav> -->
  <nav class="navbar navbar-dark bg-dark justify-content-between">
    <a class="navbar-brand">GeoState</a>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 px-4 my-sm-0" type="submit">Search</button>
    </form>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style lang="scss" scoped>
nav {
  padding-left: 10px;
  padding-right: 10px;
}
form.form-inline {
  display: flex;
  > * {
    margin: 4px 8px;
  }
}
</style>
