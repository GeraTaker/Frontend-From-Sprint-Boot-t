<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
      <!-- Tarjetas de productos -->
      <div v-for="product in products" :key="product.producto_id" class="bg-gradient-to-br from-teal-100 to-teal-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 relative mx-2 my-2">
        <!-- Agregado: SweetAlert2 para "Ver Detalles" -->
        <button @click="showDetails(product)" class="absolute top-2 right-2 bg-teal-500 text-white py-1 px-2 rounded-full hover:bg-teal-600">
          Ver Detalles
        </button>

        <img :src="product.photo" alt="Product" class="w-full h-48 object-cover mb-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-2">{{ product.nombre }}</h2>
        <p class="text-gray-700 mb-4">{{ product.descripcion }}</p>
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500">{{ product.categoria.nombre }}</p>
          <p class="text-gray-500">{{ product.tipoProducto.nombre }}</p>
        </div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500">Tienda: {{ product.tienda.nombre }}</p>
          <p class="text-gray-500">Disponible: {{ product.cantidad }}</p>
        </div>
        <p class="text-green-500 font-bold text-lg">${{ product.precio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import producto from "../../api/producto.js";
import Swal from "sweetalert2";

export default {
  props: [""],
  data() {
    return {
      data: null,
      products: null,
      message: null,
      status: 0,
      flag: 0,
      res: null,
      titulo: "",
    };
  },
  components: {},
  methods: {
    async cargarProducto() {
      try {
        const response = await producto.axios.request(producto.options);
        this.data = response.data;
        this.products = this.data.Data;
        this.message = this.data.Message;
        this.status = this.data.Status;
        this.flag = this.data.Flag;
        this.res = this.flag === false ? "error" : "success";
        this.titulo =
          this.flag === false ? "No Hay productos" : "Si hay productos";
        console.log(this.products);
      } catch (error) {
        console.error(error);
      }
      Swal.fire({
        title: this.titulo,
        text: this.message + ", Estatus:" + this.status,
        icon: this.res,
        confirmButtonText: "OK",
      });
    },
    // Método modificado para utilizar SweetAlert2
    showDetails(product) {
      Swal.fire({
        title: product.nombre,
        html: `
          <img src="${product.photo}" alt="Product" class="w-full h-48 object-cover mb-4 rounded-lg shadow-lg">
          <p class="text-gray-500">${product.descripcion}</p>
          <p class="text-gray-500">Categoría: ${product.categoria.nombre}</p>
          <p class="text-gray-500">Tipo de Producto: ${product.tipoProducto.nombre}</p>
          <p class="text-gray-500">Tienda: ${product.tienda.nombre}</p>
          <p class="text-gray-500">Disponible: ${product.cantidad}</p>
          <p class="text-green-500 font-bold text-lg">$${product.precio}</p>
        `,
        showCloseButton: true,
        confirmButtonText: "Cerrar",
      });
    },
  },
  beforeMount() {},
  mounted() {
    this.cargarProducto();
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>

</style>
