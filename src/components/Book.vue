<template>
    <div class="form-group row" id="Book">
        <label for="weight" class="col-sm-2 col-form-label">Weight (KG)</label>
        <div class="col-sm-4">
          <input type="number" class="form-control" :class="{'is-invalid' : errors.weight || errors.attribute }" id="weight" min="0.01" step="0.01" v-model="form.attributeValue.weight">
          <small><i>Please provide weight in KG </i></small>
          <div class="invalid-feedback">
              {{errors.weight || errors.attribute}}
          </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    props: {
      form: {
        type: Object,
        default: {}
      },
      errors: {
        type: Object,
        default: {}
      },
    },
  };
  </script>
  