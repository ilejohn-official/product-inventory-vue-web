<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mt-3">
            <span class="navbar-brand">{{name}}</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto">
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <button @click="handle(primaryButton.action)" class="btn btn-outline-primary my-2 my-sm-0 me-sm-4 me-2"
                        type="button">{{primaryButton.name}}</button>
                    <button @click="handle(redButton.action)" id="delete-product-btn" class="btn btn-outline-danger my-2 my-sm-0"
                        type="button">{{redButton.name}}</button>
                </div>
            </div>
        </nav>

        <hr>
    </header>
</template>
<script>
    export default {
        props: {
            name: {
                type: String,
                default: "Product"
            },
            primaryButton: {
                type: Object,
                default: {
                    name: "",
                    action: "",
                },
            },
            redButton: {
                type: Object,
                default: {
                    name: "",
                    action: "",
                },
            },
        },
        methods: {
            handle(functionName){
                this.$emit('handle', functionName);
            }
        }
    }
</script>