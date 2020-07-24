<template>
  <v-stage
    ref="stage"
    :config="stageSize"
    @click="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
    @dblclick="crazyMod"
  >
    <v-layer ref="layer">
      <v-text
        :config="{
          text: crazyMode ? 'Crazy Mode !' : '',
          x: 5,
          y: 5,
          fill: 'red',
          fontSize: 20,
          fontStyle: 'bold',
        }"
      />
      <v-rect v-for="item in rectangles" :key="item.id" :config="item" />
      <v-transformer ref="transformer" />
    </v-layer>
  </v-stage>
</template>

<script>

const width = window.innerWidth;
const height = window.innerHeight - 80; // 80 -> nav Height
let maxSize = height / 4;
const crazyModeInterval = 1000;

import Konva from "konva";

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height,
      },
      rectangles: [
        {
          x: this.getRandomInt(width - maxSize),
          y: this.getRandomInt(height - maxSize),
          width: maxSize,
          height: maxSize,
          fill: "red",
          name: "rect1",
        },
      ],
      selectedShapeName: "",
      crazyMode: false,
      intervalCrazyMode: null,
    };
  },
  methods: {
    handleStageMouseDown(e) {
      // if any rect are clicked
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        return;
      }
      // find clicked rect by its name
      const name = e.target.name();
      const rect = this.rectangles.find((r) => r.name === name);
      if (rect) this.selectedShapeName = name;

      this.rectExplode(rect);
    },

    rectExplode(rect) {
      const targetSize = rect.width;
      const targetName = rect.name;

      // remove parent (target)
      this.rectangles.splice(this.rectangles.indexOf(rect), 1);

      this.getMaxRectSizeForCanvasSize();

      // create 4 children when parent explodes
      for (let index = 1; index < 5; index++) {
        this.rectangles.push({
          x: this.getRandomInt(width - maxSize),
          y: this.getRandomInt(height - maxSize),
          width: targetSize / 2,
          height: targetSize / 2,
          name: targetName + "/" + index,
          fill: Konva.Util.getRandomColor(),
        });
      }
    },

    crazyMod() {
      if (this.crazyMode === false) {
        this.crazyMode = true;

        // change rectangles positions every time (crazyModeInterbal it's a duration)
        this.intervalCrazyMode = setInterval(() => {
          this.rectangles.forEach((element) => {
            element.x = this.getRandomInt(width - maxSize);
            element.y = this.getRandomInt(height - maxSize);
          });
        }, crazyModeInterval);
      } else {
        clearInterval(this.intervalCrazyMode);
        this.crazyMode = false;
      }
    },

    getMaxRectSizeForCanvasSize() {
      // get the biggest rect width
      const maxSizeInArray = Math.max.apply(Math, this.rectangles.map((r) => { return r.width; }))
      if (maxSizeInArray < maxSize && maxSizeInArray !== -Infinity) maxSize = maxSizeInArray
    },

    getRandomInt(maxInt) {
      return Math.floor(Math.random() * Math.floor(maxInt));
    },
  },
};
</script>
