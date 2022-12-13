<script setup>

  import { useRoute } from 'vue-router'
  const route = useRoute()

</script>

<template>

  <div class="flex flex-col items-center justify-center h-auto min-h-full">

    <form
        @submit="(e) => e.preventDefault()"
        class="bg-white shadow rounded-md lg:w-1/3 md:w-1/2 xsm:w-4/5 w-full p-10"
    >

      <div>
        <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">{{ route.meta.title }}</p>
        <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">{{ route.meta.subtitle }}
          <router-link
              :to="{ name: (route.name === 'Login') ? 'Register' : 'Login' }"
              class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"
          >
            Sign {{ route.name === 'Register' ? 'in' : 'up' }} here
          </router-link>
        </p>
      </div>

      <router-view></router-view>
    </form>
  </div>

</template>