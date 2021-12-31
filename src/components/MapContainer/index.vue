<template>
  <div id='map'>
    <div class='base-layer-selector-wrapper'>
      <BaseLayerSelector :get-map="getMap" large/>
      <MeasureTool :get-map="getMap"/>
    </div>
    <div class="tools">
    </div>
  </div>
</template>

<script>
import BaseLayerSelector from '@/components/MapContainer/BaseLayerSelector';
import MeasureTool from '@/components/MapContainer/MeasureTool';
import { initMap,animateToExtent } from '@/js/map';

export default {
  name: 'MapContainer',
  components: {
    BaseLayerSelector,
    MeasureTool,
  },
  data() {
    return {
      map: null,
      ktmExtent: [85.25740245466136, 27.652044913747996, 85.38262603847531, 27.746338487151636],
    };
  },
  mounted()
  {
    this.map = initMap({target: 'map'});
    setTimeout(() => animateToExtent(this.map, this.ktmExtent), 100);
  },
  methods: {
    getMap() {
      return this.map;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~ol/ol.css';

#map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #ccc;
  text-align: center;
  position: relative;
}

.base-layer-selector-wrapper {
  right: 5px;
  top: 2px;
  position: absolute;
  width: 100px;
}
</style>
