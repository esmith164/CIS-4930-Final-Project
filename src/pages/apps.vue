<script lang="ts" setup>
import { ref } from 'vue';
import { useDataStore } from '@/stores/data';
import io from 'socket.io-client';

const store = useDataStore();
const appName = ref('My App');
const appText = ref('');
const isCreateOpen = ref(false);
const handleSaveApp = () => {
  console.log(store.apps);
  store.apps.push({
    name: appName.value,
    commands: appText.value,
  });
  appName.value = '';
  appText.value = '';
  isCreateOpen.value = false;
};
const handleRunCode = (app) => {
  console.log(app);
  const socket = io('http://localhost:3000');
  const commands = app.commands.split('\n');
  socket.emit('client_message', { commands });
  
};
</script>
<template>
  <div class="p-4">
    <div class="installed">
      <div class="flex mb-4 items-center">
        <div>
          <h4 class="font-semibold">Your Apps</h4>
          <p class="text-slate-500 text-xs">Manage and create your IoT applications</p>
        </div>
        <button class="bg-blue-600 text-white ml-auto p-2 text-xs rounded-lg h-8"
          @click="isCreateOpen = true">Create New App</button>
      </div>
      <!-- Create Window-->
      <div class="create-window text-xs mb-10"
        v-if="isCreateOpen">
        <div class="bg-white p-4 rounded-lg shadow-lg border">
          <h4 class="font-semibold text-lg">App Editor</h4>
          <h4 class="font-semibold mb-1">Instructions</h4>
          <p class="text-slate-500 text-xs mb-1">To write an app you must use the GatorByte .IOT Format</p>
          <p class="text-slate-500 text-xs mb-4">Each command should be the format: <span class="text-blue-700">Thing ID,Service ID,Param1,Param2</span></p>
          <input type="text"
            class="border p-2 rounded-lg w-full mt-2"
            v-model="appName"
            placeholder="App Name" />
          <textarea class="border p-2 rounded-lg w-full mt-2 h-[200px]"
            v-model="appText"
            placeholder="Code"></textarea>
          <div class="flex gap-2 mt-4">
            <button class="bg text-gray-500 p-2 text-xs rounded-lg h-8 ml-auto"
              @click="isCreateOpen = false">Cancel</button>
            <button class="bg-blue-600 text-white p-2 text-xs rounded-lg h-8"
              @click="handleSaveApp()">Save App</button>
          </div>
        </div>
      </div>
      <div class="apps grid grid-cols-3 gap-4">
        <div class="app border p-4 rounded-lg"
          v-for="app in store.apps"
          :key="app.name">
          <h4 class="font-semibold">{{ app.name }}</h4>
          <button class="bg-blue-600 text-white p-2 text-xs rounded-lg h-8 mt-2 w-full" @click="handleRunCode(app)">Run App</button>
        </div>
      </div>
    </div>
  </div>
</template>