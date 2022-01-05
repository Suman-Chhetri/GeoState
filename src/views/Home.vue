<template>
  <div class="home">
    <NavBar/>
    <MapContainer/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/Navbar';
import MapContainer from '@/components/MapContainer';

export default {
  name: 'Home',
  components: {
    MapContainer,
    NavBar,
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  height: 100vh;
  max-height: 1000px;
  grid-template-rows: auto minmax(0,1fr);
}
</style>
