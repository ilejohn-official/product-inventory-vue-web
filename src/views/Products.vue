<template>
  <Header
    @handle="(value) => this[value]()"
    name="Product List"
    :primaryButton="primaryButton"
    :redButton="redButton"
  />
  <main v-if="!loading">
    <template v-if="massDeleteError">
      <div
        class="alert alert-danger alert-dismissible fade show mt-2"
        role="alert"
      >
        <strong>Error!</strong> {{ deleteErrorMessage }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        >
        </button>
      </div>
    </template>

    <div class="row mt-5" v-if="hasProducts">
      <div v-for="(product, index) in products" :key="index" class="col-sm-3">
        <div class="card mb-3">
          <div class="card-body">
            <div class="form-check">
              <input
                class="form-check-input delete-checkbox"
                type="checkbox"
                :value="product.id"
                :id="`checkbox${product.id}`"
              />
              <label
                class="form-check-label"
                :for="`checkbox${product.id}`"
              ></label>
            </div>

            <p class="card-text text-center">{{ product.sku }}</p>
            <p class="card-text text-center">{{ product.name }}</p>
            <p class="card-text text-center">${{ product.price }}</p>
            <p class="card-text text-center">
              {{
                `${product.attribute.key} : ${product.attribute.value} ${
                  product.attribute.unit !== "CM" ? product.attribute.unit : ""
                }`
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-muted font-italic">
        No product(s) added. Click "ADD" to add products
      </p>
    </div>
  </main>
</template>

<script>
import Header from "@/components/Header.vue";
import { request } from "../request.js";
export default {
  components: { Header },
  data() {
    return {
      products: [],
      massDeleteError: false,
      deleteErrorMessage: "",
      primaryButton: {
        name: "ADD",
        action: "showAddProductPage",
      },
      redButton: {
        name: "MASS DELETE",
        action: "massDelete",
      },
      loading: true
    };
  },
  computed: {
    hasProducts() {
      return this.products.length > 0;
    },
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      request
        .get("/products")
        .then((response) => {
          this.products = response.data.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .finally(() =>{
          this.loading = false
        });
    },
    massDelete() {
      let ids = [];

      let boxes = document.querySelectorAll("input.delete-checkbox");
      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked === true) {
          ids.push(Number(boxes[i].value));
        }
      }

      if (ids.length < 1) {
        this.deleteErrorMessage = "You can only delete selected fields.";
        this.massDeleteError = true;
        setTimeout(() => {
          this.massDeleteError = false;
        }, 3000);
        return;
      }

      this.products = this.products.filter(({id}) => {
        !ids.includes(id)
      });

      request({
        method: "post",
        url: "/delete-products",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: { ids: JSON.stringify(ids) },
      })
        .then(() => {
        })
        .catch(() => {
          this.deleteErrorMessage = "Something went wrong, try again later.";
          this.massDeleteError = true;
        })
        .finally(() => {
          this.getAllProducts();
        });
    },
    showAddProductPage() {
      this.$router.push("/add-product");
    },
  },
};
</script>
