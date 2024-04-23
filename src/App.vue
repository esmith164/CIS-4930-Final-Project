<script lang="ts" setup>
import NavigationTabs from './components/navigation-tabs.vue';
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/data';
import io from 'socket.io-client';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const store = useDataStore();
function setupSocket() {
  const socket = io('http://localhost:3000');
  socket.on('mcast_message', ({ message }) => {
    try {
      //
      // Parse JSON Message
      //
      const data = JSON.parse(message);
      //
      // Fitler messages by category and store message in stores
      //
      if (data['Tweet Type'] === "Identity_Thing") {
        // check if already exists
        const el = store.things.find((el) => el['Name'] === data['Name']);
        if (!el) {
          store.things.push(data);
        }
      } else if (data['Tweet Type'] === "Relationship") {
        const el = store.relationships.find((el) => el['Name'] === data['Name']);
        if (!el) {
          store.relationships.push(data);
        }
      } else if (data['Tweet Type'] === "Service") {
        // check if already exists
        const el = store.services.find((el) => el['Name'] === data['Name']);
        if (!el) {
          store.services.push(data);
        }
      }
    } catch (e) {
      console.error("Error parsing JSON!", e);
    }
  });

  socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });
  socket.on('result', (msg) => {
    $toast.success(`Incoming sensor result: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
  });
}

onMounted(() => {
  setupSocket();
});
</script>
<template>
  <NavigationTabs />
  <RouterView />
</template>