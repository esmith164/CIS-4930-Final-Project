import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
interface Service {
  Name: string;
  "Thing ID": string;
  "Entity ID": string;
  "Space ID:": string;
  Vendor: string;
  AppCategory: string;
  Description: string;
}
export const useDataStore = defineStore("data", () => {
  const services:Ref<Service[]> = ref([]);
  return {
    services,
  };
});
