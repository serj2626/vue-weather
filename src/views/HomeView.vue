<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import apiKey from "../../private";


const router = useRouter();

const toast = useToast();
const cityData = reactive({
  name: "",
  temp: null,
  humidity: null,
  wind: null,
  icon: null,
});
const resultSuccess = ref(false);


const searchQuery = ref("");

const getSearchResults = async () => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery.value}&lang=ru&appid=${apiKey}&units=metric`
    );

    cityData.name = res.data.name;
    cityData.temp = res.data.main.temp;
    cityData.humidity = res.data.main.humidity;
    cityData.icon = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
    cityData.wind = res.data.wind.speed;
    resultSuccess.value = true;
  } catch (error) {
    searchQuery.value = "";
    resultSuccess.value = false;
    toast.error("Город не найден");
  }
};

// get list cities with http://api.vk.com


const cityList = async () => {
  const res = await axios.get(`http://api.vk.com/method/database.getCities?need_all=1&country_id=1&count=&access_token=4f0e0e8c4f0e0e8c4f0e0e8c54f0e0e8c5&v=5.131`);
}



const previewCity = () => {
  router.push({
    name: "city",
    params: { city: cityData.name },
    query: {
      temp: cityData.temp,
      humidity: cityData.humidity,
      wind: cityData.wind,
      icon: cityData.icon,
    },
  });
};
</script>

<template>
  <main>
    <div class="container text-white">
      <div class="pt-4 mb-8 relative">
        <input @keyup.enter="getSearchResults" type="text" v-model="searchQuery"
          placeholder="Введите город и нажмите Ввод" class="py-2 px-1 w-full bg-transparent border-b 
          focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />

        <div class="absolute bg-weather-secondary text-white w-full 
          shadow-md py-2 px-1 top-[66px]" v-if="resultSuccess">
          <p class="py-2 pl-2">
            {{ cityData.name }}
            <span class="city-detail" @click="previewCity">смотреть погоду на сегодня</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.city-detail {
  cursor: pointer;
  color: darkkhaki;
}
</style>