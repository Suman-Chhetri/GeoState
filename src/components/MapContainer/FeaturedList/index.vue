<template>
  <div class='featured-list'>
    <div class='header'>
      Featured Lands
    </div>
    <FeaturedCard
      v-for="land in lands"
      :key="land.id"
      :land="land"
    />
  </div>
</template>

<script>
import FeaturedCard from '@/components/MapContainer/FeaturedCard';

export default {
  name: "FeaturedList",
  components: {
    FeaturedCard,
  },
  data() {
    const lands = [
      {
        "title": "4 Anna land on sale on Tokha",
        "location": "Tokha, Kathmandu",
        "area": "4 Anna",
        "propertyType": "Land",
        "offerType": "For Sale",
        "rate": "34 Lakhs per Anna",
        "road": "20f",
        "img": "https://gharjhagga.com/wp-content/uploads/2021/10/WhatsApp-Image-2021-09-14-at-11.27.14-AM-1.jpeg",
        "link": "https://gharjhagga.com/properties/land/kathmandu/4-aana-land-on-sale-at-ramilo-dada-tokha/"
      },
      {
        "title": "9 Anna land on sale on Pashikot, Budanilkantha",
        "location": "Tokha, Kathmandu",
        "area": "9 Anna",
        "propertyType": "Land",
        "offerType": "For Sale",
        "rate": "23 Lakhs per Anna",
        "road": "13ft",
        "img": "https://gharjhagga.com/wp-content/uploads/2021/10/WhatsApp-Image-2021-09-21-at-8.13.57-PM-1.jpeg",
        "link": "https://gharjhagga.com/properties/land/kathmandu/9-aana-land-on-sale-at-pashikotbhudhanilkhantha/"
      }
    ];
    return { lands };
  }
}
</script>
<style lang="scss" scoped>
.featured-list {
  padding: 4px;
}
.featured-list {
   @include setBlurGlassBackground();
}
</style>
