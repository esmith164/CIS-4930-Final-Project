<template>
  <div class="navigation-tabs text-sm flex gap-4 p-4 border-b">
    <h4 class="text-blue-600 font-bold my-auto mr-auto"><span class="text-orange-500">Gator</span>Byte</h4>
    <router-link to="/"
      class="border p-2 rounded-md">Things</router-link>
    <router-link to="/services"
      class="border p-2 rounded-md">Services</router-link>

    <router-link to="/relationships"
      class="border p-2 rounded-md">Relationships</router-link>
    <router-link to="/apps"
      class="border p-2 rounded-md">Apps</router-link>

  </div>
</template>
<style lang="css" scoped>
a {
  @apply duration-500 text-gray-800;
}

.router-link-exact-active {
  @apply bg-blue-500 text-white shadow-lg;
}
</style>