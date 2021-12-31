<template>
  <div id='map'>
  </div>
</template>

<script>
import { initMap,getMap } from '@/js/map';

export default {
  name: 'MapContainer',
  data() {
    return {
      map: null,
    };
  },
  mounted()
  {
    console.log("HEllo");
    this.map = getMap({check: true});
    if (this.map==null)
    {
      this.map = initMap({target: 'map'});
    }
    else
    {
      this.map.setTarget('map');
    }
  },

}
</script>

<style lang="scss" scoped>
@import '~ol/ol.css';

#map {
  width: 100%;
  height: 100%;
  background: #ccc;
  text-align: center;
  position: relative;
}
</style>
