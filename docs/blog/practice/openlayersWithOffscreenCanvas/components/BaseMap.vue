<template>
  <div class="base-map">
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

import { WindLayer } from "ol-wind";

onMounted(() => {
  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    target: "map",
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
    controls: [],
  });

  fetch("./wind.json")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      const windLayer = new WindLayer(res, {
        forceRender: false,
        windOptions: {
          // colorScale: scale,
          velocityScale: 1 / 20,
          paths: 10000,
          // eslint-disable-next-line no-unused-vars
          colorScale: () => {
            // console.log(m);
            return "rgba(64, 64, 255, 1)";
          },
          width: 5,
          // colorScale: scale,
          generateParticleOption: false,
        },
        // map: map,
        // projection: 'EPSG:4326'
      });

      console.log(map, windLayer);

      map.addLayer(windLayer);
    });
});
</script>

<style lang="scss" scoped>
.base-map {
  #map {
    width: 100%;
    height: 600px;
  }
}
</style>
