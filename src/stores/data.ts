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
interface Relationship {
  Name: string,
  'Thing ID': string,
  'Space ID': string,
  'Type' : string,
  Category: string,
  Description: string
}
interface Thing {
  Name: string,
  'Thing ID': string,
  'Space ID': string,
  Vendor: string,
  Model: string,
  Description: string,
  OS: string
}
interface App {
  name: string,
  commands: string,
  startTime: string | null,
}
export const useDataStore = defineStore("data", () => {
  const services:Ref<Service[]> = ref([]);
  const relationships:Ref<Relationship[]> =  ref([]);
  const things:Ref<Thing[]>= ref([]);
  const apps:Ref<App[]> = ref([]);
  return {
    services,
    relationships,
    things,
    apps
  };
});
