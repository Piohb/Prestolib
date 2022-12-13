<script setup>

  import Navbar from '@/components/Fragments/Navbar.vue'
  import { useStore } from 'vuex'
  import { getRequest } from '@/services/api'
  import Button from '@/components/Fragments/form/Button.vue'
  import {onBeforeMount, ref} from "vue"
  const store = useStore()

  const appointments = ref([])
  onBeforeMount( async () => {
    let meetings = await getRequest('appointments?filter[provider][$eq]=2')
    appointments.value = meetings.data
    console.log(appointments.value)
  })


</script>

<template>

  <div v-if="store.getters.isLoggedIn">

    <Navbar />

    <div>
      <a
          href="#"
          v-for="(appointment, index) in appointments"
          :key="index"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <span>{{ appointment.attributes.date }}</span>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ appointment.attributes.title }}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{{ appointment.attributes.description }}</p>
        <Button
            v-if="!appointment.attributes.isAccepted"
            button-text="Accept ?"
        />
      </a>
    </div>

  </div>

</template>

<style scoped>

</style>