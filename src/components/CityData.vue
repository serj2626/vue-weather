<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const timeNow = new Date().toLocaleTimeString();
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

</script>

<template>


    <div class="flex flex-col flex-1 items-center">
        <div class="flex flex-col items-center mt-5 pt-12 pb-3
         px-3 border border-white border-opacity-25 rounded-2xl">
            <p class="text-white text-4xl mb-2">{{ route.params.city }}</p>
            <p class="text-white text-4xl mb-8">Температура: {{ Math.round(route.query.temp) }}°C </p>
            <p class="text-white text-2xl">Влажность: {{ route.query.humidity }}%</p>
            <p class="text-white text-2xl">Ветер: {{ route.query.wind }} м/с</p>
            <img  class="w-[150px] h-auto" :src="route.query.icon" alt="" />
        </div>
    </div>

</template>