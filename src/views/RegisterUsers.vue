<template>
  <div>
    <h2 class="subtitle is-2">Registro de usuário</h2>
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
        <p>Nome</p>
        <input type="text" placeholder="Nome do usuário" class="input" v-model="name"/>
        <p>E-mail</p>
        <input type="email" placeholder="E-mail do usuário" class="input" v-model="email"/>
        <p>Senha</p>
        <input type="password" placeholder="Senha do usuário" class="input" v-model="password"/>
        <hr>
        <button id="botoes" class="button is-success is-light" @click="register()">Enviar</button>
        <button class="button is-success is-light" @click="voltar()">Voltar</button>
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
            name: '',
            password: '', 
            email: '', 
            role: 0, 
            error : [],
            sucess: undefined
        }
    },methods:{
        voltar(){
          this.$router.push({name: 'home'})
        },
        register(){
            var req = {
              headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
         },
    
         };

            this.error = []
            this.sucess = undefined

            axios.post("http://127.0.0.1:8686/user",{name: this.name, password: this.password, email: this.email, role: this.role}, req).then(res => {
                this.name = '',
                this.password = '', 
                this.email = ''
                this.sucess = res.data
            }).catch(err => {
              var msgErro = err.response.data
              msgErro.forEach(msg => {
                this.error.push(msg.err)
                console.log(msg.err)
              });
                
            })
            
        }
    }
};
</script>

<style scoped>

  #botoes{
    margin-right: 50px;
  }

</style>