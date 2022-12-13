<script setup>

</script>

<template>

  <div class="w-full h-full p-4 relative bg-gradient-to-tl from-green-400 to-indigo-900 overflow-auto">
    <router-view></router-view>
  </div>

</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  @apply fixed;
  @apply inset-0;
}
</style>
