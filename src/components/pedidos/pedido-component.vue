<template>
<!-- <div v-for="(pedidos,index) in pedido" :key="index">
    <div v-for="(resultad,index) in pedidos" :key="index" >
        {{ resultad }}
    </div>
</div> -->
    <div class="container mx-auto mt-8">
    <h2 class="text-3xl font-semibold mb-4 text-center">Lista de Pedidos</h2>
    
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Pedido ID</th>
            <th class="py-2 px-4 border-b">Fecha Pedido</th>
            <th class="py-2 px-4 border-b">Nombre Usuario</th>
            <th class="py-2 px-4 border-b">Nombre Tienda</th>
            <th class="py-2 px-4 border-b">Tipo de Pago</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(pedidos, index) in pedido"
            :key="index"
            class="transition-transform hover:scale-105 transform cursor-pointer"
          >
            <td class="py-2 px-4 border-b">
              <div class="flex items-center">
                <img
                  src="https://creatuaplicacion.com/wp-content/uploads/2019/02/ver-pedidos.png"
                  alt="Pedido"
                  class="w-8 h-8 rounded-full mr-2"
                />
                {{ pedidos.pedido_id }}
              </div>
            </td>
            <td class="py-2 px-4 border-b">{{ pedidos.fecha_pedido }}</td>
            <td class="py-2 px-4 border-b">{{ pedidos.user.nombre }}</td>
            <td class="py-2 px-4 border-b">{{ pedidos.tienda.nombre }}</td>
            <td class="py-2 px-4 border-b">{{ pedidos.venta.tipoPago.nombre }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    data() {
    return {
      data : null,
      pedido: null,
      message: null,
      status: 0,
      flag: 0,
      res: null,
      titulo: "",
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://localhost:8080/api/v1/pedido/all", config)
        .then((response) => {
        this.data = response.data;
        this.pedido = this.data.Data;
        this.message = this.data.Message;
        this.status = this.data.Status;
        this.flag = this.data.Flag;
        this.res = this.flag === false ? "error" : "success";
        this.titulo =
          this.flag === false ? "No Hay pedido" : "Bienvenido, aqui estas sus pedidos";
          console.log(this.data.Flag);
        Swal.fire({
        title: this.titulo,
        text: this.message + ", Estatus:" + this.status,
        icon: this.res,
        confirmButtonText: "OK",
      });
        })
        .catch((error) => {
          console.error(error);
        });
       
    } else {
     Swal.fire({
          title: "No esta autorizado",
          text: "No deberias estar aqui hijo",
          icon: "error",
          confirmButtonText: "OK",
        });
      this.$router.push("/");
    }
  },
};
</script>
