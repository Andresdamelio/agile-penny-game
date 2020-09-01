<template>
    <div class="container-fluid fixed-top custom-header">
        <div class="row">
            <div class="col-4">
                HEADER
            </div>
            <div class="col-4">

            </div>
            <div class="col-4">

            </div>
        </div>
        <div class="row">
            <div class="col">
                HEADER 1
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
    .custom-header {
        background-color: $main-color;
        height: $header-height + $header1-height;
    }
</style>
