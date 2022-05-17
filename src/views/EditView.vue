<template>
  <div>
    <h2 class="subtitle is-2">Edição de usuário</h2>
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
        <p id="nomes">Nome</p>
        <input type="text" placeholder="Nome do usuário" class="input" v-model="name"/>
        <p id="nomes">E-mail</p>
        <input type="email" placeholder="E-mail do usuário" class="input" v-model="email"/>
        <p id="nomes">Cargo: {{this.role > 0 ? "Administrador" : "Funcionário"}}</p>
        <input type="range" min = 0 max = 1 v-model="role"/>
        <hr>
        <button id="botoes" class="button is-success is-light" @click="update()">Editar</button>
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
    created(){
        var req = {
              headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
         }
         }
        axios.get("http://127.0.0.1:8686/user/"+this.$route.params.id, req).then(res => {
            this.id = res.data.id
            this.name = res.data.name
            this.email = res.data.email
            this.role = res.data.role

        }).catch(err => {
            console.log(err.response)
            this.$router.push({name: 'Users'})
        })
            
        
    },
    data(){
        return{
            name: '',
            email: '', 
            role: 0,
            id: -1, 
            error : [],
            sucess: undefined
        }
    },methods:{
        voltar(){
          this.$router.push({name: 'Users'})
        },
        update(){
            var req = {
              headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
         },
    
         };

            this.error = []
            this.sucess = undefined

            axios.post("http://127.0.0.1:8686/user",{name: this.name, email: this.email, role: this.role}, req).then(res => {
                this.name = '',
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
  #nomes{
    margin-top: 15px;
    margin-bottom: 5px;
  }

</style>