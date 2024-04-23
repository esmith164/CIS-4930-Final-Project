<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import { useDataStore } from '@/stores/data';
import io from 'socket.io-client';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridVue } from "ag-grid-vue3"; // AG Grid Component
const store = useDataStore();
const columns = ref([
  { field: 'Name', sortable: true, filter: true },
  { field: 'Thing ID', sortable: true, filter: true },
  { field: 'Entity ID', sortable: true, filter: true },
  { field: 'Space ID', sortable: true, filter: true },
  { field: 'Vendor', sortable: true, filter: true },
  { field: 'AppCategory', sortable: true, filter: true },
  { field: 'Description', sortable: true, filter: true }
]);

</script>
<template>
  <div class="p-4">
    <h4>Services</h4>
    <p class="text-xs mb-6 flex items-center gap-2">
    <div class="w-2 h-2 bg-green-400 rounded-full"></div>Live
    </p>
    <ag-grid-vue style="width: 100%; height: 500px;"
      class="ag-theme-quartz"
      :rowData="[...store.services]"
      :columnDefs="columns"></ag-grid-vue>
  </div>
</template>