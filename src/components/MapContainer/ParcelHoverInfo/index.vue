<template>
  <div class='parcel-hover-info' :style="divStyle">
    <img :src='parcel.imgUrl' class="parcel-img">
    <hr>
    <div class="details">
      <div>&bull; Parcel No.: {{ parcel.parcelNo }}</div>
      <div>&bull; Owner: {{ parcel.owner}}</div>
      <div>&bull; Cost: {{ parcel.cost }}</div>
      <div>&bull; Area: {{ parcel.area }}</div>
      <div><a class='detail-link' href="{{ parcel.clickLink }}" target="_blank">Go to details</a></div>
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
      // hover info for parcel polygons
      let selected = null;
      map.on('pointermove', (e) =>
      {
        if (selected !== null) {
          selected = null;
        }

        map.forEachFeatureAtPixel(e.pixel, feature => {
          selected = feature;
          return true;
        }, {
            layerFilter: layer => layer.get('id')==='parcel'
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
      // // click to link 
      // map.on('singleclick', (event) =>
      // {
      //     map.forEachFeatureAtPixel(event.pixel, feature =>
      //     {
      //       const url = feature.get('clickLink');
      //       window.open(url, '_blank');
      //     }, {
      //       layerFilter: layer => layer.get('id')==='parcel'
      //     });
      // });
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
  background: #fffe;
  color: black;
  z-index: 100;
  .parcel-img {
    width: 20em;
  }
  .details {
    padding: 0 1em;
  }
  .detail-link {
    background-color: #EA4C89;
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 20px;
    list-style: none;
    margin: 0;
    outline: none;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    vertical-align: baseline;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .detail-link:hover,
  .detail-link:focus {
    background-color: #F082AC;
  }

}
</style>
