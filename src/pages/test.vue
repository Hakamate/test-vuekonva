<template>
  <div id="app">
      <v-stage ref="stage" :config="stageSize">
      <v-layer ref="layer">
        <v-text
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
          :config="{
            text: isDragging ? 'Go to another place' : 'Draggable Text',
            x: 50,
            y: 50,
            draggable: true,
            fontSize: 50,
            fill: isDragging ? 'green' : 'black'
          }"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight - 80;

export default {
  name: 'konva',
  components: {
  },
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      isDragging: false
    };
  },
  methods: {
    handleDragStart() {
      this.isDragging = true;
    },
    handleDragEnd() {
      this.isDragging = false;
    }
  },
}
</script>

