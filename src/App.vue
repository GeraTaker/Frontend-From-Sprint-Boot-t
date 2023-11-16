<template>
  <div id="app">
<header
      v-if="$route.path !== '/login'"
      class="bg-gradient-to-r from-blue-500 via-blue-700 to-green-500 p-4 animate__animated animate__fadeIn flex justify-between items-center"
    >
      <div class="text-white text-center flex items-center">
        <div>
          <h1 class="text-3xl font-bold mb-2">Bienvenido al E-Commerce</h1>
          <p class="text-lg">Desarrollado con Maven, Java, y Spring Boot</p>
        </div>
      </div>
      <div class="animate-spin">
        <img
          src="https://www.nextre.it/wp-content/uploads/2020/09/spring-boot-scaled-1.jpg"
          class="rounded-full w-20 h-20"
          alt="Spring Boot"
        />
      </div>
    </header>

    <nav
      class="bg-gradient-to-r from-blue-500 via-blue-700 to-green-500 p-4 flex justify-between items-center animate__animated animate__slideInUp"
    >
      <div class="flex items-center space-x-4">
        <div class="animate-bounce">
          <router-link to="/" class="text-white flex items-center">
            <svg
              class="h-6 w-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
            Productos
          </router-link>
        </div>

        <div class="animate-bounce">
          <router-link to="/recetas" class="text-white flex items-center">
            <i class="fas fa-utensils text-2xl mr-2"></i>
            Recetas
          </router-link>
        </div>

        <div class="animate-bounce">
          <router-link to="/about" class="text-white flex items-center">
            <svg
              class="h-6 w-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
            Acerca de
          </router-link>
        </div>



        <div class="animate-bounce">
          <router-link to="/" class="text-white flex items-center">
            <svg
              class="h-6 w-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.73a2 2 0 0 0 2-1.61L20 4H6"
              ></path>
              <circle cx="6" cy="19" r="2"></circle>
              <circle cx="18" cy="19" r="2"></circle>
            </svg>

            Carrito
          </router-link>
        </div>

        
                <div class="animate-bounce">
     
          <router-link to="/login" class="text-white flex items-center">
            <svg
              class="h-6 w-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
            Iniciar Sesión
          </router-link>
        </div>
      </div>

->
      <p class="text-white animate__animated animate__fadeIn animate__delay-1s">
        {{ currentTime }}
      </p>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const currentTime = ref(new Date().toLocaleTimeString());

    setInterval(() => {
      currentTime.value = new Date().toLocaleTimeString();
    }, 1000);

    return { currentTime };
  },
};
</script>

<style>

</style>
