<template>
    <header class="container-fluid fixed-top custom-header d-flex justify-content-between align-content-center">
        <div class="d-flex align-content-center">
            <img class="icon-header" src="@/assets/img/coin.svg" alt="image coin">
            <h1 class="m-0">Penny Game</h1>
        </div>
        <ul class="nav">
            <li class="nav-item">
                Inicio
            </li>
            <li class="nav-item">
                Mis salas
            </li>
            <li class="nav-item">
                Partidas
            </li>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
    .custom-header{
        padding-top: 1rem;
        padding-bottom: 1rem;
        background: #FFECB3;
        box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        h1{
            font-size: 28px;
            font-weight: 400;
            color: #303133
        }
        li{
            padding: 0 10px;
        }
    }
    .icon-header{
        width: 30px;
        margin-right: 0.5rem;
    }
</style>
