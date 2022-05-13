<template>
  <div>
    <h2 class="subtitle is-2">Login</h2>
    <hr />

    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">          
              {{error}}
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
import axios from 'axios'
export default {
    data(){
        return{
            password: '', 
            email: '', 
            error : undefined,
            sucess: undefined
        }
    },methods:{
        voltar(){
          this.$router.push({name: 'home'})
        },
        login(){
            this.error  = undefined
            this.sucess = undefined
            axios.post("http://127.0.0.1:8686/login",{password: this.password, email: this.email}).then(res => {
                this.sucess = "Login realizado com sucesso"
                localStorage.setItem('token', res.data.token)
                this.$router.push({name: 'Users'})
            }).catch(err => {
              var msgErro = err.response.data.messsage
              this.error = msgErro
              
                
            })
            
        }
    }
};
</script>

<style scoped>

  

</style>