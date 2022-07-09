<template>
  <div class="container-fluid">
    <RouterView />

    <footer>
      <hr />
      <div class="text-center">Scandiweb Test assignment</div>
    </footer>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
hr {
  height: 0.5px;
  background-color: black;
}
footer {
  position: absolute;
  bottom: 2%;
  width: 98%;
}
</style>
