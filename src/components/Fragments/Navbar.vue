<script setup>

  import { useStore } from 'vuex'
  import { firstLetter } from '@/services/useful'

  const store = useStore()
  const user = store.getters.getUser

</script>

<template>

  <div class="w-full bg-white rounded-md mb-4 py-2 px-2 flex-centered justify-end">
    <div class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-yuppi rounded-full">
      <span class="font-medium text-white">{{ firstLetter(user.firstname) }}{{ firstLetter(user.lastname) }}</span>
    </div>
  </div>

</template>

<style scoped>

</style>