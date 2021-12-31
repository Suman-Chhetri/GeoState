<template>
  <div class="home">
    <MapContainer/>
  </div>
</template>

<script>
// @ is an alias to /src
import MapContainer from '@/components/MapContainer';

export default {
  name: 'Home',
  components: {
    MapContainer
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  min-height: 100vh;
}
</style>
