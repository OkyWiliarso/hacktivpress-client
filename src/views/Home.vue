<template>
  <div class="home">
    <Navbar/>
      <h3>Articles.</h3>

      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">textsms</i>
              <input type="text" id="autocomplete-input" class="autocomplete" v-model="category" @keyup.enter="byCategory">
              <label for="autocomplete-input">Search by Category</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">textsms</i>
              <input type="text" id="autocomplete-input" class="autocomplete" v-model="author" @keyup.enter="byAuthor">
              <label for="autocomplete-input">Search by Author</label>
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
            <p>Category : {{ article.category }} </p>
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
  data () {
    return {
      category: '',
      author: ''
    }
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
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Not Authorized!'
        })
      })
    },
    articleDetail: function (article) {
      this.$store.dispatch('article',article)
    },
    byCategory: function () {
      this.$store.dispatch('getCategory',this.category)
      this.category = ''
    },
    byAuthor: function () {
      this.$store.dispatch('getAuthor',this.author)
      this.author = '' 
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

