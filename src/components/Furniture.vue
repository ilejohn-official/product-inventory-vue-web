<template>
  <div id="Furniture" class="d-grid gap-2">
    <div class="form-group row">
      <label for="height" class="col-sm-2 col-form-label">Height (CM)</label>
      <div class="col-sm-4">
        <input
          type="number"
          class="form-control"
          :class="{
            'is-invalid':
              errors.height ||
              (errors.attribute && !form.attributeValue.height),
          }"
          id="height"
          min="0.01"
          step="0.01"
          v-model="form.attributeValue.height"
        />
        <div class="invalid-feedback">
          {{ errors.height || errors.attribute }}
        </div>
      </div>
    </div>
    <div class="form-group row">
      <label for="width" class="col-sm-2 col-form-label">Width (CM)</label>
      <div class="col-sm-4">
        <input
          type="number"
          class="form-control"
          :class="{
            'is-invalid':
              errors.width || (errors.attribute && !form.attributeValue.width),
          }"
          id="width"
          min="0.01"
          step="0.01"
          v-model="form.attributeValue.width"
        />
        <div class="invalid-feedback">
          {{ errors.width || errors.attribute }}
        </div>
      </div>
    </div>
    <div class="form-group row">
      <label for="length" class="col-sm-2 col-form-label">Length (CM)</label>
      <div class="col-sm-4">
        <input
          type="number"
          class="form-control"
          :class="{
            'is-invalid':
              errors.lenght ||
              (errors.attribute && !form.attributeValue.lenght),
          }"
          id="length"
          min="0.01"
          step="0.01"
          v-model="form.attributeValue.lenght"
        />
        <div class="invalid-feedback">
          {{ errors.lenght || errors.attribute }}
        </div>
        <small><i>Please provide dimensions in HxWxL </i></small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: {},
    },
    errors: {
      type: Object,
      default: {},
    },
  },
};
</script>
