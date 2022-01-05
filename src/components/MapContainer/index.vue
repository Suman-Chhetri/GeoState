<template>
  <div id='map'>
    <ParcelHoverInfo :get-map="getMap"/>
    <div class="tools">
      <AdvancedSearch/>
    </div>
    <div class='base-layer-selector-wrapper'>
      <BaseLayerSelector :get-map="getMap" large/>
      <MeasureTool :get-map="getMap"/>
    </div>
    <div class="featured-wrapper"><FeaturedList/></div>
  </div>
</template>

<script>
import FeaturedList from '@/components/MapContainer/FeaturedList';
import BaseLayerSelector from '@/components/MapContainer/BaseLayerSelector';
import MeasureTool from '@/components/MapContainer/MeasureTool';
import ParcelHoverInfo from '@/components/MapContainer/ParcelHoverInfo';
import AdvancedSearch from '@/components/MapContainer/AdvancedSearch';
import { initMap,animateToExtent } from '@/js/map';

export default {
  name: 'MapContainer',
  components: {
    BaseLayerSelector,
    MeasureTool,
    ParcelHoverInfo,
    FeaturedList,
    AdvancedSearch,
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
.tools {
  position: absolute;
  top: 7em;
  left: .5em;
  z-index: 100;
}
.featured-wrapper {
  position: absolute;
  right: 0.5em;
  bottom: 0.5em;
  z-index: 100;
}
</style>
