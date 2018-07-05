<template>
  <div>
    <Navbar/>

  <div class="post container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="black-text">Post</h2>
        <form @submit.prevent="postArticle">
          <div class="row">
            <div class="input-field col s12">
              <input v-model="title" type="text">
              <label>Title</label>
            </div>
            <div class="input-field col s12">
              <input v-model="category" type="text">
              <label>Category</label>
            </div>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>File</span>
              <input type="file" id="file">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" placeholder="image">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <editor v-model="content"></editor>
            </div>
          </div>
          <button class="btn black">Post</button>
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
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'post',
  components: {
    Navbar,
    Footer,
    'editor': Editor
  },
  data () {
    return {
      title: '',
      content: '',
      category: '',
      image: ''
    }
  },
  methods: {
    postArticle: function () {
      let self = this
      let formData = new FormData()
      let dom = document.getElementById('file')

      formData.append('title', this.title)
      formData.append('category', this.category)
      formData.append('content', this.content)
      formData.append('image', dom.files[0])

      axios.post('http://localhost:3000/articles/add', formData, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        swal(
          'Good job!',
          'Add Article Success!',
          'success'
        )
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .post{
    max-width: 1000px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .post h2{
    font-size: 3em;
    font-family: 'Alfa Slab One', cursive;
  }

</style>
