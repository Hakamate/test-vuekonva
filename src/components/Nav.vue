<template>
  <header class="sticky top-0">
    <nav class="flex flex-row items-center justify-between bg-teal-500 p-6" id="navbar">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">H-VueKonva</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="flex flex-row text-sm text-left lg:flex-grow">
          <router-link
            to="/rectchild"
            class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            RectChild
          </router-link>
          <router-link
            to="/circleshoot"
            class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            CircleShoot
          </router-link>
          <router-link
            to="/snake"
            class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Snake
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style>
.router-link-active{
  font-weight: bold;
}


</style>
