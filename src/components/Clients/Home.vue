<script setup>

  import { computed, inject, onBeforeMount, reactive, ref } from 'vue'
  import { useStore } from 'vuex'
  import { getRequest } from '@/services/api'
  import Modal from '@/components/Fragments/Modal.vue'
  import Navbar from '@/components/Fragments/Navbar.vue'
  import Input from '@/components/Fragments/form/Input.vue'
  import Button from '@/components/Fragments/form/Button.vue'

  const store = useStore()
  const axios = inject('axios')

  // Modal
  const modal = ref(false)
  const modalName = ref('book-appointment')

  // modal Book form
  const providers = ref([])
  const appointments = ref([])
  const bookDate = ref(null)
  const bookTime = ref(null)

  const datetime =  computed( () => {
    return new Date(bookDate.value + 'T' + bookTime.value)
  })

  const modalForm = reactive({
    title: '',
    description: '',
    date: datetime,
    provider: null,
    isAccepted: false,
    client: store.getters.getUser.id
  })

  const getProviders = async () => {
    let result = await getRequest('providers?populate[user]=*')
    providers.value = result.data
  }

  const getAppointments = async () => {
    let meetings = await getRequest('appointments?populate=*')
    appointments.value = meetings.data
    console.log(appointments.value)
  }

  onBeforeMount( async () => {
    let pending = [getProviders(), getAppointments()]

    await Promise.all(pending)
  })

  const submitAppointment = async (e) => {
    e.preventDefault()
    console.log(modalForm)

    try {

      await axios.post(`${import.meta.env.VITE_BASE_URL}/appointments`,
          { data: modalForm }, {
        headers: store.getters.getHeaders
      })
      .then( () => {
        getAppointments()
        modal.value = false
      })

    } catch (e) {
      console.log(e)
    }
  }

</script>

<template>

  <div v-if="store.getters.isLoggedIn">

  <Navbar />

  <Button
      button-text="Book an appointment"
      :data-modal-toggle="'modal-' + modalName"
      @click="modal = !modal"
  />

  <div>
    <a
        href="#"
        v-for="(appointment, index) in appointments"
        :key="index"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <span>{{ appointment.attributes.provider.data.attributes.service }}</span><span>{{ appointment.attributes.date }}</span>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ appointment.attributes.title }}</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">{{ appointment.attributes.description }}</p>
    </a>
  </div>

  <Modal
      title="Book an appointment"
      :template="modalName"
      v-show="modal"
      @close-modal="modal = !modal"
  >
    <template #[modalName]>

      <form @submit="submitAppointment">


        <div class="mt-6 w-full">
          <label>
            Provider
            <select
                id="provider"
                v-model="modalForm.provider"
                :required="true"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >

              <option disabled value="">--Please choose a provider--</option>
              <option v-for="(provider, index) in providers" :key="index" :value="provider.id">{{ provider.attributes.user.data.attributes.username }}</option>
            </select>
          </label>

        </div>

        <div class="w-full grid grid-cols-2 gap-4">
          <div>
            <Input
                name="date"
                type="date"
                v-model:value="bookDate"
                @update="(v) => bookDate = v"
                :required="true"
            ></Input>
          </div>

          <div>
            <Input
                name="time"
                type="time"
                v-model:value="bookTime"
                @update="(v) => bookTime = v"
                :required="true"
            ></Input>
          </div>
        </div>

        <div class="mt-6 w-full">
          <Input
              name="title"
              type="text"
              v-model:value="modalForm.title"
              @update="(v) => modalForm.title = v"
              :required="true"
          ></Input>
        </div>

        <div class="mt-6 w-full">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
              name="description"
              id="description"
              v-model="modalForm.description"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Explain your request here...">
          </textarea>
        </div>

        <Button
            button-text="Book"
            button-type="submit"
        />

      </form>

    </template>
  </Modal>
  </div>

</template>

<style scoped>

</style>