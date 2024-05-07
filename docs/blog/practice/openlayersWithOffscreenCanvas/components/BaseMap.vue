<template>
  <div class="base-map">
    <div id="map"></div>

    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import View from "ol/View.js";
import { Style, Fill, Stroke, Text } from "ol/style";
import { WindLayer } from "ol-wind";
import { ImageCanvas as ImageCanvasSource } from "ol/source";
import { Tile as TileLayer, Image as ImageLayer } from "ol/layer";
import { type FunctionType } from "ol/source/ImageCanvas";
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
      projection: "EPSG:4326",
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
        // projection: "EPSG:4326",
      });

      console.log(map, windLayer);

      map.addLayer(windLayer);
    });

  initCanvas(map);
});

function initCanvas(map) {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  const ctx = canvas?.getContext("2d");

  const style = new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.6)",
    }),
    stroke: new Stroke({
      color: "#319FD3",
      width: 1,
    }),
    text: new Text({
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "#000",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 3,
      }),
    }),
  });

  const source = new ImageCanvasSource({
    canvasFunction: renderCanvas,
  });

  const layer = new ImageLayer({
    source: source,
    zIndex: 10,
  });
  map.addLayer(layer);
}

const renderCanvas: FunctionType = (
  extent,
  resolution,
  pixelRatio,
  size,
  projection
) => {
  console.log("🚀 ~ extent:", extent);
  const canvas = document.createElement("canvas");
  const [width, height] = size;
  console.log("🚀 ~ size:", size);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return canvas;
  }
  const [lonStart, latStart, lonEnd, latEnd] = extent;
  const lonRange = lonEnd - lonStart;
  const latRange = latEnd - latStart;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (x !== y) continue;

      const coord = [
        (x / width) * lonRange + lonStart,
        (1 - y / height) * latRange + latStart,
      ];

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fill();
    }
  }

  return canvas;
};
</script>

<style lang="scss" scoped>
.base-map {
  #map {
    width: 100%;
    height: 600px;
  }

  #canvas {
    width: 100%;
    height: 600px;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
