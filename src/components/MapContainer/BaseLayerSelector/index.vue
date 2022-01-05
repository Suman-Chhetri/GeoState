<template>
  <div class="base-layer-select-wrapper" :class="{'large': large}">
    <div class="base-layer-select-toggler text-white">
      <svg-icon url="/static/icons/base-layer-icon.svg" :color="large ? 'white' : '#23527a'"/>
        {{large ? 'Base Map' : ""}}
    </div>
    <div class="base-layer-select">
      <ul>
        <li @click="hideAllBaseLayers" :class="{'selected': selectedBaseLayer===0}">
          <img src="@/assets/icons/none.png"><br>
          None
        </li>
        <li @click="showOSM" :class="{'selected': selectedBaseLayer===1}" >
          <img src="@/assets/icons/osm.png"><br>
          OSM
        </li>
        <li @click="showBing" :class="{'selected': selectedBaseLayer===2}">
          <img src="@/assets/icons/bing.png"><br>
          Satelite
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import baseLayers from '@/js/layers/base.js';
import { getLayerById } from '@/js/layers/index.js';
import SvgIcon from '@/components/Utilities/SvgIcon';

export default {
  components: {
    SvgIcon,
  },
  data()
  {
    const selectedBaseLayer = 
      baseLayers.osm.getVisible() ? 1:
      baseLayers.bing.getVisible() ? 2:
      0;
    return {
      selectedBaseLayer,
    }
  },
  props: {
    large: {
      type: Boolean,
      required: true,
    },
    getMap: {
      type: Function,
      required: true,
    }
  },
  methods: {
    hideAllBaseLayers()
    {
      getLayerById('BING', this.getMap()).setVisible(false);
      getLayerById('OSM', this.getMap()).setVisible(false);
      this.selectedBaseLayer = 0;
      // Object.values(baseLayers).forEach(layer=>layer.setVisible(false));
    },
    showOSM()
    {
      this.hideAllBaseLayers();
      this.selectedBaseLayer = 1;
      getLayerById('OSM', this.getMap()).setVisible(true);
      // baseLayers.osm.setVisible(true);
    },
    showBing()
    {
      this.hideAllBaseLayers();
      this.selectedBaseLayer = 2;
      getLayerById('BING', this.getMap()).setVisible(true);
      // baseLayers.bing.setVisible(true);
    },
  }
}
</script>

<style lang="scss" scoped>

.base-layer-select-wrapper {
  font-family: $primary-font;
  color: $font-color;
  cursor: pointer;
  position: relative;
}

.base-layer-select-toggler {
  padding: 8px;
  margin: 4px;
  margin-left: 0px;
  display: grid;
  place-items: center;
  border: solid 1.3px lighten($primary-color, 8%);
  background: rgba(white, 0.2);
  text-align: center;
  z-index: 3;
  border-radius: 2px;
  order: 1;
}

.base-layer-select-wrapper.large {
  padding: 0;
  margin: 0;
  z-index: 1;
  .base-layer-select-toggler {
    border-radius: 0;
    font-size: 15px;
    // width: 4em;
    margin: 0;
    background: $primary-color;
    border: none;
    color: white;
    padding: 12px 8px;
    &:hover {
      background: lighten($primary-color, 10%);
    }
  }
}

.base-layer-select-toggler:hover + .base-layer-select,
.base-layer-select:hover {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-100%);
}

.base-layer-select {
  @include setBlurGlassBackground();
  position: absolute;
  top: 0;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
  transition: transform 0.8s ease-in-out, opacity 0.6s ease-in-out;

  ul {
    text-align: center;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    padding: 4px 10px;
    font-size: 14px;
    cursor: pointer;
    list-style: none;
    img {
      width: 70px;
      border: solid 2px lightgrey;
      height: 30px;
      transition: all 0.2s ease;
      box-shadow: 0px 2px 2px rgba(0,0,0,0.4);
      &:hover {
        border-color: $primary-color;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.5);
        transform: scale(1.025);
      }
    }
    &.selected {
      color: $primary-color;
      img {
        border-color: $primary-color;
        border-top: solid 4px $primary-color;
      }
    }
  }
}
</style>
