<template>
  <div id="login" v-if="!authenticated">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="input.email"
          id="exampleInputEmail1"
          placeholder="Enter email"
        />
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="input.password"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>

      <button type="button" v-on:click="login()" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";
export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      authenticated: false
    };
  },
  methods: {
    login() {
      const api = axios.create({
        withCredentials: true
      });
      if (this.input.email !== "" && this.input.password !== "") {
        api
          .post("http://localhost:8080/api/auth/login", {
            email: this.input.email,
            password: this.input.password
          })
          .then(response => {
            toastr.success(response.data.message);
            localStorage.setItem("login", "1");
            this.$router.replace({ name: "Movies" });
          })
          .catch(error => {
            toastr.error(error.response.data.message);
          });
      }
    }
  },
  beforeCreate() {
    this.authenticated = localStorage.getItem("login") === "1";
    if (this.authenticated) this.$router.replace({ name: "Movies" });
  }
};
</script>

<style scoped></style>
