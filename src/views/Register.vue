<template>

<div>
  <Navbar/>

  <div class="register container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="black-text">Register.</h2><br>
        <form class="input-field col s6" @submit.prevent="register">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input id="name" v-model="name" v-validate="'required'" type="text" name="name">
              <label for="name">Name</label>
              <span class="helper-text">{{ errors.first('name') }}</span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input id="email" v-model="email" v-validate="'required|email'" type="email" name="email">
              <label for="email">Email</label>
              <span class="helper-text">{{ errors.first('email') }}</span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="password" v-model="password" v-validate="'required|min:6'" type="password" name="password">
              <label for="password">Password</label>
              <span class="helper-text">{{ errors.first('password') }}</span>
            </div>
          </div>
          <button class="btn black">Submit</button>
        </form>
      </div>
    </div>
  </div>

  <Footer/>
</div>

</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  name: 'register',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register: function () {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/users/signup', newUser)
      .then(response => {
        swal(
          'Good job!',
          'Your account have been created!',
          'success'
        )
        this.$router.push('/')
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Register failed!'
        })
      })
    }
  }
}
</script>

<style scoped>
  .register{
    max-width: 600px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .register h2{
    font-size: 3em;
    font-family: 'Alfa Slab One', cursive;
  }
  .btn{
    margin: 30px auto;
  }
  .helper-text {
    color: red;
  }
</style>
