<template>
  <div id="container" class="p-8">
    <h1 class="text-3xl font-bold">Welcome to my Delia Test</h1>
    <p class="mt-6">
      <B>Context :</B>Build a small web page Using only html css and javascript (also Vue js or
      React or Angular ...).
    </p>
    <p class="mt-2">
      When the page load, user sees a big colored square that fits into the
      window and that is positioned randomly into the window.
    </p>
    <p class="mt-2">
      <b class="text-teal-500">
        When user clicks on the square, this one splits into 4 squares of a
        quarter of the size and positioned randomly into the window. The 4 new
        smaller squares have different colors also picked randomly
      </b>.
    </p>
    <p class="mt-2">
      When user clicks on any square again, squares splits again into 4 smaller
      ones with different colors and different positions.
    </p>
    <p class="mt-2">
      <b class="text-red-600">Careful</b>, squares should never fall out of the window. They should always
      fit entirely into the window.
    </p>
    <p class="mt-6 mb-6">
      <b>Bonus :</b>
      <i>
        To add more fun, user can activate and deactivate crazy mode by double
        clicking on the page. In crazy mode, squares change position randomly
        every 2 seconds !
      </i>
    </p>

    <router-link
      to="/rectchild"
      class="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >See Result</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
