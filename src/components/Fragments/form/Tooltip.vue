<script setup>

  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import Question from '@/components/Fragments/icons/Question.vue'

  const store = useStore()
  const iconColor = ref(store.getters.fade)
  const props = defineProps({
    template: {
      type: String,
      default: 'tooltipText'
    }
  })

</script>

<template>
  <div>
    <button
        type="button"
        class="cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-blue-800"
        @mouseover="iconColor = store.getters.primary"
        @mouseleave="iconColor = store.getters.fade"
        :data-tooltip-target="'tooltip-'+ template"
        data-tooltip-trigger="click"
    >

      <Question :color="iconColor"/>

    </button>

    <div :id="'tooltip-' + template" role="tooltip" class="w-fit inline-block absolute !right-5 invisible z-10 py-2 px-4 text-sm font-medium text-white bg-indigo-800 dark:bg-indigo-800 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
      <slot :name="template"></slot>
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* === FLOWBITE CSS === */
.tooltip {
  transform: translate3d(20px, -35px, 0) !important;
}
</style>