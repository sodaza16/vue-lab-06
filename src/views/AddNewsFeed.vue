<template>
  <section>
    <div class="news-feed-adder centered w-500px">
      <div class="input-tab">
        <label for="title" class="input-title">Title</label>
        <input type="text" class="input-element" v-model="newsFeedForm.title" id="title">
      </div>
      <div class="input-tab">
        <label for="content" class="input-title">Content</label>
        <textarea class="input-element" v-model="newsFeedForm.content" id="content">Unsupported sorry.</textarea>
      </div>
      <div class="input-tab">
        <label for="image" class="input-title">Image</label>
        <img class="input-display-image" :src="displayedImage">
        <input class="input-element" type="file" @change="changeImage" id="image">
      </div>
    </div>
    <div class="centered w-500px">
      <button @click="addNewsFeed">Add News feed</button>
    </div>
  </section>
</template>
<style scoped>
.news-feed-adder {
  margin-top: 20px;
  margin-bottom: 20px;
}
.news-feed-adder .input-tab {
  display: block;
  margin-bottom: 15px;
}
.news-feed-adder .input-tab:last-child {
  margin-bottom: 0;
}
.news-feed-adder .input-tab .input-title {
  display: block;
  margin-bottom: 10px;
}
.news-feed-adder .input-tab .input-element,
.news-feed-adder .input-tab .input-display-image {
  display: block;
}
.news-feed-adder .input-tab .input-element {
  width: 100%;
  max-width: 100%;
}
.news-feed-adder .input-tab .input-display-image {
  max-width: 500px;
}
</style>
<script>
import VueResource from "vue-resource";
import Vue from "vue";
import Firebase from "firebase";

export default {
  data() {
    return {
      displayedImage: null,
      newsFeedForm: {
        title: "",
        content: "",
        image: null
      }
    };
  },
  methods: {
    addNewsFeed() {
      var t = this;

      Vue.http
        .post("news-feed.json", {
          title: this.newsFeedForm.title,
          content: this.newsFeedForm.content,
          image: `${this.newsFeedForm.image.name}`
        })
        .then(response => {
          if (response.status == 200){
            // console.log(response.data.name);
            let genId = response.data.name;
            let storageRef = Firebase.storage().ref();
            let imageRef = storageRef.child(
              `news-feed-images/${genId}/${t.newsFeedForm.image.name}`
            );

            let file = t.newsFeedForm.image;
            imageRef.put(file).then(response => {
              if(response.state == "success") t.clearForm();
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    clearForm() {
      this.newsFeedForm.title = "";
      this.newsFeedForm.content = "";
      this.newsFeedForm.image = null;
      this.displayedImage = null;
      document.getElementById("image").value = "";
    },
    changeImage(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.newsFeedForm.image = files[0];
      this.showImage(files[0]);
    },
    showImage(file) {
      var reader = new FileReader();
      reader.onload = e => {
        this.displayedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  created() {
    Vue.use(VueResource);
    Vue.http.options.root = "https://cs494-vuejs.firebaseio.com/";
  }
};
</script>
