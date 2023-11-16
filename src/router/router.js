import { createRouter, createWebHistory } from 'vue-router';
import productsComponent from '../components/products/products-component.vue'
import aboutComponent from '../components/about /about-component.vue'
import recetasComponent from '../components/recetas/receta-component.vue'
import loginComponent from '../components/login/login-component.vue'
import pedidoComponent from '../components/pedidos/pedido-component.vue'

const routes = [
  { path: '/', component: productsComponent },
  { path: '/about/', component: aboutComponent },
  { path: '/recetas', component: recetasComponent },
  { path: '/login', component: loginComponent },
  { path: '/pedido', component: pedidoComponent },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
