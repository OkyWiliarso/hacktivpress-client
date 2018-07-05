<template>
  <div class="home">
    <Navbar/>
      <h3>Articles.</h3>

      <div class="search">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">textsms</i>
              <input type="text" id="autocomplete-input" class="autocomplete">
              <label for="autocomplete-input">Autocomplete</label>
            </div>
          </div>
        </div>
      </div>

      <ul class="collection">
        <div v-for="(article, index) in articles" :key="index">
          <li class="collection-item avatar">
            <img src="paper.png" class="circle">
            <router-link to="article">
            <span class="title" @click="articleDetail(article)">{{article.title}}</span>
            </router-link>
            <p>Author : {{ article.authorName }} </p>
            <p><span>{{ article.createdAt | moment("dddd, MMMM Do YYYY") }}</span></p>
            <a v-if="loginStatus" class="secondary-content" @click="deleteArticle(article._id)" href="#"><i class="material-icons">delete</i></a>
          </li>
        </div>
      </ul>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapState([
      'articles',
      'loginStatus'
    ])
  },
   methods: {
    ...mapActions([
      'getArticles'
    ]),
    deleteArticle: function (id) {
      axios.delete(`http://localhost:3000/articles/delete/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getArticles()
      })
      .catch(err => {
        console.log(err)
      })
    },
    articleDetail: function (article) {
      this.$store.dispatch('article',article)
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style scoped>
  h3 {
    margin-left: 10px;
    font-family: 'Alfa Slab One', cursive;
  }
</style>

