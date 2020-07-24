<template>
  <header class="sticky top-0">
    <nav class="flex flex-row items-center justify-between bg-teal-500 p-6" id="navbar">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold text-xl tracking-tight">VueKonva Hakamate</span>
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
            to="/test"
            class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Test
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
