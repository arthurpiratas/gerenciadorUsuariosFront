<template>
  <div>
    <div>
      <div class="columns is-centered">
        <div class="column is-half">
          <h2 class="subtitle is-2">Painel Aministrativo</h2>
          <hr />
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role > 0 ? "Administrador" : "Funcionário" }}</td>
                <td>
                  <button id="botoes" class="button is-success">Editar</button
                  ><button class="button is-danger"  @click="showModals(user.id)">Deletar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div :class="{modal: true, 'is-active': showModal}">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Atenção</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <p>Você deseja seguir com a exclusão do usuário?</p>
                </div>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item" @click="hideModal()">NÃO</a>
                <a href="#" class="card-footer-item">SIM</a>
              </footer>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      showModal: false
    };
  },
  methods: {
    hideModal(){
      this.showModal = false
    }, 
    showModals(id){
      console.log(id + " ")
      this.showModal = true
    }
  },
  created() {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    
    };

    axios
      .get("http://127.0.0.1:8686/users", req)
      .then((res) => {
        console.log(res);
        this.users = res.data;
        console.log(this.users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
#botoes {
  margin-right: 5px;
}
</style>