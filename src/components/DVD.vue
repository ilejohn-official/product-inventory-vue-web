<template>
  <div class="form-group row" id="DVD">
    <label for="size" class="col-sm-2 col-form-label">Size (MB)</label>
    <div class="col-sm-4">
      <input
        type="number"
        class="form-control"
        :class="{ 'is-invalid': errors.size || errors.attribute }"
        id="size"
        min="0.01"
        step="0.01"
        v-model="form.attributeValue.size"
      />
      <small><i>Please provide size in MB </i></small>
      <div class="invalid-feedback">
        {{ errors.size || errors.attribute }}
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
