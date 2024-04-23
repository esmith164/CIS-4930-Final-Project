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
  { field: 'Space ID', sortable: true, filter: true },
  { field: 'Type', sortable: true, filter: true },
  { field: 'Category', sortable: true, filter: true },
  { field: 'Description', sortable: true, filter: true, minWidth: 300 }
]);

</script>
<template>
  <div class="p-4">
    <h4 class="font-medium">Relationships</h4>
    <p class="text-xs mb-6 flex items-center gap-2">
      <div class="w-2 h-2 bg-green-400 rounded-full"></div>Live
    </p>
    <ag-grid-vue style="width: 100%; height: 500px;"
      class="ag-theme-quartz"
      :rowData="[...store.relationships]"
      :columnDefs="columns"></ag-grid-vue>
  </div>
</template>