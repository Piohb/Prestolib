<script setup>

  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { caps } from '@/services/useful'
  import Tooltip from '@/components/Fragments/form/Tooltip.vue'
  import Eye from '@/components/Fragments/icons/Eye.vue'

  const store = useStore()
  const emit = defineEmits(['update'])
  const props = defineProps({
    type: {
      type: String,
      default: 'text',
      validator: (type) => ['text', 'email', 'password', 'checkbox', 'date', 'time'].includes(type),
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: [String, Boolean, Date, null],
      default: '',
      required: true
    },
    label: String,
    inputClass: String,
    inputId: String,
    tooltipText: String|null,
    placeholder: String,
    required: Boolean
  })

  const showPwd = ref(false)
  const eyeColor = ref(store.getters.fade)

</script>

<template>

  <div class="relative flex items-center" v-if="type !== 'checkbox'">
    <label :for="name" class="baseLabel">
      {{ label ? label : caps(name) }}
      <span class="isRequired" title="is required" v-if="required">*</span>
    </label>

    <Tooltip :template="name" v-if="tooltipText || (type === 'password' && tooltipText !== null)">

      <template #[name] v-if="type === 'password'">
        Votre mot de passe doit contenir : <br>
        * * Au moins une majuscule <br>
        * * Au moins un chiffre <br>
        * * Au moins 8 caractères <br>
      </template>

      <template #[name] v-else>{{ tooltipText }}</template>

    </Tooltip>
  </div>

  <div class="relative flex items-center justify-center">
    <input
        :name="name"
        :type="type !== 'password' ? type : (showPwd ? 'text' : 'password')"
        :value="value"
        @input="$emit('update', $event.target.value)"
        :class="'baseInput ' + (inputClass ?? '')"
        :id="inputId !== '' ? inputId : name"
        :aria-labelledby="name"
        :placeholder="placeholder"
        :required="required"
    />
    <label :for="name" class="baseLabel" v-if="type === 'checkbox'">
      {{ label !== '' ? label : caps(name) }}
      <span class="isRequired" title="is required" v-if="required">*</span>
    </label>

    <div
        class="absolute right-0 mt-2 mr-3 cursor-pointer"
        v-if="type === 'password'"
        @click="showPwd = !showPwd"
    >
      <Eye
          :open="!showPwd"
          :color="eyeColor"
          @mouseover="eyeColor = store.getters.primary"
          @mouseleave="eyeColor = store.getters.fade"
      />
    </div>
  </div>

</template>

<style lang="scss" scoped>
.baseLabel {
  @apply pr-1;
  @apply pb-0.5;
  @apply text-gray-800;
  @apply text-base;
  @apply font-medium;
  @apply leading-none;
}

.baseInput {
  @apply w-full;
  @apply py-3;
  @apply pl-3;
  @apply mt-2;
  @apply border;
  @apply rounded;
  @apply bg-gray-200;
  @apply text-gray-800;
  @apply text-base;
  @apply font-medium;
  @apply outline-indigo-700;
  @apply leading-none;

  &[type="checkbox"]{
    appearance: none;
    vertical-align: middle;
    background-origin: border-box;
    user-select: none;
    flex-shrink: 0;
    @apply w-4;
    @apply h-4;
    @apply p-0;
    @apply text-indigo-700;
    @apply bg-white;
    @apply border-fade;
    @apply border;
    @apply rounded;
    @apply border-solid;

    &:checked {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 8.586 5.707 7.293z'/%3E%3C/svg%3E");
      background-size: 100% 100%;
      @apply border-transparent;
      @apply bg-indigo-700;
      @apply bg-center;
      @apply bg-no-repeat;
    }

    &:focus {
      outline: none;
      @apply ring-2;
      @apply ring-blue-800;
      @apply border-white;
    }
  }
}

.isRequired {
  @apply text-red-500;
}

/* === FLOWBITE CSS === */
.tooltip[data-popper-placement^=right]>.tooltip-arrow {
  left: -4px;
}

[role=tooltip]>[data-popper-arrow]:before, [role=tooltip]>[data-popper-arrow]:after {
  content: "";
  transform: rotate(45deg);
}

[data-popper-arrow], [data-popper-arrow]:before {
  @apply absolute;
  @apply w-2;
  @apply h-2;
}

[role=tooltip]>[data-popper-arrow]:after {
  border-color: #e5e7eb;
  border-style: solid;
  @apply bg-indigo-700;
}

[data-popper-arrow]:after {
  @apply absolute;
  height: 9px;
  width: 9px;
}
</style>