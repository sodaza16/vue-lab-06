<template>
  <span>
    <img :src="imgSrc" width="100%">
  </span>
</template>
<script>
import Firebase from "firebase";
export default {
  data: function() {
    return {
      imgSrc: null
    };
  },
  props: {
    storageUrl: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  mounted: function() {
    // console.log(this.path);
    let storage = Firebase.storage();
    // let pathReference = storage.ref(path);
    let gsReference = storage.refFromURL(`gs://${this.storageUrl}/`);

    var t = this;

    gsReference
      .child(`${this.path}`)
      .getDownloadURL()
      .then(function(url) {
        t.imgSrc = url;
      });
  }
};
</script>
