<template>
  <div>
    <h2 class="subtitle is-2">Login</h2>
    <hr />

    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error.length > 0">
          <div class="notification is-danger">
            <div v-for="(erro, index) in error" :key="index">
              {{erro}}
            </div>  
          </div> 
        </div>
        <p>E-mail</p>
        <input type="email" placeholder="E-mail do usuário" class="input" v-model="email"/>
        <p>Senha</p>
        <input type="password" placeholder="Senha do usuário" class="input" v-model="password"/>
        <hr>
        <button class="button is-success is-light" @click="login()">Logar</button>
        <div v-if="sucess != undefined">
          <hr>
          <div class="notification is-success">
            {{sucess}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 
export default {
    data(){
        return{
            password: '', 
            email: '', 
            error : [],
            sucess: undefined
        }
    },methods:{
        voltar(){
          this.$router.push({name: 'home'})
        },
        login(){
            this.error = []
            this.sucess = undefined

            console.log("login")
            
        }
    }
};
</script>

<style scoped>

  

</style>