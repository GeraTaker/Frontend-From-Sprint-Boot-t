<template>
  <div class="flex justify-center items-center mt-10">
    <div class="overflow-x-auto w-full max-w-screen-lg mx-auto">
      <div class="buscar-button-container p-6">
        <button @click="buscarPorTitulo" class="buscar-button animate-bounce">Buscar por Título</button>
      </div>

      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-2 px-4 text-left">ID y Titulo</th>
            <th class="py-2 px-4 text-left">Detalles</th>
            <th class="py-2 px-4 text-left">Video</th>
            <th class="py-2 px-4 text-left">Imagen</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(receta, index) in recetas"
            :key="index"
            class="bg-gray-100"
          >
            <td class="py-2 px-4 text-center">
              <div class="font-semibold text-blue-500">
                {{ receta.id_receta }} - {{ receta.titulo }}
              </div>
            </td>
            <td class="py-2 px-4">
              <div>
                <span class="text-cyan-600">Ingredientes: </span><br>
                <span class="text-cyan-900">{{ receta.ingrediente }}</span
                ><br />
                <span class="text-gray-600"
                  >Tiempo: {{ receta.tiempo }} hrs | Nivel:
                  {{ receta.nivel }}</span
                >
              </div>
            </td>
            <td class="py-2 px-4 text-center">
              <iframe width="300" height="200" :src="receta.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </td>
            <td class="py-2 px-4 text-center">
              <img
                :src="receta.imagen"
                alt="Imagen de la Receta"
                class="w-28 h-28 object-center object-cover rounded-full"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import recetas from "../../api/recetas.js";
import swal from "sweetalert2";

export default {
  data() {
    return {
      data: null,
      recetas: null,
      message: null,
      status: 0,
      flag: 0,
      res: null,
      titulo: "",
    };
  },
  methods: {
    async cargarRecetas() {
      try {
        const response = await recetas.axios.request(recetas.options);
        this.actualizarDatos(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async buscarPorTitulo() {
      const { value: titulo } = await swal.fire({
        title: "Buscar por Título",
        html: '<h2>"Para encontrar todos usa la palabra mágia"</h2><h3>Todos</h3><input id="swal-input1" class="swal2-input" placeholder="Ingrese el título">',
        focusConfirm: false,
        preConfirm: () => {
          return document.getElementById("swal-input1").value;
        },
      });

      if (titulo) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/v1/recetas/getByTitulo/${titulo}`
          );
          if (response.data.Flag === false) {
            swal.fire({
              title: "No existe esa Receta",
              text: response.data.Message + ", Estatus:" + response.data.Flag,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            this.actualizarDatos(response.data);
          }
        } catch (error) {
          swal.fire({
            title: "No existe esa Receta",
            text: "La receta: "+titulo+ ", de momento no esta disponible",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    },

    actualizarDatos(data) {
      this.data = data;
      this.recetas = data.Data;
      this.status = data.Status;
      this.message = data.Message;
      this.flag = data.Flag;
      this.res = this.flag === false ? "error" : "success";
      this.titulo =
        this.flag === false ? "No hay recetas" : "Recetas encontradas";

      swal.fire({
        title: this.titulo,
        text: this.message + ", Estatus:" + this.status,
        icon: this.res,
        confirmButtonText: "OK",
      });
    },
  },
  async mounted() {
    await this.cargarRecetas();
  },
};
</script>





<style scoped>
  .buscar-button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .buscar-button {
    @apply bg-green-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out;
  }

  .buscar-button:hover {
    @apply bg-green-600;
  }
</style>