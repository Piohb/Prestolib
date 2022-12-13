<script setup>
  import { reactive } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  import Input from '@/components/Fragments/form/Input.vue'
  import Button from '@/components/Fragments/form/Button.vue'
  import { authRequest } from '@/services/api'

  const router = useRouter()
  const route = useRoute()
  const store = useStore()

  const LogIn = (res) => {
    let user = res.user
    user['token'] = res.jwt
    store.dispatch('login', user)
  }

  // Data
  const form = reactive({
    identifier: '',
    password: '',
    cache: false
  })

</script>

<template>
  <div class="mt-4 w-full">
    <Input
        name="email"
        type="email"
        v-model:value="form.identifier"
        @update="(v) => form.identifier = v"
        placeholder="example@mail.com"
        :required="true"
    ></Input>
  </div>

  <div class="mt-4 w-full">
    <Input
        name="password"
        type="password"
        v-model:value="form.password"
        @update="(v) => form.password = v"
        placeholder="********"
        :required="true"
    ></Input>
  </div>

  <div class="flex items-center mt-2">
    <Input
        name="cache"
        type="checkbox"
        label="Stay connected ?"
        v-model:value="form.cache"
        @update="(v) => form.cache = v"
        input-class="!mt-0 mx-2"
    />
  </div>

  <div class="mt-6">
    <Button
        button-text="Connect"
        @click="authRequest(form, {router, route}, '', LogIn)"
    />
  </div>
</template>