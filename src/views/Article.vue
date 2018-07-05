<template>

  <div>
    <navbar/>
    <div class="article container">
      <div class="card">
          <div class="card-image">
            <img :src="article.image">
            <span class="card-title">{{article.title}}</span>
          </div>
          <div class="card-content">
            <p><span v-html="article.content"></span></p>
          </div>
          <div class="card-action">
            <p>Author: {{ article.authorName }}</p>
            <p><span>{{ article.createdAt | moment("dddd, MMMM Do YYYY") }}</span></p>
          </div>
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { mapState } from 'vuex'

export default {
  name: 'article',
  components: {
    'navbar': Navbar,
    Footer
  },
  computed: {
    ...mapState([
      'article'
    ])
  }
}
</script>

<style scoped>
  .article{
    margin-top: 70px;
    margin-bottom: 70px;
  }
  .card-title {
    font-size: 3em;
    font-family: 'Alfa Slab One', cursive;
  }
  p {
    text-align: justify;
    text-justify: inter-word;
  }
</style>
