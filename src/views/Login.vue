<template>
  <div>
    <Navbar/>

    <div class="login container">
      <div class="card">
        <div class="card-content center-align">
          <h2 class="black-text">Login</h2>
          <form @submit.prevent="login">
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
            <button class="btn black">Login</button>
            <p class="black-text">Not registered? <router-link to="register">Create an account</router-link> or </p>
            <a class="btn socmed" style="background-color:#3867d6; font-size:15px;" @click="loginfb"><span><i class="fab fa-facebook"></i></span> login with facebook</a>
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
  name: 'login',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {return}
      js = d.createElement(s)
      js.id = id
      js.src = "https://connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1877638572288522',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.0'
      })
    }

  },
  methods: {
    login: function () {
      let user = {
        email: this.email,
        password: this.password
      }

      axios.post('http://localhost:3000/users/login', user)
      .then(response => {
        let token = response.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('status', true)
        swal(
            'Welcome!',
            'Login success',
            'success'
        )
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Login failed!'
        })
      })
    },
    loginfb: function () {
      let self = this
      
      FB.login(function(res) {
        FB.api('/me','GET', {fields: ['name', 'email']}, function(response){
          let user = {
            name: response.name,
            email: response.email,
            password: response.id
          }
          axios.post('http://localhost:3000/users/fblogin', user)
          .then(response => {
            let token = response.data.token

            localStorage.setItem('token', token)
            localStorage.setItem('status', true)
            swal(
                'Welcome!',
                'Login success',
                'success'
            )
            self.$router.push('/')
          })
          .catch(err => {
            console.log(err)
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Login failed!'
            })
          })
        })
      },{scope: 'public_profile,email'})
    }
  }
}
</script>

<style scoped>
  .login{
    max-width: 450px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .login h2{
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
