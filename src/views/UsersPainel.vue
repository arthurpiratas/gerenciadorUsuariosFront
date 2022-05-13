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
                <td>{{user.id}}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role > 0 ? "Administrador" : "Funcionário"}}</td>
                <td><button id="botoes" class="button is-success">Editar</button><button class="button is-danger">Deletar</button></td>
              </tr>
            </tbody>
          </table>
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
    };
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

#botoes{
    margin-right: 5px;
  }

</style>