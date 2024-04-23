<script lang="ts" setup>
interface Thing {
  'Thing ID': number;
  'Name': string;
  'Space ID': number;
  'Vendor': string;
  'Description': string;
}
const things: Thing[] = [
  {
    'Thing ID': 1,
    'Name': 'Thing 1',
    'Space ID': 1,
    'Vendor': 'Vender 1',
    'Description': 'This is a description of Thing 1.'
  },
  {
    'Thing ID': 2,
    'Name': 'Thing 2',
    'Space ID': 1,
    'Vendor': 'Vender 2',
    'Description': 'This is a description of Thing 2.'
  }
]
</script>
<template>
  <div class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="border p-4"
        v-for="thing in things"
        :key="thing['Thing ID']">
        <h4 class="text-xl">
          {{ thing.Name }}
        </h4>
        <p class="text-sm mb-2">{{  thing['Description'] }}</p>
        <h4 class="text-sm">
          <span class="font-bold">Space ID: </span>
          {{ thing['Space ID'] }}
        </h4>
        <h4 class="text-sm">
          <span class="font-bold">Thing ID: </span>
          {{ thing['Thing ID'] }}
        </h4>
        <h4 class="text-sm">
          <span class="font-bold">Vendor: </span>
          {{ thing['Vendor'] }}
        </h4>

      </div>
    </div>
  </div>
</template>