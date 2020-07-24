<template>
  <v-stage
    ref="stage"
    :config="stageSize"
    @click="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
  >
    <v-layer ref="layer">
      <v-text
        :config="timerConfig"
      />
      <v-text
        :config="scoreConfig"
      />
      <v-circle v-for="item in circles" :key="item.id" :config="item" />
    </v-layer>
  </v-stage>
</template>

<script>

const width = window.innerWidth;
const height = window.innerHeight - 80; // 80 -> nav Height
let maxSize = height/4;
let timer = 10000;
let score = 0;

import Konva from "konva";

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height,
      },
      circles: [],
      timerConfig:{
          text: "Time : " + timer,
          x: 5,
          y: 5,
          fill: 'red',
          fontSize: 20,
          fontStyle: 'bold',
      },
      scoreConfig:{
          text: "Score : " + score,
          x: 5,
          y: height - 20,
          fill: 'red',
          fontSize: 20,
          fontStyle: 'bold',
      },
      selectedShapeName: "",
    };
  },
  mounted(){
    this.createCircle()
  },
  methods: {
    handleStageMouseDown(e) {
      // if any circle are clicked
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        return;
      }
      // find clicked circle by its name
      const name = e.target.name();
      const circ = this.circles.find((r) => r.name === name);
      
      if (circ) {
        this.selectedShapeName = name;
        
        // Remove circle targeted
        this.circles.splice(this.circles.indexOf(circ), 1);
        
        score = score + 1
        this.scoreConfig.text = "Score : " + score
        this.checkWin()
      }
    },

    createCircle(){
      for (let index = 0; index < 5; index++) {
        this.circles.push({
          x: this.getRandomInt((maxSize/2),(width - maxSize/2)),
          y: this.getRandomInt((maxSize/2),(height - maxSize/2)),
          width: maxSize,
          height: maxSize,
          name: "circle" + index,
          fill: Konva.Util.getRandomColor(),
        });
      }
    },

    checkWin(){
      if (this.circles.length == 0) {
        alert('trop fort')
        
      }
    },

    getRandomInt(minInt, maxInt) {
      const min = Math.ceil(minInt);
      const max = Math.floor(maxInt);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
