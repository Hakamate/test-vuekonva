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
      <v-rect :config="food" />
      <v-rect v-for="item in snake" :key="item.id" :config="item" />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight - 78; // 78 -> nav Height
const caseByColAndRow = 20;
const sizeSnake = Math.round((height < width ? height : width) / caseByColAndRow);
const snakeColor = "#38b2ac";
const snakeColor2 = '#00867f'
const colormap = "rgb(205, 205, 205)";



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
          x: 2 * sizeSnake, // this.getRandomInt(caseByColAndRow) * sizeSnake,
          y: 0, // this.getRandomInt(caseByColAndRow) * sizeSnake,
          width: sizeSnake,
          height: sizeSnake,
          fill: snakeColor,
        },
      ],
      food: {
        x: this.getRandomInt(caseByColAndRow) * sizeSnake,
        y: this.getRandomInt(caseByColAndRow) * sizeSnake,
        width: sizeSnake,
        height: sizeSnake,
        fill: 'red',
        },
      selectedShapeName: "",
      directionKey: "d",
    };
  },

  mounted() {
    window.addEventListener(
      "keyup",
      (event) => (this.directionKey = event.key)
    );

    this.createMap();

    setInterval(() => {
      this.playGame();
    }, 100);
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

    playGame() {
      let oldHead = {
        x: this.snake[0].x,
        y: this.snake[0].y,
      };

      switch (this.directionKey) {
        case "ArrowUp":
          oldHead.y -= sizeSnake;
          break;
        case "ArrowDown":
          oldHead.y += sizeSnake;
          break;
        case "ArrowLeft":
          oldHead.x -= sizeSnake;
          break;
        case "ArrowRight":
          oldHead.x += sizeSnake;
          break;
        default:
          break;
      }

      this.updateGame(oldHead);
    },

    updateGame(snakeHead) {

      // check if snake bit itself
      this.biteTail(snakeHead)

      if(!this.foodTouch(snakeHead))
        this.snake.pop();
      else {
        this.food.x = this.getRandomInt(caseByColAndRow) * sizeSnake
        this.food.y = this.getRandomInt(caseByColAndRow) * sizeSnake
      }

      if (snakeHead.x >= caseByColAndRow*sizeSnake)
        snakeHead.x = 0
      else if (snakeHead.x < 0)
        snakeHead.x = caseByColAndRow*sizeSnake - sizeSnake
      else if (snakeHead.y >= caseByColAndRow*sizeSnake) 
        snakeHead.y = 0 
      else if (snakeHead.y < 0)
        snakeHead.y = caseByColAndRow*sizeSnake - sizeSnake

      this.snake.unshift({
        x: snakeHead.x,
        y: snakeHead.y,
        width: sizeSnake,
        height: sizeSnake,
        fill: this.snake.length %2 ? snakeColor2 : snakeColor,
      });
    },

    foodTouch(snakeHead){
      return (this.food.x === snakeHead.x && this.food.y === snakeHead.y) ? true : false
    },

    biteTail(snakeHead){
      this.snake.forEach((snakeSquare,index) => {
        if(this.snake.length > 1 && index > 0 && snakeSquare.x === snakeHead.x && snakeSquare.y === snakeHead.y)
          this.replayGame()
      })
    },

    replayGame(){
      this.snake.splice(1)
    },

    createMap() {
      let lastX = 0;
      let lastY = 0;

      for (let index = 0; index < caseByColAndRow; index++) {
        for (let index = 0; index < caseByColAndRow; index++) {
          this.map.push({
            x: lastX,
            y: lastY,
            width: sizeSnake,
            height: sizeSnake,
            fill: colormap,
            stroke: colormap,
          });
          lastX += sizeSnake;
        }
        lastX = 0;
        lastY += sizeSnake;
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
<style></style>
