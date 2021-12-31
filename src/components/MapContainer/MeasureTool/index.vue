<template>
  <div id="measure-tool">
    <label for="measure-toggler">
      <input
        id="measure-toggler"
        type="checkbox"
        v-model="isMeasuring"
        @change="updateToolState"
      > Measure
    </label>
    <div v-if="isMeasuring" class="measure-types">
      <label style="margin-left: 7px;">
        <input
          type="radio"
          v-model="measureType"
          v-bind:value="distance"
          @change="updateToolState"
          > Distance
      </label>
      <label style="margin-left: -15px;">
        <input
          type="radio"
          v-model="measureType"
          v-bind:value="area"
          @change="updateToolState"
          > Area
      </label>
    </div>
  </div>
</template>

<script>
import { Draw } from 'ol/interaction';
import Tooltip from 'ol-ext/overlay/Tooltip';

export default {
  name: 'MeasureTool',
  data() {
    const distance = 'distance';
    const area = 'area';
    return {
      isMeasuring: false,
      measureType: area,
      distance: distance,
      area: area,
      drawLine: new Draw({ type: 'LineString' }),
      drawPolygon: new Draw({ type: 'Polygon' }),
      tooltip: new Tooltip()
    };
  },
  props: {
    getMap: {
      type: Function,
      required: true,
    },
  },
  computed: {
    isMeasuringLength()
    {
      return this.measureType == this.distance;
    },
    isMeasuringArea()
    {
      return this.measureType == this.area;
    }
  },
  mounted()
  {
    setTimeout(this.setupTools, 1500);
  },
  methods: {
    setupTools() {
      const map = this.getMap();

      map.addInteraction(this.drawLine);
      map.addInteraction(this.drawPolygon);
      this.drawLine.setActive(false);
      this.drawPolygon.setActive(false);
      map.addOverlay(this.tooltip);

      // Set feature on drawstart
      this.drawLine.on('drawstart', this.tooltip.setFeature.bind(this.tooltip));
      // Remove feature on finish
      this.drawLine.on(['change:active','drawend'], this.tooltip.removeFeature.bind(this.tooltip));

      // Set feature on drawstart
      this.drawPolygon.on('drawstart', this.tooltip.setFeature.bind(this.tooltip));
      // Remove feature on finish
      this.drawPolygon.on(['change:active','drawend'], this.tooltip.removeFeature.bind(this.tooltip));
    },
    updateToolState()
    {
      if (this.isMeasuring)
      {
        this.drawPolygon.setActive(this.isMeasuringArea);
        this.drawLine.setActive(this.isMeasuringLength);
      }
      else
      {
        this.drawLine.setActive(false);
        this.drawPolygon.setActive(false);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#measure-tool {
  margin-top: 2px;
  background: $primary-color;
  color: $light-color;
  padding: 2px;
}
label {
  cursor: pointer;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
