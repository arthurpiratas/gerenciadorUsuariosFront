<template>
  <div>
    <h2 class="subtitle is-1">Usuário não autorizado</h2>
    <hr/>
    <button class="button is-success is-light" @click="voltarLogin()">Logar</button>
  </div>
</template>

<script>
    export default {
        methods: {
            voltarLogin(){
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>

  

</style>