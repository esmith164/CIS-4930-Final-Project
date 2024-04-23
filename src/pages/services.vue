<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import io from 'socket.io-client';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridVue } from "ag-grid-vue3"; // AG Grid Component
interface Service {
  'Name': string;
  'Thing ID': string;
  'Entity ID': string;
  'Space ID:': string;
  'Vendor': string;
  'AppCategory': string;
  'Description': string;
}
const services: Ref<Service[]> = ref([])
const columns = ref([
  { field: 'Name', sortable: true, filter: true },
  { field: 'Thing ID', sortable: true, filter: true },
  { field: 'Entity ID', sortable: true, filter: true },
  { field: 'Space ID', sortable: true, filter: true },
  { field: 'Vendor', sortable: true, filter: true },
  { field: 'AppCategory', sortable: true, filter: true },
  { field: 'Description', sortable: true, filter: true }
]);

// Ref to store the list of messages
const messages = ref([]);

// Function to set up socket connection and event listeners
function setupSocket() {
  const socket = io('http://localhost:3000'); // Change the URL if your server is on a different host

  socket.on('mcast_message', ({ message }) => {
    try {
      // Assuming the message is correctly formatted as a JSON string
      const data = JSON.parse(message);
      console.log('Received message:', data);

      if (data['Tweet Type'] === "Service") {
        console.log('Service Message', data);
        services.value.push(data); // Assuming `services` is a reactive reference
      }
    } catch (e) {
      console.error("Error parsing JSON!", e);
    }


  });

  socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
  });
}

// Connect to the WebSocket server when component is mounted
onMounted(() => {
  setupSocket();
});
</script>
<template>
  <div class="p-4">
    <h4>Services</h4>
    <p class="text-xs mb-6">Refreshed 30s ago</p>
    <ag-grid-vue style="width: 100%; height: 500px;"
      class="ag-theme-quartz"
      :rowData="[...services]"
      :columnDefs="columns"></ag-grid-vue>
  </div>
</template>