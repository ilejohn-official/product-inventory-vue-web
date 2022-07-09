import { createRouter, createWebHistory } from "vue-router";
import Products from "../views/Products.vue";
import AddProducts from "../views/AddProducts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "products",
      component: Products,
    },
    {
      path: "/add-product",
      name: "add-product",
      component: AddProducts,
    },
  ],
});

export default router;
