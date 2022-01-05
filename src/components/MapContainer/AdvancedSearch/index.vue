<template>
  <div class="advanced-search">
    <form>
      <div class="form-group">
        <label for="area-select">Set area range</label>
        <select class="form-control" id="area-select">
          <option
            v-for="area,index in areaOptions"
            :key="index"
          >
            {{ area }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="price-range-select">Set price range(per anna)</label>
        <select class="form-control" id="price-range-select">
          <option
            v-for="priceRange,index in priceRangeOptions"
            :key="index"
            >
            {{ priceRange }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AdvancedSearch",
  data() {
    return {
      areaOptions: [
        "3 - 5Anna",
        "6 - 10Anna",
        "11Anna - 1Ropani",
        "1-5 Ropani",

      ],
      priceRangeOptions: [
        "5 - 10 Lakhs per anna",
        "11 - 20 Lakhs per anna",
        "21 - 30 Lakhs per anna",
        "31 - 40 Lakhs per anna",
        "41 - 50 Lakhs per anna",
      ]
    };
  },
}
</script>

<style lang="scss" scoped>
.advanced-search {
  @include setBlurGlassBackground();
  text-align: left;
  padding: 1em;
  select {
    margin: 4px 0;
  }
  button {
    margin: 4px 0;
  }
}
</style>
