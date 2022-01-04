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
  height: 100vh;
  min-height: 100vh;
}
</style>
