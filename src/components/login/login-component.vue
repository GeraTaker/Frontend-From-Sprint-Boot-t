<template>
  <div
    class="min-h-screen flex items-center justify-center"
    style="
      background: url('https://i.ytimg.com/vi/jLtZ5sCeuBw/maxresdefault.jpg');
      background-size: cover;
    "
  >
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2
        :class="{ 'animate__animated animate__fadeInDown': formSubmitted }"
        class="text-2xl font-semibold mb-6"
      >
        Iniciar Sesión
      </h2>
      <form @submit.prevent="login">
        <div
          :class="{ 'animate__animated animate__fadeInLeft': formSubmitted }"
          class="mb-4"
        >
          <label
            for="email"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Correo Electrónico</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div
          :class="{ 'animate__animated animate__fadeInLeft': formSubmitted }"
          class="mb-4"
        >
          <label
            for="password"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Contraseña</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          @click="animateForm"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: "",
      password: "",
      formSubmitted: false,
      message: null,
      status: 0,
      flag: 0,
      res: null,
      titulo: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8080/login", {
          email: this.email,
          password: this.password,
        });
        this.data = response.data;
        this.message = this.data.message;
        this.status = this.data.statusCode;
        this.flag = this.data.flag;
        this.res = this.flag === false ? "error" : "success";
        this.titulo = this.flag === false ? "No existe usted" : "Bienvenido Sr";

        const tokenIndex = response.data.message.indexOf("Con el token: ");
        const token = response.data.message.slice(tokenIndex + 14);
        console.log(token);
        localStorage.setItem("token", token);
        Swal.fire({
          title: this.titulo,
          text: this.message + ", Estatus:" + this.status,
          icon: this.res,
          confirmButtonText: "OK",
          timer: 5000,
          showConfirmButton: false,
        }).then(() => {
          this.$router.push("/pedido");
        });
      } catch (error) {
        Swal.fire({
          title: "no autorizado",
          text: "no estas autorizado",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error al iniciar sesión:", error);
      }
      this.formSubmitted = true;
    },
    animateForm() {
      this.formSubmitted = false;
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Arial", sans-serif;
}
</style>
