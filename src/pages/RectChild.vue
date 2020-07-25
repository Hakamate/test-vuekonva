<template>
  <v-stage
    ref="stage"
    :config="stageSize"
    @click="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
    @dblclick="crazyMode"
  >
    <v-layer ref="layer">
      <v-text
        :config="{
          text: `Rectangle(s) : ${rectangles.length}`,
          x: 5, y: 5, fontSize: 20, fontStyle: 'bold',
        }"
      />
      <v-text
        :config="{
          text: crazyModeBool ? 'Crazy Mode !' : '',
          x: 5, y: 25, fill: 'red',
          fontSize: 15, fontStyle: 'bold',
        }"
      />
      <!-- 
        We also can do this to print text
        <v-text v-for="item in configText" :key="item.id" :config="item"/> 
      -->
      <v-rect v-for="item in rectangles" :key="item.id" :config="item" />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight - 78; // 78 -> nav Height
let maxSize = height / 4;
const crazyModeInterval = 500;

import Konva from "konva";

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height,
      },
      configText: [
        // use it if you want to v-for text
      ],
      rectangles: [
        {
          x: this.getRandomInt(width - maxSize),
          y: this.getRandomInt(height - maxSize),
          width: maxSize,
          height: maxSize,
          fill: Konva.Util.getRandomColor(),
          name: "rect1",
        },
      ],
      selectedShapeName: "",
      crazyModeBool: false,
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
      if (rect) {
        this.selectedShapeName = name;
        this.rectExplode(rect);
      }
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

    crazyMode() {
      if (this.crazyModeBool === false) {
        this.crazyModeBool = true;

        // change rectangles positions every time (crazyModeInterbal it's a duration)
        this.intervalCrazyMode = setInterval(() => {
          this.rectangles.forEach((element) => {
            element.x = this.getRandomInt(width - maxSize);
            element.y = this.getRandomInt(height - maxSize);
          });
        }, crazyModeInterval);
      } else {
        clearInterval(this.intervalCrazyMode);
        this.crazyModeBool = false;
      }
    },

    // allow to use all canvas space
    getMaxRectSizeForCanvasSize() {
      // get the biggest rect width
      const maxSizeInArray = Math.max.apply(
        Math,
        this.rectangles.map((r) => {
          return r.width;
        })
      );
      if (maxSizeInArray < maxSize && maxSizeInArray !== -Infinity)
        maxSize = maxSizeInArray;
    },

    getRandomInt(maxInt) {
      return Math.floor(Math.random() * Math.floor(maxInt));
    },
  },
};
</script>
