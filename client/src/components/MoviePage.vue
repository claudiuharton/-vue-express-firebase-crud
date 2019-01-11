<template>
  <div class="single-product">
    <div v-if="loaded">
      <h3>Movie details</h3>
      <div class="card">
        <div class="card-header">
          Movie details
        </div>
        <div class="card-body">
          <p>ID: {{movie.id}}</p>
          <p>Movie Title: {{movie.title}}</p>
          <p>Movie Description: {{movie.description}}</p>
          <p>Movie Rate: {{movie.rate}}</p>
          <router-link :to="'/'" class="btn btn-primary"> Back</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import toastr from 'toastr'
  export default {
    name: 'MoviePage',
    data () {
      return {
        movie: {
          id: '',
          title: '',
          description: '',
          rate: ''
        },
        loaded: false
      }
    },
    beforeCreate () {
      const api = axios.create({
        withCredentials: true
      })
      api.get(`http://localhost:8080/api/movies/${this.$route.params.id}`)
        .then((response) => {
          this.movie = response.data
          this.loaded = true
        })
        .catch(error => {
          toastr.error(error.response.data.message)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>
