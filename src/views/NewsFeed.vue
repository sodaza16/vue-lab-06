<template>
  <section>
    <div
      v-for="(instance,key) in orderedNewsFeed"
      :key="key"
      class="news-feed-block centered w-500px"
    >
      <div class="header">{{instance.title}}</div>
      <div class="content">
        <div class="text">{{instance.content}}</div>
        <hr class="breaker">
        <div class="attached">
          <firebase-image :path="`news-feed-images/${instance.id}/${instance.image}`" storage-url="cs494-vuejs.appspot.com"></firebase-image>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.news-feed-block {
  margin-bottom: 20px;
  border: solid black 1px;
  border-radius: 5px;
  padding: 20px;
  background: wheat;
}
.news-feed-block:first-child {
  margin-top: 20px;
}
.news-feed-block .header {
  font-weight: bold;
  font-style: italic;
  margin-bottom: 15px;
}
.news-feed-block .content {
  margin-top: 15px;
}
.news-feed-block .content .text {
  margin-bottom: 10px;
}
.news-feed-block .content .attached {
  margin-top: 10px;
}
.news-feed-block .content .breaker {
  width: 100%;
  height: 2px;
  background: grey;
}
</style>
<script>
import VueResource from "vue-resource";
import Vue from "vue";
import FirebaseStorageImage from "../components/FirebaseStorageImage.vue";

export default {
  data() {
    return {
      newsFeed: []
    };
  },
  components: {
    "firebase-image": FirebaseStorageImage
  },
  methods: {
    fetchData() {
      Vue.http.get("news-feed.json", {}).then(response => {
        for (let id in response.data) {
          this.newsFeed.push({
            id: id,
            title: response.data[id].title,
            content: response.data[id].content,
            image: response.data[id].image
          });
        }
      });
    }
  },
  computed: {
    orderedNewsFeed() {
      // eslint-disable-next-line
      return this.newsFeed.reverse();
    }
  },
  created() {
    Vue.use(VueResource);
    Vue.http.options.root = "https://cs494-vuejs.firebaseio.com/";
    this.fetchData();
  }
};
</script>
