<template>
  <div id="app">
    <Nav/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Ydddddddddddour Vue.js App"/> -->
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Nav
  }
}
</script>

<style>
@import 'css/tailwindcss.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
