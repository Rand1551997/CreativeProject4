<template>
<div class="home">
<div v-if = "user === null"><Login/></div>
  <div class="image-gallery" v-else>
    <div class="image" v-for="item in items" :key="item.id">
      <h1>{{item.title}}</h1>
      <h2>-{{item.description}}</h2>
      <h3>{{item.user.username}}</h3>
      <h4>{{item.user.firstName}}</h4>
      <img :src="item.path" />
    </div>
  </div>
    <button
      type="submit"
      class="pure-button pure-button-primary"
      @click.prevent="logout"
    >
      Logout
    </button>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 10px;
  background-color: #a7c5eb;
  display: inline-block;
  width: 100%;
  border: 3px solid #fff;
  padding: 0px;
  box-shadow: 10px 10px 5px grey;
}

.image img {
  width: 200px;

}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
<script>
import Login from "../components/Login.vue";

// @ is an alias to /src

import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },
  components: {Login},
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    this.getItems();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },

  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
      await axios.delete("/api/users");
      this.$root.$data.user = null;
      } catch (error) {
      this.$root.$data.user = null;
    }
  },
  }
}
</script>
