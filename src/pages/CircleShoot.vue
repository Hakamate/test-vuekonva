<template>
  <v-stage
    ref="stage"
    :config="stageSize"
    @click="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
  >
    <v-layer ref="layer">
      <v-text :config="timerConfig" />
      <v-text :config="scoreConfig" />
      <v-text :config="bestScoreConfig" />
      <v-text :config="playAgainConfig" @click="setNewGame" @touchstart="setNewGame"/>
      <v-circle v-for="item in circles" :key="item.id" :config="item" />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight - 78; // 78 -> nav Height
const maxSizeOption = height / 4;
const timerOption = 10000;
let maxSize = maxSizeOption;
let timer = timerOption;

import Konva from "konva";

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height,
      },
      circles: [],
      configs:[{
        // TODO: use v-for to group all config
      }],
      timerConfig: {
        name: 'timer',
        text: "Time : " + timer,
        x: 5,
        y: 30,
        fill: "red",
        fontSize: 20,
        fontStyle: "bold",
      },
      scoreConfig: {
        name: "score",
        text: this.score ? "Score : " + this.score : "Score : 0",
        x: 5,
        y: height - 20,
        fontSize: 20,
        fontStyle: "bold",
      },
      bestScoreConfig: {
        name:"bestscore",
        text: "Best Score : " + this.bestScore,
        x: 5,
        y: 5,
        fill: "black",
        fontSize: 20,
        fontStyle: "bold",
      },
      playAgainConfig: {
        name: 'playagain',
        text: "Play Again",
        x: -500,
        y: 50,
        fill: "red",
        fontSize: 20,
        fontStyle: "bold",
      },
      selectedShapeName: "",
      score: 0,
      bestScore: 0,
      playInterval: null,
      actualTimer: timer,
    };
  },
  mounted() {
    this.runRound();
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

        this.updateScore();
      }
    },

    runRound() {
      this.createCircle(maxSize);

      this.playInterval = setInterval(() => {
        if (this.actualTimer > 0) {
          this.actualTimer -= 100;
          this.timerConfig.text = `Time : ${
            Math.round(this.actualTimer)
          } ms`;
          this.checkForNextRound();
        }
      }, 100);
    },

    checkForNextRound() {
      if (this.circles.length == 0 && this.actualTimer > 0) {
        clearInterval(this.playInterval);

        this.setNextRoundOption();

        this.runRound(); // next round
      } else if (this.actualTimer <= 0) {
        clearInterval(this.playInterval);
        this.checkForBestScore();

        // print play button
        this.playAgainConfig.x = width/2

        // alert(
        //   `You lose with a score of : ${this.score} \nClick "OK" to play again`
        // );
      }
    },

    createCircle(sizeCircle) {
      for (let index = 0; index < 5; index++) {
        this.circles.push({
          x: this.getRandomInt((maxSize/2 + 40), (width - maxSize/2 - 20)), // 40 = best + time Height 20 = score Height
          y: this.getRandomInt((maxSize/2), (height - maxSize/2)),
          width: sizeCircle,
          height: sizeCircle,
          name: "circle" + index,
          fill: Konva.Util.getRandomColor(),
        });
      }
    },

    updateScore() {
      if (this.actualTimer > 0) {
        this.score = this.score + 1;
        this.scoreConfig.text = "Score : " + this.score;
        this.checkForNextRound();
      }
    },

    checkForBestScore() {
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        this.bestScoreConfig.text = "Best Score : " + this.bestScore;
      }
    },

    setNextRoundOption() {
      maxSize = maxSize * 0.85;
      timer = timer * 0.85;
      this.actualTimer = timer;
    },

    setNewGame(){
      this.playAgainConfig.x = -500

      timer = timerOption
      maxSize = maxSizeOption
      this.actualTimer = timer
      this.score = 0
      this.circles = []
      
      this.runRound()
    },

    getRandomInt(minInt, maxInt) {
      const min = Math.ceil(minInt);
      const max = Math.floor(maxInt);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
