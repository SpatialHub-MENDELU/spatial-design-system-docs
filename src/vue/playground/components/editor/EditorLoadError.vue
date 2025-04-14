<script lang="ts" setup>
const refreshPage = () => {
  window.location.reload();
};
</script>

<template>
  <div
    class="h-full w-full relative flex flex-col justify-center items-center gap-4 py-24"
    role="alert"
  >
    <div
      class="flex flex-col rounded justify-center items-center lg:gap-4 gap-3 border border-red bg-red/25 px-4 py-6"
    >
      <i
        class="pi pi-exclamation-triangle lg:text-[48px] text-[32px]"
        aria-hidden="true"
      ></i>
      <div>
        <strong class="font-bold lg:text-[32px] text-[24px] text-center block"
          >Something went wrong.</strong
        >
        <p class="lg:text-[16px] text-[15px] text-center">
          There was a problem loading the editor. Please refresh the page.
        </p>
      </div>
      <button
        class="bg-red hover:bg-red/75 text-white font-semibold px-4 py-2 rounded transition"
        @click="refreshPage"
      >
        Refresh
      </button>
    </div>
  </div>
</template>
