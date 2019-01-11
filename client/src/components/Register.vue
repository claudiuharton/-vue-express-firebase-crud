<template >
  <div id="register" v-if="!authenticated">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model="input.email"  id="exampleInputEmail1"  placeholder="Enter email">
      </div>


      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="input.password" id="exampleInputPassword1" placeholder="Password">
      </div>

      <button type="button" v-on:click="register()" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import toastr from 'toastr'
  export default {
    name: 'Register',
    data () {
      return {
        input: {
          email: '',
          password: ''
        },
        authenticated: false
      }
    },
    methods: {
      register () {
        const api = axios.create({
          withCredentials: true
        })
        if (this.input.email !== '' && this.input.password !== '') {
          api.post('http://localhost:8080/api/auth/register', {
            email: this.input.email,
            password: this.input.password
          })
            .then((response) => {
              toastr.success(response.data.message)
              this.$router.replace({name: 'Login'})
            })
            .catch((error) => {
              toastr.error(error.response.data.message)
            })
        } else {
        }
      }
    }
  }
</script>

<style scoped>

</style>
