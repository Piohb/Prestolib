<script setup>

  const props = defineProps({
    buttonClass: String,
    buttonText: String,
    buttonType: String
  })

</script>

<template>

  <button
      :type="buttonType ?? 'submit'"
      role="button"
      :class="'baseButton ' + (buttonClass ?? '')"
  >
    {{ buttonText }}
  </button>

</template>

<style scoped>
.baseButton {
  @apply w-full;
  @apply py-4;
  @apply bg-indigo-700;
  @apply border;
  @apply rounded;
  @apply text-white;
  @apply text-base;
  @apply font-semibold;
  @apply leading-none;
  @apply hover:bg-indigo-600;
  @apply focus:ring-2;
  @apply focus:ring-offset-2;
  @apply focus:ring-indigo-700;
  @apply focus:outline-none;
}
</style>