<template>
  <v-stage
    ref="stage"
    :config="stageSize"
    @click="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
  >
    <v-layer ref="layer">
      <!-- <v-text
        :config="{
          text: `Rectangle(s) : ${snake.length}`,
          x: 5, y: 5, fontSize: 20, fontStyle: 'bold',
        }"
      />-->
      <v-rect v-for="item in map" :key="item.id" :config="item" />

      <!-- 
        We also can do this to print text
        <v-text v-for="item in configText" :key="item.id" :config="item"/> 
      -->
    </v-layer>

    <v-layer>
      <v-rect v-for="item in snake" :key="item.id" :config="item" />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight - 78; // 78 -> nav Height
const caseByColAndRow = 30;
const sizeSnake = (height < width ? height : width) / caseByColAndRow;

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
      map: [],
      snake: [
        {
          x: this.getRandomInt(caseByColAndRow) * sizeSnake,
          y: this.getRandomInt(caseByColAndRow) * sizeSnake,
          width: sizeSnake,
          height: sizeSnake,
          fill: "#38b2ac",
          name: "rect1",
        },
      ],
      selectedShapeName: "",
      directionKey: "d",
    };
  },

  mounted() {
    window.addEventListener("keyup", (event) => {
      this.moveSnake(event.key);
    });

    this.createMap();
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
      const rect = this.snake.find((r) => r.name === name);
      if (rect) {
        this.selectedShapeName = name;
        this.rectExplode(rect);
      }
    },

    moveSnake(key) {
      console.log(key);
      this.directionKey = key;
      // ZQSD 90 top 115 bottom 113 left 100 right
      switch (key) {
        case "z":
          console.log(this.snake.y);
          this.snake.y -= sizeSnake;
          console.log(this.snake.y);
          break;
        case "s":
          console.log("bottom");
          this.snake.y += sizeSnake;
          break;
        case "q":
          console.log("left");
          this.snake.x -= sizeSnake;
          break;
        case "d":
          console.log("right");
          this.snake.x += sizeSnake;
          break;
        default:
          break;
      }
    },

    createMap() {
      console.log(this.snake.y);
      const smallerInt = this.getSmaller(height, width);
      const colAndRowNumber = smallerInt / caseByColAndRow;
      let lastX = 0;
      let lastY = 0;
      let color1choose = "rgb(218, 218, 218)";
      let color2choose = "rgb(205, 205, 205)";

      for (let index = 0; index < caseByColAndRow; index++) {
        for (let index = 0; index < caseByColAndRow; index++) {
          this.map.push({
            x: lastX,
            y: lastY,
            width: colAndRowNumber,
            height: colAndRowNumber,
            fill: index % 2 ? color1choose : color2choose,
          });
          lastX += colAndRowNumber;
        }

        [color1choose, color2choose] = [color2choose, color1choose];
        lastX = 0;
        lastY += colAndRowNumber;
      }
    },

    getRandomInt(maxInt) {
      return Math.floor(Math.random() * Math.floor(maxInt));
    },

    getSmaller(int1, int2) {
      return int1 < int2 ? int1 : int2;
    },
  },
};
</script>
<style>
</style>
