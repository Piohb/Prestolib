<script setup>

  import {inject, reactive, ref} from 'vue'
  import { useStore } from 'vuex'
  import {useRoute, useRouter} from 'vue-router'
  import {authRequest} from '@/services/api'
  import Input from '@/components/Fragments/form/Input.vue'
  import Button from '@/components/Fragments/form/Button.vue'

  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const axios = inject('axios')

  const beforeRegister = () => {
    console.log('ici')
    if (form.password === confirm_password.value) {
      form.username = form.firstname + ' ' + form.lastname
      authRequest(form, {router, route}, 'register', Register)
    }
  }

  const Register = (res) => {
    let user = res.user
    user['token'] = res.jwt
    store.dispatch('login', user)

    try {
      let data = client
      let query = 'clients'

      if (res.user.isProvider){
        data = provider
        query = 'providers'
      }

      data['user'] = res.user.id

      axios.post(`${import.meta.env.VITE_BASE_URL}/${query}`, data, {
        headers: store.getters.getHeaders
      })

    } catch (e) {
      console.log(e)
    }
  }

  // Data
  const confirm_password = ref('')
  const form = reactive({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    isProvider: false
  })

  const client = reactive({
    address: '',
    zipcode: '',
    country: '',
  })

  const provider = reactive({
    service: null,
    phone: ''
  })

</script>

<template>
  <div class="mt-4 w-full">
    <Input
        name="email"
        type="email"
        v-model:value="form.email"
        @update="(v) => form.email = v"
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

  <div class="mt-4 w-full">
    <Input
        name="confirm_password"
        type="password"
        v-model:value="confirm_password"
        @update="(v) => confirm_password = v"
        label="Confirm password"
        :tooltip-text="null"
        placeholder="********"
        :required="true"
    ></Input>
  </div>

  <div class="flex items-center mt-2">
    <p class="text-fade">By creating an account, you accept the <a href="#" class="font-semibold text-indigo-700 hover:underline">general conditions of use</a> of Prestolib.</p>
  </div>

  <div class="w-full flex items-center justify-between py-5">
    <hr class="w-full bg-gray-400">
    <p class="w-full text-base text-center font-medium leading-4 px-2.5 text-gray-400">ABOUT YOU</p>
    <hr class="w-full bg-gray-400  ">
  </div>

  <div class="w-full flex flex-wrap justify-start items-center">
    <label for="user-type" class="text-lg font-bold leading-6 text-gray-800 mb-2 mr-5">Sign up AS</label>
    <select
        name="user-type"
        class="mb-2 text-center py-2.5 text-lg font-bold text-gray-800 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
        id="user-type"
        v-model="form.isProvider"
        :required="true"
    >
      <option :value="false" selected>Client</option>
      <option :value="true">Service provider</option>
    </select>
  </div>

  <div class="w-full grid grid-cols-2 gap-4 mt-4">
      <div>
        <Input
            name="firstname"
            type="text"
            v-model:value="form.firstname"
            @update="(v) => form.firstname = v"
            label="First Name"
            placeholder="John"
            :required="true"
        ></Input>
      </div>

      <div>
        <Input
            name="lastname"
            type="text"
            v-model:value="form.lastname"
            @update="(v) => form.lastname = v"
            label="Last Name"
            placeholder="Doe"
            :required="true"
        ></Input>
      </div>
    </div>

  <div v-if="!form.isProvider">
    <div class="mt-4 w-full">
      <Input
          name="address"
          type="text"
          v-model:value="client.address"
          @update="(v) => client.address = v"
          placeholder="..."
      ></Input>
    </div>

    <div class="mt-4 w-full grid grid-cols-2 gap-4">
      <div>
        <Input
            name="zipcode"
            type="text"
            v-model:value="client.zipcode"
            @update="(v) => client.zipcode = v"
            placeholder="00000"
        ></Input>
      </div>

      <div>
        <Input
            name="country"
            type="text"
            v-model:value="client.country"
            @update="(v) => client.country = v"
            placeholder="..."
        ></Input>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="mt-4 w-full">
      <label for="service-type" class="w-full pb-0.5 text-gray-800 text-base font-medium leading-none">Service type</label>
      <select
          name="service-type"
          class="w-full mt-2 p-2.5 border rounded bg-gray-200 text-gray-800 text-base font-medium appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
          id="service-type"
          v-model="provider.service"
          :required="true"
      >
        <option :value="null" selected disabled>-- select one --</option>
        <option value="plumber">Plumber</option>
        <option value="gardener">Gardener</option>
        <option value="nurse">Nurse</option>
      </select>
    </div>

    <div class="mt-4 w-full">
      <Input
          name="phone"
          type="text"
          v-model:value="provider.phone"
          @update="(v) => provider.phone = v"
          label="Phone number"
          placeholder="00 00 00 00 00"
      ></Input>
    </div>
  </div>

  <div class="mt-6">
    <Button
        button-text="Create Account"
        @click="beforeRegister"
    />
  </div>
</template>

<style scoped lang="scss">
#user-type {

  option {
    @apply font-bold;
    @apply text-gray-800;
    @apply text-lg;
    @apply text-center;
    @apply p-2.5;
    @apply border-none;

    &:checked {
      @apply hidden;
    }
  }
}

#service-type {
  option {
    &:checked {
      @apply hidden;
    }
  }
}
</style>