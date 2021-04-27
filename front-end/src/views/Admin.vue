<template>
<div class="admin">
  <h1>Please add your favorite book, a review about it, and a picture of its cover</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a book</h2>
    </div>
    <div class="add">
      <div class="form">
        <textarea v-model="title" placeholder="Title" rows="1" cols="50"></textarea>
        <p></p>
        <textarea v-model="author" placeholder="Author" rows="1" cols="50"></textarea>
        <p></p>
        <textarea v-model="description" name="description" rows="4" cols="50" placeholder="Description">
        </textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h1>{{addItem.title}}</h1>
        <h1>{{addItem.author}}</h1>
        <h2> {{addItem.description}}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit - Delete a book</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <textarea v-model="findItem.title" rows="1" cols="50"></textarea>
        <p></p>
        <textarea v-model="findItem.author" rows="1" cols="50"></textarea>
        <p></p>
        <textarea v-model="findItem.description" name="description" rows="4" cols="50">
        </textarea>
        <p></p>
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}
.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}
.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}
.add,
.edit {
  display: flex;
}
.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}
.form {
  margin-right: 50px;
}
.upload h2 {
  margin: 0px;
}
.upload img {
  max-width: 300px;
}
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
  background-color: #fff;
}
.suggestion {
  min-height: 20px;
}
.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      description: "",
      author: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },

created() {
  this.getItems();
},
computed: {
  suggestions() {
    let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    return items.sort((a, b) => a.title > b.title);
  }
},
methods: {
  fileChanged(event) {
    this.file = event.target.files[0]
  },
async getItems() {
try {
       let response = await axios.get("/api/items");
       this.items = response.data;
       return true;
      } catch (error) {
        console.log(error);
       }
     },
     selectItem(item) {
       this.findTitle = "";
       this.findItem = item;
     },
     async deleteItem(item) {
       try {
         await axios.delete("/api/items/" + item._id);
         this.findItem = null;
         this.getItems();
         return true;
       } catch (error) {
         console.log(error);
       }
     },
     async editItem(item) {
       try {
         await axios.put("/api/items/" + item._id, {
           title: this.findItem.title,
           description: this.findItem.description,
           author: this.findItem.author,
         });
         this.findItem = null;
         this.getItems();
         return true;
       } catch (error) {
         console.log(error);
       }
     },
     async upload() {
     try {
       const formData = new FormData();
       formData.append('photo', this.file, this.file.name)
       let r1 = await axios.post('/api/photos', formData);
       let r2 = await axios.post('/api/items', {
         title: this.title,
         description: this.description,
         path: r1.data.path
       });
       this.addItem = r2.data;
     } catch (error) {
       console.log(error);
     }
   },
}
}
</script>
