<template>
  <Header
    @handle="(value) => this[value]()"
    name="Product Add"
    :primaryButton="primaryButton"
    :redButton="redButton"
  />
  <main>
    <div v-if="addProductError" class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
      <strong>Error!</strong> {{addProductErrorMessage}}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
      </button>
    </div>

    <form id="product_form" class="d-grid gap-2">
        <div class="form-group row">
          <label for="sku" class="col-sm-2 col-form-label">SKU</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" :class="{'is-invalid' : errors.sku }" id="sku" v-model.trim="form.sku">
            <div class="invalid-feedback">
              {{errors.sku}}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" :class="{'is-invalid' : errors.name }" id="name" v-model.trim="form.name">
            <div class="invalid-feedback">
              {{errors.name}}
            </div>
          </div>
        </div>
        <div class="form-group row">
            <label for="price" class="col-sm-2 col-form-label">Price ($)</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" :class="{'is-invalid' : errors.price }" v-model="form.price" min="0.01" step="0.01" id="price">
              <div class="invalid-feedback">
                {{errors.price}}
              </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="productType" class="col-sm-2 col-form-label">Type Switcher</label>
            <div class="col-sm-4">
                <select name="productType" @change="clearAttribute($event)" id="productType" v-model="form.productType" class="form-select" :class="{'is-invalid' : errors.attributeValue }" >
                    <option disabled selected>Choose...</option>
                    <option v-for="type in productTypes" :key="type.key" :value="type">{{ type.id }}</option>
                </select>
                <div class="invalid-feedback">
                  {{errors.attributeValue}}
                </div>
            </div>
        </div>
        <component :errors="errors" :form="form" :is="component[form.productType.id]"></component>
    </form>
  </main>
</template>

<script>
  import Header from "@/components/Header.vue";
  import { shallowRef } from 'vue'
  import DVD from "@/components/DVD.vue";
  import Furniture from "@/components/Furniture.vue";
  import Book from "@/components/Book.vue";
  import {request} from "../request.js";

  let form = {
   productType: {},
   attributeValue: {}
  }

  let errors = {}

  export default {
    components: {Header,},
    data() {
    return {
      component: {
        DVD: shallowRef(DVD),
        Book: shallowRef(Book),
        Furniture: shallowRef(Furniture)
      },
      addProductError: false,
      addProductErrorMessage: "",
      productTypes: [
        {key: 'Size', unit: 'MB', id: 'DVD', measureCount: 1},
        {key: 'Weight', unit: 'KG', id: 'Book', measureCount: 1},
        {key: 'Dimension', unit: 'CM', id: 'Furniture', measureCount: 3}
      ],
      form : form,
      errors : errors,
      primaryButton: {
        name: "SAVE",
        action: "addProduct",
      },
      redButton: {
        name: "CANCEL",
        action: "showProductPage",
      },
    }
  },
  methods: {
    clearAttribute(event){
      form.attributeValue = {};
    },
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    validateForm(){
      if(!this.isNumeric(form.price) || parseFloat(form.price) < 0.01){
        this.errors.price = "Price must be a valid number greater than 0"
      }
      if(!form.name || form.name.length < 2){
        this.errors.name = "Please, submit required data: Name is required"
      }
      if(!form.sku || form.sku.length < 2){
        this.errors.sku = "Please, submit required data: SKU is required"
      }
      if(this.objLength(form.productType) < 1){
        this.errors.attributeValue = "Please, submit required data: Product type is required"
      }

      if (this.objLength(form.attributeValue) !== form.productType.measureCount) {
        this.errors.attribute = `Please, submit required data: ${this.objLength(form.productType) > 0 ? form.productType.id+' '+form.productType.key : 'Product measure'} is required`
      }
      if (this.objLength(form.attributeValue) === form.productType.measureCount) {
        let object = form.attributeValue;

        for (const key in object) {
          if (!this.isNumeric(object[key]) || parseFloat(object[key]) < 0.01) {
            this.errors[key] = `${key} must be valid number greater than 0`
          }
        }
      }
      
    },
    hasErrors(){
      return this.objLength(this.errors) > 0
    },
    objLength(object) {
      return Object.keys(object ?? {}).length
    },
    addProduct(){
      this.validateForm()

      if (this.hasErrors()) {
        setTimeout(() => {
          for (const key in this.errors){
            this.errors[key] = '';
          }
          this.errors = {}
         
        }, 5000);  
        return;
      }

      request({
        method: "post",
        url: '/products',
        headers: { 
          "Content-Type": "multipart/form-data" 
        },
        data: {...form, attributeValue : JSON.stringify(form.attributeValue)},
      })
      .then((response) => {
        this.showProductPage()
      })
      .catch( (error) => {
        const err = error.response?.data?.errors;

        if (this.objLength(err) > 0){
          for (const key in err){
            this.errors[key] = err[key].join()
          }

          setTimeout(() => {
            for (const key in this.errors){
              this.errors[key] = '';
            }
            this.errors = {}
          }, 5000);

        } else {
          this.addProductErrorMessage = "Something went wrong, Please check your input and try again."
          this.addProductError = true;
        }
      })
    },
    showProductPage() {
      this.$router.push("/");
    },
  }
  }
</script>
<style>
</style>
