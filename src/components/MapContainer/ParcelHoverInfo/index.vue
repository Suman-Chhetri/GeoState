<template>
  <div class='parcel-hover-info' :style="divStyle">
    <img :src='parcel.imgUrl' class="parcel-img">
    <hr>
    <div class="details">
      <div>&bull; Parcel No.: {{ parcel.parcelNo }}</div>
      <div>&bull; Owner: {{ parcel.owner}}</div>
      <div>&bull; Cost: {{ parcel.cost }}</div>
      <div>&bull; Area: {{ parcel.area }}</div>
    </div>
  </div>
</template>

<script>
const getDefaultParcelInfo = () => {
  return {
    parcelNo: null,
    owner: null,
    cost: null,
    imgUrl: null,
    area: null,
  };
};

export default {
  name: 'ParcelHoverInfo',
  props: {
    getMap: {
      type: Function,
      required: true,
    },
  },
  data() {
    const parcelInfo = getDefaultParcelInfo();
    return {
      isVisible: false,
      position: {
        x: null,
        y: null,
      },
      parcel: parcelInfo, 
    }
  },
  computed: {
    divStyle() {
      return {
        left: this.position.x,
        top: this.position.y,
        opacity: this.isVisible ? 1 : 0
      }
    },
  },
  mounted() {
    setTimeout(this.setup, 1500);
  },
  methods: {
    setup() {
      const map = this.getMap();
      let selected = null;
      map.on('pointermove', (e) =>
      {
        console.log('pointer is moving');
        if (selected !== null) {
          selected = null;
        }

        map.forEachFeatureAtPixel(e.pixel, feature => {
          selected = feature;
          return true;
        }, {
          layerFilter: layer => {
            return layer.get('id')==='parcel';
          }
        });
        if (selected) {
          this.position = { x: `${parseInt(e.pixel[0])}px`, y: `${parseInt(e.pixel[1])}px` };
          this.parcel = selected.getProperties();
          this.isVisible = true;
          console.log(this.position, this.parcel, this.isVisible)
        } else {
          this.parcel = getDefaultParcelInfo();
          this.position = { x: undefined, y: undefined };
          this.isVisible = false;
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.parcel-hover-info {
  text-align: left;
  position: absolute;
  padding: 5px;
  border-radius: 3px;
  background: #fff8;
  color: black;
  z-index: 100;
  .parcel-img {
    width: 20em;
  }
  .details {
    padding: 0 1em;
  }
}
</style>
