<template>
  <div class="products">
    <h3>Movies</h3>
    <div class="card">
      <div class="card-header">
        Add a new movie
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Title</label>
            <input v-model="movieData.title" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input v-model="movieData.description" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Rate</label>
            <input v-model="movieData.rate" type="number" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>

          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Movies List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">
                ID
              </th>
              <th>
                Title
              </th>
              <th>
                Description
              </th>
              <th>
                Rate
              </th>
              <th>
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="movie in sortedMovies" v-bind:key="movie.id">
              <template v-if="editId === movie.id">
                <td>{{editMovieData.id}}</td>
                <td><input v-model="editMovieData.title" type="text"></td>
                <td><input v-model="editMovieData.description" type="text"></td>
                <td><input v-model="editMovieData.rate" type="number"></td>
                <td>
                    <span class="icon">
                      <i @click="onEditSubmit(movie.id)" class="fa fa-check"></i>
                    </span>
                  <span class="icon">
                      <i @click="onCancel" class="fa fa-ban"></i>
                    </span>
                </td>
              </template>
              <template v-else>
                <td>
                  {{movie.id}}
                </td>
                <td>
                  {{movie.title}}
                </td>
                <td>
                  {{movie.description}}
                </td>

                <td>
                  {{movie.rate}}
                </td>
                <td>

                  <a href="#" class="icon">
                    <i @click="onDelete(movie.id)" class="fa fa-trash"></i>
                  </a>
                  <a href="#" class="icon">
                    <i @click="onEdit(movie)" class="fa fa-pencil"></i>
                  </a>
                  <router-link
                    :to="{
                      name:'MoviePage',
                      params:{id: movie.id}
                    }"
                    class="icon"
                  >
                    <i class="fa fa-eye"></i>
                  </router-link>
                </td>
              </template>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import toastr from 'toastr'

  export default {
    name: 'Movies',
    data () {
      return {
        editId: '',
        movieData: {
          'title': '',
          'description': '',
          'rate': ''
        },
        editMovieData: {
          'id': '',
          'title': '',
          'description': '',
          'rate': ''
        },
        movies: []
      }
    },
    created () {
      this.getMovies()
    },
    computed: {
      sortedMovies () {
        return this.movies.slice().sort((a, b) => {
          return a.id - b.id
        })
      }
    },
    methods: {
      getMovies () {
        const api = axios.create({
          withCredentials: true
        })
        api.get('http://localhost:8080/api/movies')
          .then(response => {
            this.movies = response.data
            toastr.remove()
            toastr.success('Movies loaded')
          })
          .catch(error => {
            toastr.error(error.response.data.message)
          })
      },
      onSubmit () {
        const api = axios.create({
          withCredentials: true
        })
        api.post('http://localhost:8080/api/movies', this.movieData)
          .then(response => {
            toastr.success(response.data.message)
            this.movieData.rate = ''
            this.movieData.title = ''
            this.movieData.description = ''
            this.getMovies()
          })
          .catch(error => {
            toastr.error(error.response.data.message)
          })
      },

      onDelete (id) {
        const api = axios.create({
          withCredentials: true
        })
        api.delete(`http://localhost:8080/api/movies/${id}`)
          .then(response => {
            toastr.success(response.data.message)
            this.getMovies()
          })
          .catch(error => {
            toastr.error(error.response.data.message)
          })
      },
      onEdit (movie) {
        this.editId = movie.id
        this.editMovieData.id = movie.id
        this.editMovieData.title = movie.title
        this.editMovieData.description = movie.description
        this.editMovieData.rate = movie.rate
      },
      onCancel () {
        this.editId = ''
        this.editMovieData.id = ''
        this.editMovieData.title = ''
        this.editMovieData.description = ''
        this.editMovieData.rate = ''
      },
      onEditSubmit (id) {
        const api = axios.create({
          withCredentials: true
        })
        if (this.editMovieData.title && this.editMovieData.description && this.editMovieData.rate) {
          api.put(`http://localhost:8080/api/movies/${id}`, {
            title: this.editMovieData.title,
            description: this.editMovieData.description,
            rate: this.editMovieData.rate
          })
            .then(response => {
              toastr.success(response.data.message)
              this.getMovies()
              this.editId = ''
              this.editMovieData.id = ''
              this.editMovieData.title = ''
              this.editMovieData.description = ''
              this.editMovieData.rate = ''
            })
        }
      }
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

  .icon {
    margin-right: 10px;
  }

  .icon i {
    cursor: pointer;
  }
</style>
